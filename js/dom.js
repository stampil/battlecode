
document.getElementById("scan_button").onclick = function (e) {
    scan();
};

var menu_buttons = document.getElementsByClassName("menu_button");
var all_contents = document.getElementsByClassName("content");


for (var i = 0; i < menu_buttons.length; i++) {
    menu_buttons[i].onclick = function (e) {
        document.getElementById("menu").style.display="none";
        document.getElementById("scan").style.display="block";
        document.getElementById("content_"+e.srcElement.id).style.display="block";
    };
}

document.getElementById("title_button").onclick = function (e) {
    document.getElementById("menu").style.display="block";
    document.getElementById("scan").style.display="none";
    for( var i=0; i< all_contents; i++){
         all_content[i].style.display="none";
    }
    
};


var to_check = [type_character,type_armor, type_weapon];
for (var i=0; i< to_check.length; i++){
    var check_cookie = cookie.get('codebar_'+to_check[i]);

    if(check_cookie){
        document.getElementById('start_button').value='Continuer la partie';
        var BBF = new BattleBarFighter(JSON.parse(check_cookie));
        BBF.displayCodeBar();
    }
}