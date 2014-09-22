function BattleBarFighter(codebar) {
    this.codebar = codebar;
    this.PV;
    this.FO;
    this.ARMOR;
    this.name ='';
    this.type;
    this.sousType;

    this.stringNumber = codebar.text.toString();

    var maxPV = 10000;
    var maxFO = 4000;
    var maxARMOR = 2500;
    var self = this;
    var c = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "x", "y", "z"];
    var v = ["a", "i", "e", "o", "u"];


    var type = [
        ["Legionnaire", "Decurion", "Centurion", "Legat"],
        ["Glaive", "Pugio"],
        ["Lorica hamata", "Lorica segmentata"]
    ];

    generate_PV();
    generate_FO();
    generate_ARMOR();
    setType();

    var cookie = new Cookie('codebar_' + this.type, JSON.stringify(codebar));
    generate_roman_name();


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

    }


    function generate_PV() {
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
    }

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
    }

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
    }


    function get_letter(tab, inc) {
        return tab[(parseInt(self.stringNumber[inc]) + tab.length * 13) % tab.length];
    }

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

    }


    function generate_roman_name() {
        if(self.type != type_character) return false;
        var sumMax = maxARMOR + maxFO + maxPV;
        var sumCaract = self.ARMOR + self.FO + self.PV;
        var grade_decurion = sumMax * 50 / 100;
        var grade_centurion = sumMax * 70 / 100;
        var grade_legat = sumMax * 85 / 100;
        var inc = self.stringNumber.length - 1;

        self.name ='';

        if (parseInt(self.stringNumber[inc]) % 5 == 0) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'ius ';
        }
        else if (parseInt(self.stringNumber[inc]) % 5 == 1) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'us ';
        }
        else if (parseInt(self.stringNumber[inc]) % 5 == 2) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'us ';
        }
        else {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'ius ';
        }

        if (parseInt(self.stringNumber[inc]) % 3 == 0) {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'us ';
        }
        else {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
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
        else {
            self.name += get_letter(c, inc--).toUpperCase();
            self.name += get_letter(v, inc--);
            self.name += get_letter(c, inc--);
            self.name += 'us';
        }
    }

    this.save = function () {
        ajax('setCodeBar.php', 'result=' + this.codebar.text + '&format=' + this.codebar.format + '&id_gsm=123', 'cb_set_code_bar');
    };

    this.displayCodeBar = function () {
        document.getElementById('card').style.display='block';
        document.querySelector('#card .VDA .PV').style.display='block';
        document.querySelector('#card .VDA .FO').style.display='block';
        document.querySelector('#card .VDA .ARMOR').style.display='block';
        document.querySelector('#card .top').textContent = type[this.type][this.sousType];
        document.querySelector('#card .picture').src=get_picture();
        document.querySelector('#card .bottom').textContent =this.name;
        document.querySelector('#card .VDA .PV span').innerHTML =this.PV;
        document.querySelector('#card .VDA .FO span').innerHTML =this.FO;
        document.querySelector('#card .VDA .ARMOR span').innerHTML =this.ARMOR;
        if(this.type==type_armor){
            document.querySelector('#card .VDA .PV').style.display='none';
            document.querySelector('#card .VDA .FO').style.display='none';
        }
        else if(this.type==type_weapon){
            document.querySelector('#card .VDA .PV').style.display='none';
            document.querySelector('#card .VDA .ARMOR').style.display='none';
        }

    };


}