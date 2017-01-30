/**
 * Created by dinotrainer on 2016-03-10.
 */
/**********
 TODO:
 - Accessories menu
 - Edit ingredient functionality
 - Illustrate and add accessories + glasses
 - Font compability
 - Title menu + adjust font by string length
 - Ingredient adding by keyword only

 BUGS:
 - Sometimes fucks up max value on remove(?)
 - Switching glass gives missalignment (Should disable controls when in other menu)
 - add console logging in functions for testing

 ETC:
 - Changed fabric.js version due to compability issues

 **********/


$(document).ready(function() {

    $('.actionbox').hide();
    //$('#newIngredient').hide();

    function overlayDiv(divID,newDiv){
        /*
         var newDiv = '<div id="' + ((drink.ingredients.length) - 1) + '" class="ingredientBox"></div>'
         var divID = '#' + ((drink.ingredients.length) - 1);
         $("#container").append(newDiv);
         $(divID).css({
         'margin-top': $('#addingredient').css('margin-top')
         });
         */
        console.log(newDiv);
        console.log(divID);
        $("#container").append(newDiv);
        $(divID).css({
            'margin-top': $('#addingredient').css('margin-top')
        });
    }

    function moveAdd(value){
        oldValue = parseInt($('#addingredient').css('margin-top'), 10);
        newValue = oldValue + value + 'px';
        $("#addingredient").css({
            'margin-top': newValue
        });
    }

    function removeDiv(id){
        var divID = '#' + id;
        $(divID).remove();
    }

    function addIngredientMenu(max){
        $('#amountSlider').attr('max', max);
        $('#inputAmount span').text(max);
        $('#newIngredient').show();
    }

    function submitInputs(){
        var name = $('#inputName input').val();
        var color = $('#inputColor input').val();
        var amount = $('#inputAmount input').val();
        $('#inputName input').val('');
        $('#inputColor input').val('');
        $('#inputAmount input').val('');
        $('#amountValue').val('');
        $('#newIngredient').hide();
        return [name, color, amount];
    }

    function closeForm(){
        $('#inputName input').val('');
        $('#inputColor input').val('');
        $('#inputAmount input').val('');
        $('#amountValue').val('');
        $('#newIngredient').hide();
    }

    $('#amountSlider').on("change mousemove", function(){
        $('#amountValue').val($(this).val());
    });

    $('#amountValue').on("change value", function(){
        if ($(this).val() == parseInt($(this).val()) && parseInt($(this).val()) <= max){
            $('#amountSlider').val($(this).val());
        }else{
            $('#amountValue').val($('#amountSlider').val());
        }
    });

    var max;

    (function() {
        glasses = {
            Cocktail: {
                sprite: '<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg2" viewBox="0 0 320 400.00001" height="400" width="320"> <defs id="defs4" /> <metadata id="metadata7"> <rdf:RDF> <cc:Work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /> <dc:title></dc:title> </cc:Work> </rdf:RDF> </metadata> <g style="display:inline" id="layer4"> <path id="path4181" d="m 61.693272,101.46929 c -6.534624,-1.556411 21.230412,38.21133 40.092288,60.09139 14.39044,19.05571 39.40617,53.64797 43.17133,52.82379 7.64387,4.56946 14.56699,1.71221 19.69797,-1.26269 4.74108,-1.40289 22.66543,-25.29489 43.43656,-54.04316 27.16513,-36.28275 39.95679,-56.36682 37.12311,-58.84139 -60.88172,0.11724 -121.73453,-0.0834 -183.521258,1.23206 z" style="fill:none;fill-rule:evenodd;stroke:#00e5f7;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> </g> <g style="display:inline" id="layer2"> <path transform="translate(0,-652.36216)" id="path4153" d="m 143.92857,866.64787 c 6.78571,3.55766 12.58928,3.76248 20.35714,-0.35714 l 1.51786,115.35714 c 12.19245,0.10518 23.3275,1.55451 33.83929,5.35715 4.64263,2.02404 9.47949,3.85384 12.5,7.5 2.02541,1.7407 3.51269,3.66078 3.5281,6.07148 l -1.74239,4.6428 c -3.94467,2.9955 -8.23905,5.1167 -12.85714,6.4286 -31.72264,7.3617 -63.25682,7.718 -94.64286,-0.3572 -4.25314,-0.9097 -8.222422,-3.5226 -12.142856,-6.4285 l -1.890319,-3.9286 c 0.162897,-1.90477 0.300157,-3.80953 1.622463,-5.7143 2.429288,-2.46285 5.423127,-3.7966 8.303572,-5.35714 7.3639,-1.95567 14.10549,-4.90251 21.01913,-4.8954 5.29865,-1.1017 8.79869,-1.3041 12.85714,-1.78571 l 7.37373,-0.46175 z" style="display:inline;fill:#000000;fill-opacity:0.01944442;fill-rule:evenodd;stroke:none;stroke-width:0.30000001;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path d="m 149.97205,215.72687 c -0.0347,0.4977 -0.0212,0.99738 -0.0153,1.49586 0.005,0.39366 0.008,0.78734 0.009,1.18102 9.1e-4,0.35724 8.3e-4,0.71449 8.2e-4,1.07173 -3e-5,0.35658 -7e-5,0.71316 -9e-5,1.06974 -2e-5,0.3571 -2e-5,0.71421 -2e-5,1.07131 0.002,0.35976 0.0147,0.71697 -0.0472,1.07242 -0.0713,0.30125 -0.10144,0.60841 -0.11847,0.91675 -0.0145,0.34826 -0.0138,0.69692 -0.0141,1.04542 1.7e-4,0.35738 7e-4,0.71475 9.7e-4,1.07213 0.002,0.35989 0.015,0.71724 -0.047,1.07283 -0.0713,0.30126 -0.10143,0.60842 -0.11847,0.91677 -0.0195,0.35925 0.002,0.7191 -0.0364,1.07691 -0.0636,0.35424 -0.0942,0.71315 -0.1838,1.06211 -0.091,0.29147 -0.12058,0.59419 -0.13817,0.89736 0.005,0.34393 -0.0228,0.67971 -0.0905,1.01657 -0.066,0.30788 -0.0822,0.62256 -0.0932,0.93626 -0.009,0.35193 -0.008,0.70401 -0.008,1.05602 0.003,0.36007 0.0155,0.71757 -0.0463,1.07337 -0.0711,0.3014 -0.10127,0.60866 -0.1183,0.91711 -0.0145,0.34826 -0.0138,0.69693 -0.0141,1.04542 1.8e-4,0.35738 7e-4,0.71475 9.7e-4,1.07212 2.4e-4,0.35729 2.6e-4,0.71458 2.8e-4,1.07187 2e-5,0.35715 1e-5,0.7143 1e-5,1.07145 -1e-5,0.35714 -1e-5,0.71428 -1e-5,1.07142 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07142 0,0.35715 0,0.71429 0,1.07143 0,0.35715 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07142 0,0.35715 0,0.71429 0,1.07143 0,0.35715 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07142 0.0286,0.34329 -0.042,0.67539 -0.10418,1.01004 -0.0553,0.31761 -0.0642,0.64045 -0.0715,0.96197 0.0102,0.32883 -0.082,0.64709 -0.13039,0.96971 -0.0422,0.32822 -0.0464,0.65964 -0.0506,0.99005 -0.003,0.35572 -0.002,0.71145 -0.001,1.06718 4.5e-4,0.35746 6.2e-4,0.71491 7.1e-4,1.07237 7e-5,0.35718 7e-5,0.71437 7e-5,1.07155 0,0.35714 -1e-5,0.71428 -1e-5,1.07142 0,0.35715 0,0.71429 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07142 0,0.35715 0,0.71429 0,1.07143 0,0.35715 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07142 0,0.35715 0,0.71429 0,1.07143 0,0.35715 0,0.71429 0,1.07143 0.0141,0.34601 -0.0286,0.69657 0.0214,1.03994 0.0718,0.35821 0.11303,0.72057 0.1372,1.08477 0.0197,0.36261 0.0203,0.72588 0.0211,1.08892 1.8e-4,0.35744 -4.9e-4,0.71489 -8.1e-4,1.07233 -3e-4,0.35707 -3.5e-4,0.71414 -3.8e-4,1.07121 -2e-5,0.35713 -2e-5,0.71427 -1e-5,1.0714 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07142 0,0.35715 0,0.71429 0,1.07143 0,0.35715 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07142 -0.0321,0.32283 0.0223,0.62491 0.0862,0.93779 0.064,0.3375 0.0778,0.68128 0.0877,1.02377 0.007,0.35767 0.006,0.71545 0.006,1.07317 -4.8e-4,0.35746 -8e-4,0.71493 -9.8e-4,1.07239 -1.5e-4,0.35716 -1.5e-4,0.71431 -1.6e-4,1.07147 0,0.35714 1e-5,0.71428 1e-5,1.07142 0,0.35714 0,0.71428 0,1.07142 0,0.35715 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07142 0,0.35715 0,0.71429 0,1.07143 0,0.35715 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07142 0,0.35715 0,0.71429 0,1.07143 0,0.35715 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07142 0,0.35715 0,0.71429 0,1.07143 0,0.35715 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71429 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07143 0,0.35714 0,0.71428 0,1.07142 0.0239,0.34161 -0.069,0.65718 -0.20619,0.96429 -0.1182,0.25546 -0.25357,0.50277 -0.39179,0.74811 -0.17895,0.22249 -0.26999,0.49038 -0.4292,0.7267 -0.19064,0.22321 -0.37564,0.44136 -0.58292,0.64877 -0.22137,0.16707 -0.45539,0.36292 -0.73027,0.4308 -0.26429,0.0673 -0.46044,0.26917 -0.72223,0.33945 -0.25085,0.16816 -0.54164,0.20507 -0.82046,0.28878 -0.27646,0.11993 -0.57337,0.13553 -0.85624,0.22944 -0.30209,0.10014 -0.61595,0.1753 -0.91634,0.27928 -0.27825,0.13284 -0.58218,0.15642 -0.87022,0.25498 -0.26146,0.0728 -0.53246,0.12579 -0.77979,0.24088 -0.0438,0.0224 -0.0876,0.0447 -0.13134,0.0671 0,0 -5.25749,-0.71757 -5.25749,-0.71757 l 0,0 c 0.0418,-0.011 0.0836,-0.022 0.12546,-0.0329 0.0874,-0.0409 0.16186,-0.1065 0.24937,-0.14726 0.0413,-0.0192 0.0897,-0.0176 0.13318,-0.0312 0.14513,-0.0454 0.25297,-0.15827 0.41327,-0.14753 0.15216,-0.0331 0.2778,-0.10907 0.42348,-0.14931 0.14097,-0.0389 0.30676,4.5e-4 0.44386,-0.0672 0.1022,-0.0383 0.19564,-0.0988 0.29953,-0.13233 0.20418,-0.0658 0.43929,-0.0451 0.61989,-0.18792 0.15107,-0.0329 0.27654,-0.10899 0.42118,-0.14843 0.13634,-0.0372 0.29663,0.004 0.43031,-0.0572 0.0949,-0.0332 0.18084,-0.091 0.27774,-0.11799 0.17126,-0.0477 0.37354,0.007 0.53115,-0.10621 0.15209,-0.0995 0.2173,-0.0707 0.37007,-0.13673 0.20772,-0.0898 0.0186,-0.0351 0.22943,-0.16869 0.0379,-0.024 0.0835,-0.0326 0.12528,-0.049 0.15819,-0.0962 0.21718,-0.065 0.37782,-0.12121 0.23489,-0.0823 -0.0139,-0.0161 0.22309,-0.14373 0.034,-0.0183 0.0747,-0.0196 0.11211,-0.0295 0.24539,-0.13999 0.41867,-0.3328 0.57977,-0.56375 0.24566,-0.16263 0.2617,-0.43844 0.41725,-0.67139 0.18612,-0.1694 0.22782,-0.42587 0.38639,-0.61658 0.0963,-0.25474 0.25539,-0.46747 0.21435,-0.75802 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07142 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07142 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07142 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 -10e-6,-1.07142 0,-0.35714 0,-0.71429 0,-1.07143 10e-6,-0.35725 2e-5,-0.71449 1.9e-4,-1.07174 2.1e-4,-0.35748 5.9e-4,-0.71496 9.9e-4,-1.07244 1.5e-4,-0.35187 0.001,-0.70381 -0.008,-1.05558 -0.0116,-0.31354 -0.029,-0.62794 -0.096,-0.93548 -0.0692,-0.34573 -0.093,-0.69051 -0.0756,-1.04334 0,-0.35714 0,-0.71428 0,-1.07142 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07142 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 -1e-5,-0.35714 -1e-5,-0.71428 -1e-5,-1.07142 0,-0.35716 -1e-5,-0.71431 1e-5,-1.07146 4e-5,-0.35722 9e-5,-0.71443 3.9e-4,-1.07165 3.3e-4,-0.35684 0.001,-0.71368 7.8e-4,-1.07053 -9e-4,-0.35137 -0.001,-0.70301 -0.0214,-1.05393 -0.0253,-0.35543 -0.0747,-0.70726 -0.13705,-1.05808 -0.0371,-0.36648 -0.0164,-0.73491 -0.0213,-1.10293 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07142 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07142 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 10e-6,-1.07143 0,-0.35714 0,-0.71428 0,-1.07142 0,-0.35714 1e-5,-0.71428 -5e-5,-1.07142 -8e-5,-0.35729 -2.1e-4,-0.71458 -6.6e-4,-1.07187 -4.3e-4,-0.35792 -10e-4,-0.71584 6.1e-4,-1.07376 0.003,-0.35258 0.007,-0.70591 0.0454,-1.05684 0.0388,-0.30454 0.12918,-0.60137 0.13509,-0.90767 0.006,-0.34855 0.0146,-0.69817 0.0658,-1.04361 0.0511,-0.30644 0.14439,-0.60304 0.11094,-0.9177 0,-0.35714 0,-0.71428 0,-1.07142 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07142 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07142 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35715 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71429 0,-1.07143 0,-0.35714 0,-0.71428 0,-1.07143 0,-0.35713 1e-5,-0.71427 0,-1.07141 -1e-5,-0.35717 -3e-5,-0.71434 -2.4e-4,-1.07152 -2.5e-4,-0.35758 -7.2e-4,-0.71516 -0.001,-1.07274 5e-5,-0.35727 -7.5e-4,-0.71467 0.0115,-1.07178 0.0152,-0.33338 0.038,-0.66765 0.11371,-0.99374 0.0725,-0.32047 0.0571,-0.64194 0.0535,-0.96978 -2.9e-4,-0.35775 -0.001,-0.71555 0.006,-1.07325 0.01,-0.3429 0.0238,-0.68705 0.0876,-1.02499 0.0633,-0.31286 0.11557,-0.61656 0.0953,-0.93892 0.0164,-0.34103 0.0407,-0.68399 0.13621,-1.01368 0.0977,-0.32134 0.13491,-0.64949 0.19013,-0.98107 0.0477,-0.34387 0.007,-0.6942 0.032,-1.0403 0.0152,-0.33338 0.038,-0.66767 0.11388,-0.99374 0.0726,-0.32013 0.0576,-0.64131 0.0542,-0.96886 -2.4e-4,-0.35758 -7.1e-4,-0.71516 -10e-4,-1.07274 4e-5,-0.35728 -7.6e-4,-0.71468 0.0115,-1.0718 0.0152,-0.33339 0.038,-0.66769 0.11388,-0.99377 0.0726,-0.3201 0.0577,-0.64125 0.0544,-0.96879 0,-0.3571 -1e-5,-0.71421 -2e-5,-1.07131 -2e-5,-0.35658 -6e-5,-0.71316 -9e-5,-1.06974 -1e-5,-0.35724 -9e-5,-0.71447 8.2e-4,-1.07171 0.001,-0.39358 0.004,-0.78717 0.009,-1.18073 0.006,-0.49864 0.0194,-0.99848 -0.0153,-1.49633 0,0 5.30124,0.0833 5.30124,0.0833 z" id="path4162" style="fill:#000000;fill-opacity:0.05833333;stroke:none;stroke-width:0.30000001;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path d="m 143.37541,334.86201 c -0.76362,-0.002 -1.52246,0.11771 -2.28176,0.19047 -0.94136,0.11844 -1.88772,0.1882 -2.82879,0.30849 -0.97818,0.13166 -1.95637,0.26515 -2.93025,0.42637 -0.77317,0.11508 -1.54456,0.27272 -2.29224,0.50261 -0.38099,0.14836 -0.78357,0.22244 -1.17074,0.34941 -0.28749,0.0794 -0.57671,0.14433 -0.86344,0.22717 -0.26986,0.13178 -0.5531,0.21213 -0.8482,0.26184 -0.30591,0.0276 -0.5998,0.11805 -0.90232,0.16769 -0.35014,0.0497 -0.7043,0.0557 -1.05729,0.0607 -0.30872,-0.0144 -0.60758,0.071 -0.91029,0.11733 -0.35968,0.0324 -0.71716,0.0641 -1.07439,0.11866 -0.43996,0.0971 -0.88039,0.18728 -1.32742,0.24466 -0.42701,0.0445 -0.85737,0.0474 -1.28633,0.053 -0.3409,0.0123 -0.68401,-0.0223 -1.02156,0.0348 -0.33258,0.051 -0.65253,0.15458 -0.98238,0.21753 -0.34488,0.0464 -0.69284,0.0834 -1.02384,0.19638 -0.30112,0.13633 -0.62189,0.2 -0.94802,0.23783 -0.35112,0.0167 -0.69364,0.0985 -1.04095,0.14687 -0.35515,0.05 -0.71428,0.0455 -1.07137,0.0676 -0.40431,0.0652 -0.81092,0.11209 -1.21921,0.14278 -0.43602,0.007 -0.8673,0.0621 -1.29941,0.11536 -0.45651,0.0268 -0.89329,0.15812 -1.335,0.26314 -0.42493,0.10635 -0.86347,0.12698 -1.29275,0.20692 -0.33875,0.0797 -0.6881,0.0917 -1.02575,0.17401 -0.29183,0.0614 -0.57989,0.12494 -0.86663,0.20678 -0.31546,0.11696 -0.64225,0.19559 -0.96414,0.29179 -0.33488,0.11394 -0.67882,0.19944 -1.01632,0.30471 -0.30268,0.12393 -0.61398,0.22538 -0.919,0.3426 -0.27967,0.1307 -0.58583,0.17463 -0.87764,0.26763 -0.2601,0.0551 -0.49752,0.13923 -0.7272,0.27024 -0.26175,0.1196 -0.52766,0.22991 -0.79541,0.33601 -0.28057,0.087 -0.50198,0.28075 -0.75486,0.42018 -0.25953,0.13508 -0.53394,0.2275 -0.80655,0.33019 -0.27535,0.0726 -0.50148,0.23745 -0.75092,0.36553 -0.24839,0.15813 -0.47557,0.33223 -0.74818,0.44835 -0.204,0.12259 -0.39094,0.27698 -0.59084,0.41059 -0.23935,0.1339 -0.44031,0.29263 -0.60053,0.51578 -0.16933,0.20058 -0.37123,0.37388 -0.53432,0.57946 -0.11998,0.22332 -0.28258,0.43594 -0.464556,0.61471 -0.166702,0.17841 -0.312457,0.36362 -0.434294,0.57604 -0.194105,0.17944 -0.315724,0.41063 -0.477757,0.61181 -0.145881,0.20573 -0.290153,0.40707 -0.412079,0.62928 -0.192535,0.18457 -0.316353,0.41779 -0.480263,0.62113 -0.06719,0.18976 -0.265987,0.2602 -0.387727,0.40241 -0.01984,0.0232 -0.03251,0.0516 -0.04877,0.0775 -0.03318,0.0335 -0.06635,0.067 -0.09953,0.10048 -0.17843,0.1959 -0.287577,0.42418 -0.488647,0.59929 -0.176674,0.1675 -0.264511,0.39484 -0.405467,0.58607 -0.08596,0.25426 -0.257156,0.4544 -0.3996,0.67705 -0.148866,0.25035 -0.226443,0.38408 -0.257272,0.67895 -0.14239,0.2624 -0.16903,0.55134 -0.185318,0.84329 -0.01285,0.33979 -0.01042,0.67993 -0.0097,1.0199 1.64e-4,0.0593 3.27e-4,0.11861 4.91e-4,0.17792 0,0 -3.109845,-4.28084 -3.109845,-4.28084 l 0,0 c 2.31e-4,-0.0597 4.61e-4,-0.11935 6.92e-4,-0.17903 0.0033,-0.35352 0.0059,-0.7084 0.05396,-1.05931 0.05121,-0.3027 0.149875,-0.58789 0.232368,-0.88188 0.09659,-0.28629 0.249664,-0.54031 0.414297,-0.79234 0.151291,-0.21345 0.248268,-0.45539 0.393338,-0.67287 0.132609,-0.23988 0.311196,-0.45356 0.502996,-0.64832 0.15656,-0.19446 0.288403,-0.40986 0.468207,-0.58671 0.160713,-0.18424 0.35934,-0.32936 0.481122,-0.54535 0.133512,-0.21075 0.312024,-0.38566 0.444276,-0.59719 0.146614,-0.22008 0.288905,-0.44171 0.448206,-0.65331 0.135202,-0.21262 0.314568,-0.38911 0.455869,-0.59736 0.158255,-0.21788 0.318568,-0.43078 0.507905,-0.62357 0.157517,-0.19882 0.299442,-0.40814 0.454912,-0.6083 0.178717,-0.18653 0.353203,-0.37694 0.525754,-0.56919 0.216655,-0.23061 0.451011,-0.43079 0.722795,-0.5942 0.228029,-0.15821 0.444985,-0.33716 0.692376,-0.46314 0.261283,-0.0948 0.461655,-0.29548 0.708731,-0.42044 0.26422,-0.13408 0.49706,-0.3244 0.79109,-0.39545 0.24903,-0.10263 0.51201,-0.16868 0.75109,-0.2976 0.26812,-0.14443 0.50574,-0.34725 0.80069,-0.44129 0.24361,-0.11123 0.49436,-0.2061 0.73932,-0.31324 0.26085,-0.14865 0.52657,-0.26958 0.82517,-0.32005 0.28309,-0.0919 0.57455,-0.13707 0.8516,-0.24728 0.31354,-0.12417 0.64105,-0.21353 0.94901,-0.35362 0.33887,-0.11277 0.69222,-0.18368 1.02804,-0.30698 0.32481,-0.098 0.65532,-0.17654 0.96852,-0.3091 0.29255,-0.0773 0.5774,-0.16752 0.87827,-0.20937 0.35024,-0.091 0.70419,-0.11527 1.06081,-0.17453 0.42549,-0.0828 0.85397,-0.10746 1.281,-0.18198 0.46088,-0.10637 0.91236,-0.27027 1.38871,-0.29298 0.44049,-0.0462 0.87412,-0.14623 1.31802,-0.14092 0.39704,-0.0176 0.79421,-0.0474 1.18341,-0.13264 0.35462,-0.0639 0.71577,-0.03 1.07404,-0.0693 0.35399,-0.0377 0.69885,-0.12634 1.05165,-0.15891 0.2847,-0.0201 0.5662,-0.0551 0.82778,-0.17836 0.35458,-0.13311 0.73241,-0.1894 1.10826,-0.22433 0.32946,-0.058 0.64045,-0.1777 0.97105,-0.22855 0.37087,-0.0793 0.73883,-0.0782 1.11755,-0.0645 0.41347,0.002 0.8273,0.003 1.24003,-0.0259 0.44172,-0.0366 0.87931,-0.10448 1.30457,-0.2334 0.35826,-0.0567 0.70898,-0.13912 1.0739,-0.13933 0.3264,-0.0393 0.64413,-0.14098 0.97304,-0.14223 0.33045,-0.002 0.66164,-0.002 0.99088,-0.0342 0.30628,-0.0378 0.59828,-0.13525 0.90351,-0.16834 0.27819,-0.031 0.53715,-0.0995 0.78527,-0.23412 0.28319,-0.0752 0.55899,-0.16352 0.84824,-0.21361 0.40007,-0.12401 0.81347,-0.18203 1.21453,-0.30577 0.77933,-0.20282 1.57223,-0.36919 2.36814,-0.49059 0.97996,-0.15025 1.96667,-0.2564 2.94625,-0.41056 0.94431,-0.15464 1.89947,-0.19646 2.84674,-0.33182 0.76218,-0.0696 1.5188,-0.17961 2.27156,-0.31708 0,0 2.40701,4.72402 2.40701,4.72402 z" id="path4174" style="fill:#000000;fill-opacity:0.05833333;stroke:none;stroke-width:0.30000001;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> </g> <g style="display:inline" id="layer3"> <path id="path4176" d="m 62.73855,102.10511 c 0.778721,6.51503 14.870865,26.45729 34.981949,52.63904 21.871291,28.47328 39.662651,53.09257 46.270881,58.05244 8.29552,5.70282 17.34345,1.53097 21.87015,-1.96298 7.94005,-6.03052 78.23706,-98.53979 78.61071,-109.89742" style="display:inline;fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> </g> <g style="display:inline" transform="translate(0,-652.36216)" id="layer1"> <path id="path4140" d="m 62.857143,753.43359 c 62.939907,0.0813 115.833327,-1.72814 181.428567,-1.07143 10,0 -43.57142,70 -70.71428,105 -12.97619,14.57624 -25.95238,17.39165 -38.92857,-0.35714 C 109.16667,822.48121 49.642857,752.36216 62.857143,753.43359 Z" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path id="path4142" d="m 143.88361,866.55723 0.074,116.44885 c -26.01214,1.09396 -45.331437,5.96522 -50.431801,13.20071 -13.939524,29.10281 138.724481,26.72371 120.449531,0.21818 -4.07099,-5.12552 -17.97092,-14.51051 -48.02711,-14.54633 L 164.6549,865.73648" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path id="path4148" d="m 143.99597,983.1145 c 0.0699,8.74694 0.35778,11.43874 -6.49519,12.1862" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.89999998;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path id="path4150" d="m 165.90128,982.6391 c 0.10828,7.56314 -0.84904,12.91137 4.38035,12.56598" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.89999998;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> </g> </svg>',
                capacity: 70,
                capacityCL: 15,
                scaleValue: 0.7,
                rectX: 10,
                rectY: 236,
                spriteX: -10,
                spriteY: 85,
                index: 0
            },
            Rocks: {
                sprite: '<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" id="svg4234" version="1.1" viewBox="0 0 256 320" height="400" width="320"> <metadata id="metadata4257"> <rdf:RDF> <cc:Work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /> <dc:title></dc:title> </cc:Work> </rdf:RDF> </metadata> <defs id="defs4255" /> <g style="display:inline" id="layer7"> <path id="path6519" d="M 56.258579,85.682843 C 53.910111,124.54944 54.507506,177.77965 56.517157,203.37574 103.45987,204.00573 147.656,202.23248 191.63431,200.26863 193.31584,161.48413 193.35153,121.4558 190.35147,84.6 144.13362,85.080752 100.2231,85.577645 56.258579,85.682843 Z" style="fill:none;fill-rule:evenodd;stroke:#00ff00;stroke-width:0.31999999;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> </g> <g style="display:inline" id="layer6"> <path id="path6516" d="m 56.214989,86.301207 c -2.774499,40.315983 -2.070785,77.498083 -0.02929,116.677653 45.592691,0.96372 92.073051,0.32735 135.723081,-2.62132 1.4708,-36.2959 1.76902,-76.7918 -1.27278,-115.187699" style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:2.4000001;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> </g> <g style="display:inline" id="layer4"> <path id="path4832" d="m 55.02086,85.61212 136.89588,-1.131368 c 3.57266,46.615738 2.51135,92.154608 0.56568,134.067448 -44.45363,2.68655 -89.62096,3.70785 -136.33018,1.13137 C 53.05843,173.1793 51.74406,127.86532 55.02086,85.61212 Z" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <path id="path4836" d="m 55.15147,204 c 45.57382,1.10404 91.37187,0.86273 137.69706,-2.54142" style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1.60000002;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> </g> <g style="display:inline" id="layer5"> <path id="path4972" d="m 55.578593,203.89306 c 45.958587,1.74442 91.738647,0.98939 137.320137,-2.54558 l -0.42427,17.11198 c -45.66381,2.80304 -91.18441,3.60104 -136.471603,1.13138 z" style="fill:#000000;fill-opacity:0.07886436;fill-rule:evenodd;stroke:none;stroke-width:0.40000001;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> <rect y="204.39999" x="55.900002" height="15.799999" width="39" id="rect6511" style="fill:#000000;fill-opacity:0.07886436;stroke:none;stroke-width:0.5;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> </g> </svg> ',
                capacity: 140,
                capacityCL: 20,
                scaleValue: 1,
                rectX: 0,
                rectY: 311,

                spriteX: -25,
                spriteY: 105,

                index: 1
            }
        };

        var drink = {
            name: "Your drink",
            ingredients: [],
            glassType: "Cocktail"
        };

        var canvas = new fabric.StaticCanvas(cnvs);
        canvas.setHeight(400);
        canvas.setWidth(320);

        var boxDrawY = 60;
        var boxDrawX = 205;
        var ingredientTextX = 225;
        var ingredientTextY = 60;
        var fillPerCl = (glasses[drink.glassType].capacity / glasses[drink.glassType].capacityCL);
        max = glasses[drink.glassType].capacityCL;
        var startY = glasses[drink.glassType].rectY;
        var startX = 10;

        //canvas.backgroundColor = 'rgba(0,0,255,0.3)';
        var liquids = new fabric.Group();
        var sprites = new fabric.Group();
        var masks = new fabric.Group();
        var holder = {};

        var title = new fabric.IText('Your drinkname', {
            fontFamily: 'Pacifico',
            top: 20,
            left: 25,
            fontSize: 23,
            angle: 0
        });

        //console.log();
        function loadMasks() {
            for (var key in glasses) {
                fabric.loadSVGFromString(glasses[key].sprite,
                    function(objects, options) {
                        mask = objects[0];
                        mask.set({
                                left: glasses[key].spriteX,
                                top: glasses[key].spriteY,
                                scaleX: glasses[key].scaleValue,
                                scaleY: glasses[key].scaleValue,
                                strokeWidth: 0.2
                            })
                            .setCoords();
                        masks.add(mask);
                    });
            }
        }

        function loadSprites() {
            for (var key in glasses) {
                //console.log(key);
                fabric.loadSVGFromString(glasses[key].sprite,
                    function(objects, options) {
                        var obj = fabric.util.groupSVGElements(objects, options);
                        obj.set({
                                left: glasses[key].spriteX,
                                top: glasses[key].spriteY,
                                scaleX: glasses[key].scaleValue,
                                scaleY: glasses[key].scaleValue,
                                strokeWidth: 4
                            })
                            .setCoords();
                        sprites.add(obj);
                    });
            }
        }

        function addIngredient(name, color, amount) {
            console.log('add triggered', 'current max:', max);

            holder[name] = new fabric.Group();
            max -= parseFloat(amount);
            var currentGlass = drink.glassType;
            canvas.remove(masks.item(glasses[currentGlass].index));
            canvas.remove(sprites.item(glasses[currentGlass].index));
            canvas.remove(liquids);

            console.log(max);

            //Format rect
            newIngredient = new fabric.Rect({
                top: startY - (amount * fillPerCl),
                left: startX,
                width: 185,
                height: (amount * fillPerCl),
                fill: color
            });
            startY = startY - (amount * fillPerCl);

            //Add to group
            liquids.add(newIngredient);

            //Add box
            var fillBox = new fabric.Rect({
                left: boxDrawX,
                top: boxDrawY,
                fill: color,
                stroke: 'black',
                strokeWidth: 1,
                width: 12,
                height: 12
            });
            holder[name].add(fillBox);
            boxDrawY += 30;

            //Add boxtext
            var stringThreshold = 12;
            var fontSize = 12;

            if (name.length < stringThreshold) {
                var newText = new fabric.IText(name, {
                    fontFamily: 'Short Stack',
                    top: ingredientTextY,
                    left: ingredientTextX,
                    fontSize: fontSize,
                    angle: -3
                });
                holder[name].add(newText);
                ingredientTextY += 30;
            } else {
                var seperated = name.split(' ');
                for (j = 0; j < seperated.length; j++) {
                    var newText = new fabric.IText(seperated[j], {
                        fontFamily: 'Short Stack',
                        top: (ingredientTextY) - 5,
                        left: ingredientTextX,
                        fontSize: fontSize,
                        angle: -3
                    });
                    holder[name].add(newText);
                    ingredientTextY += 12; //between words
                }
                ingredientTextY += 6; //afterpadding
            }

            //Add to drink template
            ingredientString = [name, color, amount];
            drink.ingredients.push(ingredientString);

            //Move Add ingredient button
            moveAdd(30);

            //Clip and render
            liquids.clipTo = function(ctx) {
                masks.item(glasses[currentGlass].index).render(ctx);
            }

            canvas.add(holder[name]);
            canvas.add(liquids);
            canvas.add(sprites.item(glasses[currentGlass].index));
        }

        function removeIngredient(ingredient) {
            console.log('remove triggered', 'current max:', max);
            max += parseFloat(drink.ingredients[ingredient][2]);
            console.log('updated max', max);

            //Remove rect from liquids
            var height = liquids.item(ingredient).height;
            liquids.remove(liquids.item(ingredient));

            //Remove box and text
            canvas.remove(holder[drink.ingredients[ingredient][0]]);

            //Remove from drink template
            drink.ingredients.splice(ingredient, 1);

            //Move Add ingredient div
            moveAdd(-30);

            //Reformat boxes and text
            for (var i = (ingredient); i < drink.ingredients.length; i++) {
                ingredientTextY -= 30;
                boxDrawY -= 30;
                for (var j = 0; j < holder[drink.ingredients[i][0]].toObject().objects.length; j++){
                    holder[drink.ingredients[i][0]].item(j).setTop(holder[drink.ingredients[i][0]].item(j).top - 30);
                }
            }

            //Reformat liquids
            for (var i = (ingredient); i < liquids.toObject().objects.length; i++){
                liquids.item(i).setTop(liquids.item(i).top + height);
            }

            canvas.renderAll();

        }

        function editIngredient(ingredient){

        }

        function switchGlass(direction) {
            //Calculate next glass
            currentGlass = drink.glassType;
            list = Object.keys(glasses);
            for (i in list) {
                if (list[i] == currentGlass) {
                    if (list[i] == (list[0])) {
                        previous = list[list.length - 1];
                    } else {
                        previous = list[parseInt(i) - 1];
                    }
                    if (list[i] == (list[list.length - 1])) {
                        next = list[0];
                    } else {
                        next = list[parseInt(i) + 1];
                    }
                }
            }

            //Clean canvas
            canvas.remove(masks.item(glasses[currentGlass].index));
            canvas.remove(sprites.item(glasses[currentGlass].index));
            canvas.remove(liquids);

            if (direction == 'right') {
                drink.glassType = next;
            }else if (direction == 'left') {
                drink.glassType = previous;
            }

            //Adjust for current glass
            var fillPerCl = (glasses[drink.glassType].capacity / glasses[drink.glassType].capacityCL);
            var startY = glasses[drink.glassType].rectY;

            for(i = 0; i < (liquids.toObject().objects.length); i++){
                var current = parseInt(i);
                liquids.item(i).setTop(startY - (drink.ingredients[i][2] * fillPerCl));
                liquids.item(i).setHeight((drink.ingredients[i][2] * fillPerCl));
                startY = startY - (drink.ingredients[i][2] * fillPerCl);
            }

            liquids.clipTo = function(ctx) {
                masks.item(glasses[drink.glassType].index).render(ctx);
            }

            canvas.add(liquids);
            canvas.add(sprites.item(glasses[drink.glassType].index));
            canvas.renderAll();
        }

        function editTitle(newTitle){
            //TODO: Add functionality for adjusting size/positioning based on length after fonts are fixed.
            title.setText(newTitle);
        }

        function addAccessory(){
            //TODO: Illustrate and implement accessories.
        }

        loadMasks();
        loadSprites();
        canvas.add(title);
        canvas.add(masks.item(0));
        canvas.add(sprites.item(0));

        /*
         name1 = 'Vodka superdup';
         color1 = '#6699ff'
         amount1 = 1;
         name2 = 'Lemon';
         color2 = '#ccff66'
         amount2 = 1;
         name3 = 'Lemon twistsss';
         color3 = '#aaff33'
         amount3 = 1;
         addIngredient(name1, color1, amount1);
         addIngredient(name2, color2, amount2);
         addIngredient(name3, color3, amount3);
         addIngredient('Vou', color1, amount1);

         */

        //Event handlers
        var $ = function(id) {
            return document.getElementById(id)
        };

        var remove0 = $('0');
        remove0.onclick = function() {
            removeIngredient(0);
        }
        var remove1 = $('1');
        remove1.onclick = function() {
            removeIngredient(1);
        }
        var remove2 = $('2');
        remove2.onclick = function() {
            removeIngredient(2);
        }
        var remove3 = $('3');
        remove3.onclick = function() {
            removeIngredient(3);
        }
        var remove4 = $('4');
        remove4.onclick = function() {
            removeIngredient(4);
        }
        var remove5 = $('5');
        remove5.onclick = function() {
            removeIngredient(5);
        }
        var remove6 = $('6');
        remove6.onclick = function() {
            removeIngredient(6);
        }
        var remove7 = $('7');
        remove7.onclick = function() {
            removeIngredient(7);
        }
        var remove8 = $('8');
        remove8.onclick = function() {
            removeIngredient(8);
        }
        var remove9 = $('9');
        remove9.onclick = function() {
            removeIngredient(9);
        }
        var remove10 = $('10');
        remove10.onclick = function() {
            removeIngredient(10);
        }

        var switchLeft = $('modify-glass');
        switchLeft.onclick = function() {
            switchGlass('left');
        }

        var switchRight = $('modify-glass2');
        switchRight.onclick = function() {
            switchGlass('right');
        }

        var addingredient = $('addingredient');
        addingredient.onclick = function() {
            console.log(max);
            addIngredientMenu(max);
        }

        var submit = $('submit');
        submit.onclick = function() {
            input = (submitInputs());
            addIngredient(input[0], input[1], input[2]);
        }

        var cancel = $('cancel');
        cancel.onclick = function() {
            closeForm();
        }

    })();
    //console.log();


});