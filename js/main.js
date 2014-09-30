if (typeof cordova == 'undefined') {
    var cordova = {
        plugins: {
            barcodeScanner: {
                scan: null
            }
        }
    }

    cordova.plugins.barcodeScanner.scan = function () {
        //document.getElementById('ret').textContent='Scan non disponible';
        o = fake_scan(1);
        if (o.type == type_character) {
            character_player1 = o;
            show("start_button");
        }

    }
}


function check_save(to_check) {
    for (var i = 0; i < to_check.length; i++) {
        var check_cookie = cookie.get('codebar_' + to_check[i]);

        if (check_cookie) {
            document.getElementById('start_button').value = 'Continuer la partie';
            var BBF = new BattleBarFighter(JSON.parse(check_cookie), player1);
            BBF.displayCodeBar();
            if (BBF.type == type_character) {
                character_player1 = BBF;
                show("start_button");
            }
        }
    }
}

function fake_scan(player) {
    var BBF = new BattleBarFighter({text: Math.round((Math.random() * 1000000000000) + 1000000000000).toString(), format: 'fake_scan'}, player);
    BBF.displayCodeBar();
    return BBF;
}

function scan() {
    cordova.plugins.barcodeScanner.scan(
            function (result) {
                /*
                 result.text result.format  result.cancelled
                 */


                if (result.text) {
                    var BBF = new BattleBarFighter(result, player1);
                    BBF.toBDD();
                    BBF.displayCodeBar();
                    if (BBF.type == type_character) {
                        character_player1 = BBF;
                        show("start_button");
                    }
                }
                else {
                    document.getElementById('ret').textContent = 'Scanning cancelled';
                }

            },
            function (error) {
                var ret = "Scanning failed: " + error;
                document.getElementById('ret').textContent = ret;
            }
    );
}


function ajax(page, param, callback) {
    var head = document.getElementsByTagName('head').item(0);
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'http://vps36292.ovh.net/mordu/BATTLECODE/' + page + '?' + param + '&callback=' + callback);
    head.appendChild(script);
}

function display(display, tab) {
    for (var i = 0; i < tab.length; i++) {
        elId = tab[i];
        if (document.getElementById(elId)) {
            document.getElementById(elId).style.display = display;
            //console.info(display, '#' + elId);
        }
        else {
            console.error(elId, 'not an dom id to ' + display);
        }
    }
    ;
}

function displayClass(display, tab) {
    for (var i = 0; i < tab.length; i++) {
        elClass = tab[i];
        var els = document.getElementsByClassName(elClass);
        for (var j = 0; j < els.length; j++) {
            els[j].style.display = display;
            //console.info(display, '.' + els[j].className);
        }
    }
}

function show() {
    display("block", arguments);
}

function hide() {
    display("none", arguments);
}

function showClass() {
    displayClass("block", arguments);
}

function hideClass() {
    displayClass("none", arguments);
}




function jauges(param) {
    if (param == 'start' && !interval_p1) {
        dom_jauge.style.webkitAnimationPlayState = '';
        dom_jauge2.style.webkitAnimationPlayState = '';
        interval_p1 = setInterval(function () {
            document.getElementById('label_jauge').innerHTML = dom_jauge.clientWidth;
        }, interval_p_timing);
        interval_p2 = setInterval(function () {
            document.getElementById('label_jauge2').innerHTML = dom_jauge2.clientWidth;
        }, interval_p_timing);
    } else if (param == 'stop') {
        if (dom_jauge.style.webkitAnimationPlayState != 'paused') {
            dom_jauge.style.webkitAnimationPlayState = 'paused';
            dom_jauge2.style.webkitAnimationPlayState = 'paused';
        }
        setTimeout(function () {
            clearInterval(interval_p1);
            interval_p1 = null;
            clearInterval(interval_p2);
            interval_p2 = null;
        }, interval_p_timing+1);

    }
}