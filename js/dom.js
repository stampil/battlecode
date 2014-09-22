
document.getElementById("scan_button").onclick = function (e) {
    scan();
};

var menu_buttons = document.getElementsByClassName("menu_button");
var all_contents = document.getElementsByClassName("content");

function display_contents(value){
    for (var i = 0; i < all_contents.length; i++) {
            all_contents[i].style.display=value;
        }
}

function check_save(to_check){
    for (var i=0; i< to_check.length; i++){
    var check_cookie = cookie.get('codebar_'+to_check[i]);

    if(check_cookie){
        document.getElementById('start_button').value='Continuer la partie';
        var BBF = new BattleBarFighter(JSON.parse(check_cookie));
        BBF.displayCodeBar();
    }
}
}


for (var i = 0; i < menu_buttons.length; i++) {
    menu_buttons[i].onclick = function (e) {
        var clicked = e.srcElement.id;
        document.getElementById('card').style.display='none';
        document.getElementById("menu").style.display="none";
        document.getElementById("scan").style.display="block";
        document.getElementById("content_"+clicked).style.display="block";  

        if(clicked=="player_1"){
            check_save([type_character]); //, type_armor, type_weapon
        }
    };
}

document.getElementById("title_button").onclick = function (e) {
    document.getElementById('card').style.display='none';
    document.getElementById("menu").style.display="block";
    document.getElementById("scan").style.display="none";
    display_contents("none");
    
};

