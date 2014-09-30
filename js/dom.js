var width = document.body.clientWidth;
var height = document.body.clientHeight;
var dom_jauge = document.getElementById('valeur_jauge');
var dom_jauge2 = document.getElementById('valeur_jauge2');
var dom_jauge_container = document.getElementById('jauge');


document.getElementById("scan_button").onclick = function (e) {
    scan();
};

var all_buttons = document.querySelectorAll('input[type="button"]');

for (var i = 0; i < all_buttons.length; i++) {
    all_buttons[i].style.width = (width - 20) + 'px';
}

var menu_buttons = document.getElementsByClassName("menu_button");
for (var i = 0; i < menu_buttons.length; i++) {
    menu_buttons[i].onclick = function (e) {
        var clicked = e.srcElement.id;
        hideClass("content");
        clearTimeout(timeout_click_fight);
        hide("menu");
        show("content_" + clicked);

        if (clicked == "player_1") {
            show("cards", "scan_button");
            check_save([type_character, type_armor, type_weapon]);
        }
    };
}

document.getElementById("title_button").onclick = function (e) {
    show("menu");
    hideClass("content");
};

document.getElementById("start_button").onclick = function () {
    if (character_player1) {
        hideClass("content");
        show("cards", "combat", "card_player2");
              
        document.getElementById('div_img_player_1').classList.add('picture_equipement');
        document.getElementById('div_img_player_2').classList.add('picture_equipement');
        document.getElementById('img_player_1').classList.remove('blink');
        document.getElementById('img_player_2').classList.remove('blink');
        if(weapon_player1){
            character_player1.FO += weapon_player1.FO;
        }
        if(armor_player1){
            character_player1.ARMOR += armor_player1.ARMOR;
        }
        character_player1.displayCodeBar();
        do {
            character_player2 = fake_scan(player2);
        }
        while (character_player2.type !== type_character);
        
        hide("card_" + type_armor, "card_" + type_weapon);
        character_player1.fight(fight_attack);
        character_player2.fight(fight_defense);
        fight_attack_desactivate = false;
        show("button_attack");
    }
};

document.getElementById("button_attack").onmousedown = function () {
    document.getElementById("result_fight").innerHTML = "&nbsp;";
    if (fight_attack_desactivate) {
        console.warn('P2 click desactivated');
        return false;
    }
    console.info('P2 click clicked');
    fight_attack_desactivate = true;
    if (character_player1) {
        var res1 = character_player1.click_fight();
        var res2 = character_player2.click_fight();
        console.log('attaque', res1, res2);
        if (timeout_click_fight) {
            clearTimeout(timeout_click_fight);
            timeout_click_fight = null;
        }

        var degat = res1 - res2;
        if(degat <0) degat = 0;
        
            console.log('degat fait', degat);
            document.getElementById("result_fight").innerHTML = "degat fait :<span class='FO'>" + degat + "</span>";
            if(degat){
                document.getElementById('img_player_2').classList.add('blink');
                character_player2.takeDammage(degat);
            }
            
            if (character_player2.PV <= 0)
                return;
        
        timeout_click_fight = setTimeout(function () {
            hide("button_attack");
            show("button_defense");
            document.getElementById('img_player_2').classList.remove('blink');
            character_player1.fight(fight_defense);
            character_player2.fight(fight_attack);
            fight_defense_desactivate = false;
        }, 2000);
    }
    return false;
};

document.getElementById("button_defense").onmousedown = function () {
    document.getElementById("result_fight").innerHTML = "&nbsp;";
    if (fight_defense_desactivate) {
        console.warn('P1 click desactivated');
        return false;
    }
    console.info('P1 click clicked');
    fight_defense_desactivate = true;
    if (character_player1) {
        var res1 = character_player1.click_fight();
        var res2 = character_player2.click_fight();
        console.log('defense', res1, res2);
        if (timeout_click_fight) {
            clearTimeout(timeout_click_fight);
            timeout_click_fight = null;
        }
        var degat = res2 - res1;
        if(degat <0) degat = 0;
            console.log('degat subit', degat);
            document.getElementById("result_fight").innerHTML = "degat subit :<span class='FO'>" + degat + "</span>";
            if(degat){
                document.getElementById('img_player_1').classList.add('blink');
                character_player1.takeDammage(degat);
            }
            if (character_player1.PV <= 0)
                return;
        
        timeout_click_fight = setTimeout(function () {
            show("button_attack");
            hide("button_defense");
            document.getElementById('img_player_1').classList.remove('blink');
            character_player1.fight(fight_attack);
            character_player2.fight(fight_defense);
            fight_attack_desactivate = false;
        }, 2000);

    }
    return false;
}