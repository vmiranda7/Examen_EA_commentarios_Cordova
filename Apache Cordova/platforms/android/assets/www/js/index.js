console.log("Bievenido al examen de EA");
windows.alert("hola");
window.onload= get();
var element = new Object();
var elementu =new Object();

function warning(id) {
    document.getElementById('warning'+id).show();
}

function newpost(){
    document.getElementById("A").style.visibility = 'hidden';
    document.getElementById("B").style.display = 'block';
    document.getElementById("new").style.visibility = 'hidden';
    document.getElementById("back").style.display = 'block';
    $( "#A" ).hide();

    $("#name").val("");
    $("#director").val('');
    $("#language").val('');
    $("#description").val('');
}
function back(){
    document.getElementById("A").style.visibility = 'visible';
    document.getElementById("B").style.display = 'none';
    document.getElementById("new").style.visibility = 'visible';
    document.getElementById("back").style.display = 'none';
    $( "#A" ).show();
}
function info(){
    document.getElementById("A").style.visibility = 'hidden';
    document.getElementById("C").style.display = 'block';
    document.getElementById("new").style.visibility = 'hidden';
    document.getElementById("back2").style.display = 'block';
    $( "#A" ).hide();
}
function back2(){
    document.getElementById("A").style.visibility = 'visible';
    document.getElementById("C").style.display = 'none';
    document.getElementById("new").style.visibility = 'visible';
    document.getElementById("back2").style.display = 'none';
    $( "#A" ).show();
}


function get_id(id){
    info();
    var url= "http://localhost:3000/film/"+id;
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            console.log(data);

            var id = data._id;
            var nameu = data.name;
            var directoru = data.director;
            var languageu = data.language;
            var descriptionu = data.description;

            $("#nameu").val(nameu);
            $("#nameu").attr('disabled','disabled');
            $("#directoru").val(directoru);
            $("#languageu").val(languageu);
            $("#descriptionu").val(descriptionu);
            console.log(id);
            elementu._id=id;
            elementu.name=nameu
        },
        error: function (data) {
            window.alert(data);
        }
    });
}

function update(){
    console.log(elementu);

    var directoru = $("#directoru").val();
    var languageu = $("#languageu").val();
    var descriptionu = $("#descriptionu").val();
    var e = document.getElementById("type");
    var type = e.options[e.selectedIndex].value;
    if(directoru!="" && languageu!="" && descriptionu!=""){

        elementu.director = directoru;
        elementu.language = languageu;
        elementu.type = type;
        elementu.description = descriptionu;
        var data = JSON.stringify(elementu);
        console.log(elementu)
        var url = "http://localhost:3000/film/"+elementu._id;
        $.ajax({
            url: url,
            type: 'PUT',
            crossDomain: true,
            contentType: 'application/json',
            data: data,
            success: function (data) {
                document.getElementById("A").style.visibility = 'visible';
                document.getElementById("C").style.display = 'none';
                document.getElementById("new").style.visibility = 'visible';
                document.getElementById("back2").style.display = 'none';
                $( "#A" ).show();
                $('#getlist').text('');
                get();
                warning(5);
            },
            error: function (data) {
                console.log(data);
                console.log("error");
            }
        });
    }
    else{
        warning(6);
    }
}

function delete_id(id){
    var url= "http://localhost:3000/film/"+id;
    $.ajax({
        url: url,
        type: 'DELETE',
        crossDomain: true,
        success: function (data) {
            $('#getlist').text('')
            get();
            warning(4);
        },
        error: function (data) {
            window.alert("Error");
        }
    });
}

function get() {
    var i;
    $.ajax({
        url: "http://localhost:3000/films",
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            for ( i = data.length-1; i >=0; i--) {
                /*
                $('<div style="border:solid;border-color:black;box-shadow: 10px 10px 5px #888888"><h2> ' + data[i].name + '</h2>').appendTo($('#getlist'));
                $('<strong> Director: </strong> ' + data[i].director + '<br>').appendTo($('#getlist'));
                $('<strong> Language: </strong> ' + data[i].language + '<br>').appendTo($('#getlist'));
                $('<strong> Type: </strong> ' + data[i].type + '<br>').appendTo($('#getlist'));
                $('<strong> Description: </strong> ' + data[i].description + '<br>').appendTo($('#getlist'));
                $('<paper-button id=' + data[i]._id + ' class="coloredDelete" raised="true" role="button" onclick="delete_id(id)">DELETE</paper-button> ').appendTo($('#getlist'));
                $('<paper-button id=' + data[i]._id + ' class="colored" style="background-color:#ffcf24" raised="true" role="button" onclick="get_id(id)">UPDATE</paper-button></div> <hr>').appendTo($('#getlist'));
                */
                $('<div  style="border:solid;border-color:#DDDDDD;box-shadow: 5px 5px 5px #e2d9d4"><h2> ' + data[i].name + '</h2><strong> Director: </strong> ' + data[i].director + '<br><strong> Language: </strong> ' + data[i].language + '<br><strong> Type: </strong> ' + data[i].type + '<br><strong> Description: </strong> ' + data[i].description + '<br><br><paper-button id=' + data[i]._id + ' class="coloredDelete" raised="true" role="button" onclick="delete_id(id)">DELETE</paper-button><paper-button id=' + data[i]._id + ' class="colored" style="background-color:#ffcf24" raised="true" role="button" onclick="get_id(id)">UPDATE</paper-button><br><br></div><br>').appendTo($('#getlist'));



            }
        },
        error: function () {
            window.alert("Error");
        }
    });
}

function post() {
    var name = $("#name").val();
    var director = $("#director").val();
    var language = $("#language").val();
    var description = $("#description").val();
    var e = document.getElementById("type");
    var type = e.options[e.selectedIndex].value;
    if(name!=""  && director!="" && language!="" && description!=""){

        element.name = name;
        element.director = director;
        element.language = language;
        element.type = type;
        element.description = description;
        var data = JSON.stringify(element);

        $.ajax({
            url: "http://localhost:3000/films",
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json',
            data: data,
            success: function (data) {
                document.getElementById("A").style.visibility = 'visible';
                document.getElementById("B").style.display = 'none';
                document.getElementById("new").style.visibility = 'visible';
                document.getElementById("back").style.display = 'none';
                $( "#A" ).show();
                $('#getlist').text('')
                get();
                warning(3);
            },
            error: function () {
                warning(2);

            }
        });
    }
    else{
        warning(1);
    }

}
