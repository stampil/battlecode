document.getElementById("scan_button").onclick = function (e) {
    scan();
};

var menu_buttons = document.getElementsByClassName("menu_button");
var all_contents = document.getElementsByClassName("content");
var width = document.body.clientWidth;
var height = document.body.clientHeight;

var all_buttons = document.querySelectorAll('input[type="button"]');

for (var i = 0; i < all_buttons.length; i++) {
    all_buttons[i].style.width = (width - 20) + 'px';
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
            if (BBF.type == type_character) {
                player_1 = BBF;
            }
        }
    }
}


for (var i = 0; i < menu_buttons.length; i++) {
    menu_buttons[i].onclick = function (e) {
        var clicked = e.srcElement.id;
        display_contents("none");
        clearTimeout(timeout_click_fight);
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

document.getElementById("start_button").onclick = function () {
    if (player_1) {
        display_contents("none");
        document.getElementById("cards").style.display = "block";
        document.getElementById('combat').style.display = 'block';
        document.getElementById("card_ennemi").style.display = "block";
        document.getElementById("card_" + type_armor).style.display = "none";
        document.getElementById("card_" + type_weapon).style.display = "none";
        document.getElementById('div_img_ennemi').classList.add('picture_equipement');
        document.getElementById('div_img_player_1').classList.add('picture_equipement');

        do {
           player_2 = fake_scan('IA','card_ennemi');
        }
        while (player_2.type != type_character);

        player_1.fight(fight_attack);
        player_2.fight(fight_defense);
        fight_attack_desactivate = false;
    }
}

document.getElementById("td_ennemi").onclick = function () {
    document.getElementById("result_fight").innerHTML="";
    if (fight_attack_desactivate){
        console.warn('P2 click desactivated');
        return false;
    }
    console.info('P2 click clicked');
    fight_attack_desactivate = true;
    if (player_1) {
        var res1 = player_1.click_fight();
        var res2 = player_2.click_fight();
        console.log('attaque',res1,res2);
        if(timeout_click_fight){
            clearTimeout(timeout_click_fight);
            timeout_click_fight=null;
        }
        document.getElementById('img_ennemi').classList.remove('blink');
        var degat = res1-res2;
        if(degat>0){
            console.log('degat fait',degat);
            document.getElementById("result_fight").innerHTML="degat fait :<span class='FO'>"+degat+"</span>";
            player_2.takeDammage(degat);
            if(player_2.PV<=0) return;
        }
        timeout_click_fight =setTimeout(function () {
            document.getElementById('img_player_1').classList.add('blink');
            player_1.fight(fight_defense);
            player_2.fight(fight_attack);
            fight_defense_desactivate = false;
        }, 2000)
    }
    return false;
}

document.getElementById("td_player_1").onclick = function () {
    document.getElementById("result_fight").innerHTML="";
    if (fight_defense_desactivate){
        console.warn('P1 click desactivated');
        return false;
    }
    console.info('P1 click clicked');
    fight_defense_desactivate = true;
    if (player_1) {
        var res1 = player_1.click_fight();
        var res2 = player_2.click_fight();
        console.log('defense',res1,res2);
        if(timeout_click_fight){
            clearTimeout(timeout_click_fight);
            timeout_click_fight=null;
        }
        document.getElementById('img_player_1').classList.remove('blink');
        var degat = res2-res1;
        if(degat>0){
            console.log('degat subit',degat);
            document.getElementById("result_fight").innerHTML="degat subit :<span class='FO'>"+degat+"</span>";
            player_1.takeDammage(degat);
            if(player_1.PV<=0) return;
        }
        timeout_click_fight =setTimeout(function () {
            document.getElementById('img_ennemi').classList.add('blink');
            player_1.fight(fight_attack);
            player_2.fight(fight_defense);
            fight_attack_desactivate=false;
        }, 3000);

    }
    return false;
}

