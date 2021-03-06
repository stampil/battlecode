function BattleBarFighter(codebar, playerNumber) {
    this.codebar = codebar;
    this.PV;
    this.FO;
    this.ARMOR;
    this.name = '';
    this.type;
    this.sousType;
    this.playerNumber = playerNumber;
    this.typeFight;
    this.stringNumber = codebar.text.toString();
    this.nbVictoire=0;

    var maxPV = 10000;
    var maxFO = 4000;
    var maxARMOR = 2500;
    var self = this;
    var c = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "x", "z"];
    var cc = ["st", "rp", "bd", "cc", "ll", "mn", "pl", "ch"];
    var v = ["a", "i", "e", "o", "u", "y"];

    var cookie = {};

    var type = [
        ["Legionnaire", "Decurion", "Centurion", "Legat"],
        ["Glaive", "Pugio"],
        ["Lorica hamata", "Lorica segmentata"]
    ];

    generate_PV();
    generate_VICTOIRE();
    generate_FO();
    generate_ARMOR();
    setType();
    toCookie();

    generate_roman_name();

    function toCookie() {
        if (self.playerNumber == player1) {
            self.codebar.PV = self.PV;
            self.codebar.nbVictoire = self.nbVictoire;
            cookie = new Cookie('codebar_' + self.type, JSON.stringify(self.codebar));
        }
    };

    function setType() {

        var sumMax = maxARMOR + maxFO + maxPV;
        var sumCaract = self.ARMOR + self.FO + self.PV;
        var grade_decurion = sumMax * 50 / 100;
        var grade_centurion = sumMax * 70 / 100;
        var grade_legat = sumMax * 85 / 100;

        self.type = type_character;
        self.sousType = sstype_legionnaire;

        if (sumCaract >= grade_legat) {
            self.type = type_character;
            self.sousType = sstype_legat;
        } else if (sumCaract >= grade_centurion) {
            self.type = type_character;
            self.sousType = sstype_centurion;
        } else if (sumCaract >= grade_decurion) {
            self.type = type_character;
            self.sousType = sstype_decurion;
        }

        if (self.PV < 2000) {
            if (self.ARMOR < 1000) {
                self.type = type_armor;
                self.sousType = sstype_lorica_hamata;
            } else {
                self.type = type_armor;
                self.sousType = sstype_lorica_segmentata;
            }
        }

        if (self.FO < 500) {
            self.type = type_weapon;
            self.sousType = sstype_pugio;
        }
        else if (self.FO < 1000) {
            self.sousType = sstype_glaive;
        }

    };

    function generate_VICTOIRE() {
        if(self.codebar.nbVictoire){
            self.nbVictoire= self.codebar.nbVictoire;
            return;
        }
    };

    function generate_PV() {
        if(self.codebar.PV){
            self.PV= self.codebar.PV;
            return;
        }
        self.PV = 0;
        for (var i = 0; i < self.stringNumber.length; i++) {
            if (i % 2 == 1) {
                self.PV += (parseInt(self.stringNumber[i]) + 1) * 315;
            }
            else {
                self.PV += (parseInt(self.stringNumber[i]) + 1) * 87;
            }
        }
        self.PV %= maxPV;
    };

    function generate_FO() {

        self.FO = 0;
        for (var i = 0; i < self.stringNumber.length; i++) {
            if (i % 3 == 0) {
                self.FO += (parseInt(self.stringNumber[i]) + 1) * 515;
            } else {
                self.FO += (parseInt(self.stringNumber[i]) + 1) * 95;
            }
        }
        self.FO %= maxFO;
    };

    function generate_ARMOR() {

        self.ARMOR = 0;
        for (var i = 0; i < self.stringNumber.length; i++) {
            if (i % 3 == 1) {
                self.ARMOR += (parseInt(self.stringNumber[i]) + 1) * 315;
            }
            else {
                self.ARMOR += (parseInt(self.stringNumber[i]) + 1) * 63;
            }
        }
        self.ARMOR %= maxARMOR;
    };


    function get_letter(tab, inc) {
        return tab[(parseInt(self.stringNumber[inc]) + tab.length * 13) % tab.length];
    };

    function get_picture() {

        if (self.type == type_weapon) {
            switch (self.sousType) {
                case sstype_glaive:
                    return 'img/glaive.jpg';
                    break;
                case sstype_pugio:
                    return 'img/pugio.jpg';
                    break;
            }
        }
        else if (self.type == type_armor) {
            switch (self.sousType) {
                case sstype_lorica_segmentata:
                    return 'img/lorica_segmentata.jpg';
                    break;
                case sstype_lorica_hamata:
                    return 'img/lorica_hamata.jpg';
                    break;
            }
        }
        else {
            switch (self.sousType) {
                case sstype_legionnaire:
                    return 'img/legionnaire.jpg';
                    break;
                case sstype_centurion:
                    return 'img/centurion.jpg'
                    break;
                case sstype_decurion:
                    return 'img/decurion.jpg'
                    break;
                case sstype_legat:
                    return 'img/legat.jpg';
                    break;

            }
        }

    };


    function generate_roman_name() {
        if (self.type != type_character)
            return false;
        var sumMax = maxARMOR + maxFO + maxPV;
        var sumCaract = self.ARMOR + self.FO + self.PV;
        var grade_decurion = sumMax * 50 / 100;
        var grade_centurion = sumMax * 70 / 100;
        var grade_legat = sumMax * 85 / 100;
        var inc = self.stringNumber.length - 1;

        self.name = '';

        if (parseInt(self.stringNumber[inc]) % 8 == 0) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'ius ';
        }
        else if (parseInt(self.stringNumber[inc]) % 8 == 1) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'us ';
        }
        else if (parseInt(self.stringNumber[inc]) % 8 == 2) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'us ';
        }
        else if (parseInt(self.stringNumber[inc]) % 8 == 3) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'ius ';
        }
        else if (parseInt(self.stringNumber[inc]) % 8 == 4) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(cc, inc--);
            self.name += 'ius ';
        }
        else if (parseInt(self.stringNumber[inc]) % 8 == 5) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(cc, inc--);
            self.name += 'us ';
        }
        else if (parseInt(self.stringNumber[inc]) % 8 == 6) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(v, inc--);
            self.name += get_letter(cc, inc--);
            self.name += 'us ';
        }
        else {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(v, inc--);
            self.name += get_letter(cc, inc--);
            self.name += 'ius ';
        }

        if (parseInt(self.stringNumber[inc]) % 4 == 0) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'us ';
        }
        else if (parseInt(self.stringNumber[inc]) % 4 == 1) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'ius ';
        }
        else if (parseInt(self.stringNumber[inc]) % 4 == 2) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(cc, inc--);
            self.name += 'us ';
        }
        else {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(cc, inc--);
            self.name += 'ius ';
        }


        if (parseInt(self.stringNumber[inc]) % 4 == 0) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'ar';
        }
        else if (parseInt(self.stringNumber[inc]) % 4 == 1) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'or';
        }
        else if (parseInt(self.stringNumber[inc]) % 4 == 2) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'ius';
        }
        else if (parseInt(self.stringNumber[inc]) % 4 == 3) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(cc, inc--);
            self.name += 'ius';
        }
        else {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'us';
        }
    };

    this.toBDD = function () {
        ajax('setCodeBar.php', 'result=' + this.codebar.text + '&format=' + this.codebar.format + '&name=' + this.name + '&nbVictoire=' + this.nbVictoire + '&id_gsm=123', 'cb_set_code_bar');
    };
    
    this.displayVictoire = function(){
        document.getElementById('nb_combat').textContent=Math.min(99,this.nbVictoire);
    };

    this.addVictoire = function(){
        this.nbVictoire++;
        this.displayVictoire();
        toCookie();
    };
    
    this.takeDammage = function (nb) {
        this.PV -= nb;
        self.codebar.PV = this.PV;
        toCookie();
        //fun note if a charactere as low pv it become a item.
        this.displayCodeBar();
    };

    this.displayCodeBar = function () {
        var where;
        if(this.type == type_character){
            where ='card_player'+this.playerNumber;
        }
        else where = 'card_' + this.type;
        show(where);
        document.querySelector('#' + where + ' .top').textContent = type[this.type][this.sousType];
        document.querySelector('#' + where + ' .picture').src = get_picture();
        if (this.name)
            document.querySelector('#' + where + ' .bottom').textContent = this.name;
        if (this.type == type_armor) {
            document.querySelector('#' + where + ' .VDA .ARMOR span').innerHTML = '+' + this.ARMOR;
        }
        else if (this.type == type_weapon) {
            document.querySelector('#' + where + ' .VDA .FO span').innerHTML = '+' + this.FO;
        }
        else {
            document.querySelector('#' + where + ' .VDA .PV span').innerHTML = this.PV;
            document.querySelector('#' + where + ' .VDA .FO span').innerHTML = this.FO;
            document.querySelector('#' + where + ' .VDA .ARMOR span').innerHTML = this.ARMOR;
        }

    };


    this.fight = function (type_fight) {
        this.typeFight=type_fight;
        if (this.type !== type_character) {
            return false;
        }

        if (this.typeFight == fight_attack) {
            document.getElementById("valeur_jauge" + (this.playerNumber == player2 ? '2' : '')).className = "animate_attack";
        }
        else {
            document.getElementById("valeur_jauge" + (this.playerNumber == player2 ? '2' : '')).className = "animate_defense";
        }
        jauges("start");
        return true;
    };

    this.click_fight = function () {
        jauges("stop");
        var percent = 0;
        var ret =0;
        var domret={};
        if(this.playerNumber==player1){
            percent = Math.round(dom_jauge.clientWidth/dom_jauge_container.clientWidth*100);
            domret = document.getElementById("label_jauge");
        }
        else{
            percent = Math.round(dom_jauge2.clientWidth/dom_jauge_container.clientWidth*100);
            domret = document.getElementById("label_jauge2");
        }
        if (this.typeFight == fight_attack) {
            ret = Math.round(this.FO*percent/100);
        }
        else{
            ret = Math.round(this.ARMOR*percent/100);
        }
        domret.innerHTML=ret;
        return ret;
    };
    
}