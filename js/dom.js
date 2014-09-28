
document.getElementById("scan_button").onclick = function (e) {
    scan();
};

var menu_buttons = document.getElementsByClassName("menu_button");
var all_contents = document.getElementsByClassName("content");
var width = document.body.clientWidth;
var height = document.body.clientHeight;

var all_buttons = document.querySelectorAll('input[type="button"]');

for ( var i=0; i< all_buttons.length; i++){
    all_buttons[i].style.width=(width-20)+'px';
}

function display_contents(value) {
    for (var i = 0; i < all_contents.length; i++) {
        all_contents[i].style.display = value;
    }
}

function check_save(to_check) {
    for (var i = 0; i < to_check.length; i++) {
        var check_cookie = cookie.get('codebar_' + to_check[i]);

        if (check_cookie) {
            document.getElementById('start_button').value = 'Continuer la partie';
            var BBF = new BattleBarFighter(JSON.parse(check_cookie));
            BBF.displayCodeBar();
            if(BBF.type==type_character){
                player_1 = BBF;
            }
        }
    }
}


for (var i = 0; i < menu_buttons.length; i++) {
    menu_buttons[i].onclick = function (e) {
        var clicked = e.srcElement.id;
        display_contents("none");
        document.getElementById("menu").style.display = "none";
        document.getElementById("scan").style.display = "block";
        document.getElementById("content_" + clicked).style.display = "block";

        if (clicked == "player_1") {
            document.getElementById("cards").style.display = "block";
            check_save([type_character, type_armor, type_weapon]);
        }
    };
}

document.getElementById("title_button").onclick = function (e) {

    document.getElementById("menu").style.display = "block";
    display_contents("none");

};

document.getElementById("start_button").onclick = function(){
    if(player_1){
        display_contents("none");
        document.getElementById("cards").style.display = "block";
        document.getElementById('combat').style.display='block';
        document.getElementById("card_ennemi").style.display = "block";
        document.getElementById("card_"+type_armor).style.display = "none";
        document.getElementById("card_"+type_weapon).style.display = "none";

        player_1.fight(fight_attack);
    }
}

document.getElementById("img_ennemi").onclick = function(){
    if(player_1){
        player_1.click_fight();

        document.getElementById('img_ennemi').classList.remove('blink');
        document.getElementById('img_player_1').classList.add('blink');
        player_1.fight(fight_defense);
    }
}

document.getElementById("img_player_1").onclick = function(){
    if(player_1){
        player_1.click_fight();

        document.getElementById('img_ennemi').classList.add('blink');
        document.getElementById('img_player_1').classList.remove('blink');
        player_1.fight(fight_attack);
    }
}

