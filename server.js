var express = require('express');
var app = express();
var server = require('http').createServer(app);
var serverSocket = require('socket.io')(server);

var mongo = require('mongodb');
var mongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://heroku_66dvhhlx:7jao0b6kacr0ti5okbmvgqsdmu@ds055905.mongolab.com:55905/heroku_66dvhhlx';
var recipesCollection;
var ingredientsCollection;
var userCollection;

mongoClient.connect(mongoUrl, function(err, db) {
	if(!err) { 
		console.log("Connected to database...");
		recipesCollection = db.collection('recipes');
		ingredientsCollection = db.collection('ingredients');
		userCollection = db.collection('users');
	};
});

app.use(express.static(__dirname + '/client'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});


app.get('/createdrink', function(req, res) {
	res.sendFile(__dirname + '/client/createDrink.html');
});

app.get('/index', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/client/login.html');
});
app.get('/createaccount', function(req, res) {
	res.sendFile(__dirname + '/client/createAccount.html');
});
app.get('/userProfile', function(req, res) {
	res.sendFile(__dirname + '/client/userProfile.html');
});
server.listen(process.env.PORT || 5000);

serverSocket.on('connection', function(clientConSock){		
	console.log("A client connected");


	// Client connected, show all database documents.
	clientConSock.on('req_all_database', function() {		
		var cursor = recipesCollection.find();				
		cursor.each(function(err, doc) {					
			if(err) {
			} else {
				if(doc != null) {													
					clientConSock.emit('res_all_database', JSON.stringify(doc));	
				}																	
			}
		});
	});

	// Client input a name of a drink, insert into database
	clientConSock.on('insert_database', function(data) {	
		recipesCollection.insert(data);
		clientConSock.emit('insert_succesful');				
	});

	// Client input a name of a drink, insert into database
	clientConSock.on('insert_account_database', function(data) {
		userCollection.insert(data);
		clientConSock.emit('insert_succesful');
	});

	//login verification
	clientConSock.on('password_check', function(username, password){
		console.log(username);
		console.log(password);
		userCollection.findOne({'userName': username}, function(err, doc) {
			if (doc){
				console.log(doc);
				if(doc.password == password) {
					clientConSock.emit('password_succesful');
				}
			} else {
				console.log('no data for this company');
			}
		});
	});
	//Profile information loading
	clientConSock.on('load_profile', function(username){
		userCollection.findOne({'userName': username}, function (err, doc){
		if (doc){
			clientConSock.emit('user_email', JSON.stringify(doc));
		}

	});

	});

	// Client input a string, fetch from database and return. Search function.
	clientConSock.on('search_database', function(data) {
		data = JSON.parse(data);
		var ingQuery = true;
		for (var i = 0; i < data.length; i++) {
			if (data[i][0] == true) {
				// A drinkname has been found, do the first drinkname.
				ingQuery = false;
				var cursor = recipesCollection.find({'name': data[i][1]});
				cursor.each(function(err, doc) {
					if(err) {
						console.log(err);
					} else {
						if(doc != null) {
							clientConSock.emit('search_succesful', JSON.stringify(doc));
						}
					}
				});
				i = data.length;
			}
		}

		// No drinknames in query, only ingredients

		if (ingQuery) {
			var cursor2;
			if (data.length == 0) {
				cursor2 = recipesCollection.find();
			} else if(data.length == 1) {
				cursor2 = recipesCollection.find( {
					ingredients: { $all: [
						{ "$elemMatch" : { name: data[0][1] } }
						] }
					} );
			} else if(data.length == 2) {
				cursor2 = recipesCollection.find( {
					ingredients: { $all: [
						{ "$elemMatch" : { name: data[0][1] } },
						{ "$elemMatch" : { name : data[1][1] } }
						] }
					} );
			} else if(data.length == 3) {
				cursor2 = recipesCollection.find( {
					ingredients: { $all: [
						{ "$elemMatch" : { name: data[0][1] } },
						{ "$elemMatch" : { name : data[1][1] } },
						{ "$elemMatch" : { name : data[2][1] } }
						] }
					} );
			} else {
				cursor2 = recipesCollection.find( {
					ingredients: { $all: [
						{ "$elemMatch" : { name : data[0][1] } },
						{ "$elemMatch" : { name : data[1][1] } },
						{ "$elemMatch" : { name : data[2][1] } },
						{ "$elemMatch" : { name : data[3][1] } }
						] }
					} );
			}
			cursor2.each(function(err, doc) {
				if(err) {
					console.log(err);
				} else {
					if(doc != null) {
						clientConSock.emit('search_succesful', JSON.stringify(doc));
					}
				}
			});
		}
	});

	// Client likes a drink

	clientConSock.on('drink_like', function(drinkId, username) {
		console.log(username);
		// IMPLEMENT A CHECK IF THE ONE CLICKING THE DRINK IS LOGGED IN AS A USER:

		var isUser = true;
		if (isUser) {
			var o_id = new mongo.ObjectID(drinkId);
			recipesCollection.update({"_id": o_id}, {$inc : { like: 1} });
			userCollection.update({"userName": username}, { $push: { "like": drinkId } });
			clientConSock.emit('like_succeded', drinkId);

			clientConSock.broadcast.emit('like_count', drinkId);
			clientConSock.emit('like_count', drinkId);
		} else {
			alert("please log in or create an account!");
		}
	});

	clientConSock.on('drink_unlike', function(drinkId, username) {
		var isUser = true;
		if (isUser) {
			var o_id = new mongo.ObjectID(drinkId);
			recipesCollection.update({"_id": o_id}, {$inc : { like: -1} });
			userCollection.update({"userName": username}, {$pull: {'like': drinkId}} );
			clientConSock.emit('unlike_succeded', drinkId);

			clientConSock.broadcast.emit('unlike_count', drinkId);
			clientConSock.emit('unlike_count', drinkId);

		} else {
			alert("please log in or create an account!");
		}
	});


	// Client comment on a drink

	clientConSock.on('drink_comment', function(comment, drinkId) {
		var comment = JSON.parse(comment);
		if(comment.userName) {
			var o_id = new mongo.ObjectID(drinkId);
			recipesCollection.update({"_id": o_id}, { $push: { "comments": comment } });
			clientConSock.emit('comment_succeded', JSON.stringify(comment), drinkId);
			clientConSock.broadcast.emit('comment_succeded', JSON.stringify(comment), drinkId);
		}
	});

    //login


	// Client wants to retrieve all the ingredients for the token array
	clientConSock.on('req_all_ingredients', function() {
		var cursor = [ingredientsCollection.find(), recipesCollection.find()];
		for (var i = 0; i < cursor.length; i++) {
			cursor[i].each(function(err, doc) {
				if(err) {
					console.log(err);
				} else {
					if(doc != null) {
						clientConSock.emit('res_all_ingredients', JSON.stringify(doc));
					}
				}
			});
		}
	});

	// ONLY INGRIDIENTS

	clientConSock.on('req_all_ingredients_only', function() {
		var cursor = [ingredientsCollection.find()];
		for (var i = 0; i < cursor.length; i++) {
			cursor[i].each(function(err, doc) {
				if(err) {
					console.log(err);
				} else {
					if(doc != null) {
						clientConSock.emit('res_all_ingredients', JSON.stringify(doc));
					}
				}
			});
		}
	});

	// Get the user info

	clientConSock.on('get_userInfo', function(username) {
		console.log(username);
		userCollection.findOne({'userName': username}, function(err, doc) {
			if (doc){
				console.log(doc);
				clientConSock.emit('res_userInfo', JSON.stringify(doc));
			} else {
				console.log('no data for this company');
			}
		});
	});

	// Create drink!

	clientConSock.on('created_drink', function(recipe) {
		recipe = JSON.parse(recipe);
		console.log(recipe);
		recipesCollection.insert(recipe);
		clientConSock.emit('insertdrink_succesful');
	});

});




console.log("server is running...");