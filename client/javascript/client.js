$(document).ready(function(){
    var clientSocket = io.connect('');


    // Logout

    $('#logoutDiv').on('click', function(){
        sessionStorage.clear();
        location.reload();

    });

    // Get user information, liked drinks

    var userInfoObj2;

    clientSocket.emit('get_userInfo', sessionStorage.getItem('userName'));
    clientSocket.on('res_userInfo', function(data) {
        data = JSON.parse(data);
        console.log(data);
        userInfoObj2 = data;
    });


    /*
     var username;
     var password;

     clientSocket.emit('password_check', username, password);
     clientSocket.on('password_correct', function(username){
     sessionStorage.setItem('user')
     });

     */

    // Insert a drink

    $('#createDrink').submit(function(event){
        event.preventDefault();
        var drinkName = ($(event.target).find('#drinkName').val());
        var drinkLiq = ($(event.target).find('#drinkLiq').val());
        var drinkIng = ($(event.target).find('#drinkIng').val());
        var drinkDoc = {
            name: drinkName,
            liquor: drinkLiq,
            ingredients: drinkIng
        };
        clientSocket.emit('insert_database', drinkDoc);
    });

    clientSocket.on('insert_succesful', function() {
        $('#databaseResults').children().fadeOut(200);
        clientSocket.emit('req_all_database');
    });

    // login to account

    $('#login').submit(function(event){
        event.preventDefault();
        var username = $('#userName').val();
        var password = $('#password').val();
        clientSocket.emit('password_check', username, password);
    });

    clientSocket.on('password_unsuccesful', function(){
        alert("wrong password");
    });

    clientSocket.on('password_succesful', function(){
        var userInputName = $('#userName').val();
        console.log('correct password');
        sessionStorage.setItem('userName', userInputName);
        window.location.href="./index.html";
        self.undelegateEvents();
        delete self;
    });

    clientSocket.on('login_successful', function() {
        $('#databaseResults').children().fadeOut(200);
        window.open('./index');
        clientSocket.emit('req_all_database');
    });

    clientSocket.on('login_failed', function() {
        $('#databaseResults').children().fadeOut(200);
        alert("Wrong Password or Username, Please try it again");
        window.open('./createAccount');
        clientSocket.emit('req_all_database');
    });

    //create a new user account
    $('#createAccount').submit(function(event){
        event.preventDefault();
        var username = ($(event.target).find('#userid').val());
        var email = ($(event.target).find('#email').val());
        var password = ($(event.target).find('#pswrd').val());
        var userinfo = {
            userName: username,
            password: password,
            email: email
        };
        clientSocket.emit('insert_account_database', userinfo);
        alert("Your account has been created successfully and now you can login");
        window.location.href="./index.html";
        self.undelegateEvents();
    });

    clientSocket.on('insert_succesful', function() {
        $('#databaseResults').children().fadeOut(200);
        clientSocket.emit('req_all_database');
    });

    //loading user information
    clientSocket.emit('load_profile', sessionStorage.getItem('userName'));
    clientSocket.on('user_email',function(info){
        var info = JSON.parse(info);

        user_email = info.email;
        console.log(user_email);
        $("#email").text(user_email);


    });

    // Get all the drinks at load

    clientSocket.emit('search_database', JSON.stringify([]));
    $('#spinner').show();

    // Search a drink

    $('#searchDrink').submit(function(event) {
        $('.drinkContainer').children().fadeOut(200).remove();
        $('#spinner').show();
        event.preventDefault();
        var optionArray = $(event.target).find("option[selected|='selected']");
        var searchArray = [];
        var tuple = [];
        for (var i = 0; i < optionArray.length; i++) {
            tuple = [$(optionArray[i]).data('drinkname'), optionArray[i].innerHTML];
            searchArray.push(tuple);
        }
        clientSocket.emit('search_database', JSON.stringify(searchArray));
    });

    // Search succesful

    clientSocket.on('search_succesful', function(dataIn){
        searchResults(dataIn);
    });

    // Get all the ingredients for the token-array

    clientSocket.emit('req_all_ingredients');
    var value = Number($('#tokenize').children().last().prop('value'));

    clientSocket.on('res_all_ingredients', function(data) {
        value++;
        var ingredientToken;
        data = JSON.parse(data);
        if (data.hasOwnProperty('ingredients')){
            ingredientToken = $('<option>', {
                value: value,
                html: data.name,
                "data-drinkname": true
            });
        } else {
            ingredientToken = $('<option>', {
                value: value,
                html: data.name
            });
        }
        $('#tokenize').append(ingredientToken);
    });


    // SearchResults function

    var searchResults = function(dataIn) {
        var data = JSON.parse(dataIn);
        var drawDrinkArray = [];
        for (var i = 0; i < data.ingredients.length; i++) {
            drawDrinkArray.push([data.ingredients[i].name, data.ingredients[i].size, data.ingredients[i].color]);
        }
        data.ingredients = drawDrinkArray;
        // Create canvas element
        var drinkItemDiv = $('<div>', {
            class: "drinkItem"
        });

        var canvasElement = $('<canvas>', {
            id: data._id,
            class: "drinkItem"
        });

        // CREATE ALL DIVS FOR COMMENT/INSTRUCTIONS FIELD

        var desc = "This is a perfect drink for a hot summer evening!";
        var descUserName = "John";
        var comments = [];
        var drinkInfoWrapper = $('<div>', {
            class: "drinkInfoWrapper"
        });

        var optionDiv = $('<div>', {
            class: "optionDiv"
        });

        var likeDrink = false;

        if(userInfoObj2) {
            for(var i = 0; i < userInfoObj2.like.length; i++) {
                if(userInfoObj2.like[i] == data._id) {
                    console.log('found');
                    likeDrink = true;
                }
            }
        }


        var likeButton = $('<a>', {
            class: "heartButton",
            "data-liked": likeDrink
        }).on('click', function(e) {
            console.log(e);
            if($(e.target).data().liked === true) {
                var drinkId = $(this).parents('.drinkItem').children().prop('id');
                var username = sessionStorage.getItem('userName');
                clientSocket.emit('drink_unlike', drinkId, username);
                $(e.target).data().liked = false;
            } else {
                var drinkId = $(this).parents('.drinkItem').children().prop('id');
                var username = sessionStorage.getItem('userName');
                clientSocket.emit('drink_like', drinkId, username);
                $(e.target).data().liked = true;
            }
        });

        if(likeDrink == true) {
            $(likeButton).addClass('clickedHeart');
        }

        var commentButton = $('<a>', {
            class: "commentButton"
        }).on('click', function(e) {
            var ulComment = $(e.target).parents('.drinkInfoWrapper').find('.commentUl');
            var createCommentDiv = $('<div>', {
                class: "createComDiv"
            });

            var commentForm = $('<form>', {
                class: 'commentForm',
            }).submit(function(e){
                e.preventDefault();
                var commentText = $(e.target).find( "input" ).val();
                var userName = sessionStorage.getItem('userName')
                var drinkId = $(e.target).parents('.drinkItem').children().prop('id');
                var comment = {
                    userName: userName,
                    commentText: commentText
                }
                clientSocket.emit('drink_comment', JSON.stringify(comment), drinkId);
                $(e.target).remove();
            });


            var inputField = $('<input>', {
                type: 'text',
                class: 'commentInput',
                placeholder: "Add a comment ..."
            });

            var submitButton = $('<input>', {
                type: 'submit',
                class: 'submitButtonCom',
                placeholder: "Submit"
            });
            $(commentForm).append(inputField);
            $(commentForm).append(submitButton);
            $(createCommentDiv).append(commentForm);
            $(ulComment).append(createCommentDiv);


            var drinkId = $(this).parents('.drinkItem').children().prop('id');
        });

        var selectInst = $('<div>', {
            class: "selectIng",
            html: "Instructions"
        }).on('click', function(e) {
            $(e.target).parent().parent().find('.instDiv').addClass('active').siblings('.active').removeClass('active');
            $(e.target).addClass('selectDisp').siblings('.selectDisp').removeClass('selectDisp');
        });

        var selectComment = $('<div>', {
            class: "selectCom selectDisp",
            html: "Comments"
        }).on('click', function(e) {
            $(e.target).parent().parent().find('.commentDiv').addClass('active').siblings('.active').removeClass('active');
            $(e.target).addClass('selectDisp').siblings('.selectDisp').removeClass('selectDisp');
        });

// COMMENT DIV CREATION

        var commentDiv = $('<div>', {
            class: "commentDiv active"
        });

        var likeDiv = $('<div>', {

            class: "likeDiv"
        });

        console.log(data);

        var pLike = $('<p>', {
            html: " " + data.like + " likes",
            class: "pLike"
        });

        var blueHeart = $('<a>', {
            class: "blueHeart"
        });

        $(likeDiv).prepend(blueHeart);
        $(likeDiv).append(pLike);

        var descDiv = $('<div>', {
            html: " " + desc,
            class: "descDiv"
        });

        var userName = $('<a>', {
            html: descUserName,
            class: "userName"
        });

        $(descDiv).prepend(userName);

        var commentUl = $('<ul>', {
            class: "commentUl"
        });

        if (data.comments) {
            for(var i = 0; i < data.comments.length; i++) {
                var commentLi = $('<li>', {
                    class: "commentLi",
                    html: " " + data.comments[i].commentText
                });

                var comUserName = $('<a>', {
                    html: data.comments[i].userName,
                    class: "userName"
                });

                $(commentLi).prepend(comUserName);
                $(commentUl).append(commentLi);
            }
        }



// END COMMENT DIV

// INSTRUCTION DIV CREATION

        var instDiv = $('<div>', {
            class: "instDiv"
        });

        var ingrDiv = $('<div>', {
            class: "ingrDiv"
        });

        var ingrUl = $('<ul>', {
            class: "ingrUl"
        });

        for(var i = 0; i < data.ingredients.length; i++) {
            var ingrLi = $('<li>', {
                class: "ingrLi",
                html: data.ingredients[i][0]
            });

            var ingrCl = $('<a>', {
                html: data.ingredients[i][1] + " cl ",
                class: "ingrCl"
            });

            $(ingrLi).prepend(ingrCl);
            $(ingrUl).append(ingrLi);
        }

        var instructions = "Shake all ingredients (except banana slice) with ice and strain into a chilled whiskey sour glass. Garnish with the banana slice and serve.";

        var instDescDiv = $('<div>', {
            html: instructions,
            class: "instDescDiv"
        });

        $(ingrDiv).append(ingrUl);

        $(instDiv).append(ingrDiv);
        $(instDiv).append(instDescDiv);

        $(optionDiv).append(likeButton);
        $(optionDiv).append(commentButton);
        $(optionDiv).append(selectComment);
        $(optionDiv).append(selectInst);

        $(commentDiv).append(likeDiv);
        $(commentDiv).append(descDiv);
        $(commentDiv).append(commentUl);

        $(drinkInfoWrapper).append(optionDiv);
        $(drinkInfoWrapper).append(commentDiv);
        $(drinkInfoWrapper).append(instDiv);

        $(drinkItemDiv).append(canvasElement);
        $(drinkItemDiv).append(drinkInfoWrapper);
        $('.drinkContainer').append(drinkItemDiv).children("div:last").hide();
        drawDrink(data, data._id);

        function testa(){
            nyTest = setTimeout(testfunc, 1000);
        }

        function testfunc() {
            $('.drinkContainer').children("div").fadeIn(1000);
            $('#spinner').hide();
        }

        testa();

    };

    // Like succeded

    clientSocket.on('like_succeded', function(drinkId){
        $('#' + drinkId).siblings().find('.heartButton').removeClass('heartButton').addClass('clickedHeart');

    });

    clientSocket.on('unlike_succeded', function(drinkId) {
        $('#' + drinkId).siblings().find('.clickedHeart').removeClass('clickedHeart').addClass('heartButton');
    });

    clientSocket.on('unlike_count', function(drinkId){
        var pLikeElement = $('#' + drinkId).siblings().find('.pLike');
        var currentLikes = parseInt(pLikeElement.html());
        $('#' + drinkId).siblings().find('.pLike').html(" " + (currentLikes - 1) + " likes");
    });

    clientSocket.on('like_count', function(drinkId){
        var pLikeElement = $('#' + drinkId).siblings().find('.pLike');
        var currentLikes = parseInt(pLikeElement.html());
        $('#' + drinkId).siblings().find('.pLike').html(" " + (currentLikes + 1) + " likes");
    });

    // Comment succeded

    clientSocket.on('comment_succeded', function(comment, drinkId){
        var comment = JSON.parse(comment);
        var commentUl = $('#' + drinkId).siblings().find('.commentUl');
        var commentLi = $('<li>', {
            class: "commentLi",
            html: " " + comment.commentText
        });
        var comUserName = $('<a>', {
            html: comment.userName,
            class: "userName"
        });
        $(commentLi).prepend(comUserName);
        $(commentUl).append(commentLi).hide().fadeIn(900);
    });


});




