function BattleBarFighter(codebar) {
    this.codebar=codebar;
    this.PV;
    this.FO;
    this.ARMOR;
    this.name;
    this.type;
    this.stringNumber = codebar.text.toString();

    var maxPV= 10000;
    var maxFO=4000;
    var maxARMOR=2500;
    var self = this;
    var c = ["b","c","d","f","g","h","j","k","l","m","n","p","r","s","t","v","w","x","y","z"];
    var v =["a","i","e","o","u"];
    var type_caractere =2;
    var type_arme=1;
    var type_armure=0;
    var type = ["armure","glaive","personnage"];

    generate_PV();
    generate_FO();
    generate_ARMOR();
    generate_roman_name();
    this.type = getType();

    function getType(){
        if(self.PV<2000){
            return type_armure;
        }
        if(self.FO<1000){
            return type_arme;
        }
        return type_caractere;
    }


    function generate_PV(){
        self.PV=0;
        for (var i=0; i<self.stringNumber.length; i++){
            if(i%2==1){
                self.PV+= (parseInt(self.stringNumber[i])+1)*315;
            }
            else{
                self.PV+= (parseInt(self.stringNumber[i])+1)*87;
            }
        }
        self.PV %= maxPV;
    }

    function generate_FO(){

        self.FO=0;
        for (var i=0; i<self.stringNumber.length; i++){
            if(i%3==0){
                self.FO+= (parseInt(self.stringNumber[i])+1)*515;
            }else{
                self.FO+= (parseInt(self.stringNumber[i])+1)*95;
            }
        }
        self.FO %= maxFO;
    }

    function generate_ARMOR(){

        self.ARMOR=0;
        for (var i=0; i<self.stringNumber.length; i++){
            if(i%3==1){
                self.ARMOR+= (parseInt(self.stringNumber[i])+1)*315;
            }
            else{
                self.ARMOR+= (parseInt(self.stringNumber[i])+1)*63;
            }
        }
        self.ARMOR %= maxARMOR;
    }
    
    
    function get_letter(tab,inc){
        return tab[(parseInt(self.stringNumber[inc])+ tab.length*13)% tab.length];
    }

    function get_picture(){

        var sumMax = maxARMOR+maxFO+maxPV;
        var sumCaract = self.ARMOR+self.FO+self.PV;
        var grade_decurion = sumMax*50/100;
        var grade_centurion = sumMax*70/100;
        var grade_legat = sumMax*85/100;

        if(self.PV<2000){
            return 'img/armure.jpg';
        }
        if(self.FO<1000){
            return 'img/glaive.jpg';
        }

        if (sumCaract>= grade_legat ){
            return 'img/legat.jpg';
        }else if (sumCaract>= grade_centurion ){
            return 'img/centurion.jpg';
        }else if(sumCaract>=grade_decurion){
            return 'img/decurion.jpg'
        }


        return 'img/legionnaire.jpg';
    }


    function generate_roman_name(){
        var sumMax = maxARMOR+maxFO+maxPV;
        var sumCaract = self.ARMOR+self.FO+self.PV;
        var grade_decurion = sumMax*50/100;
        var grade_centurion = sumMax*70/100;
        var grade_legat = sumMax*85/100;
        self.name='Legionnaire ';
        if (sumCaract>= grade_legat ){
            self.name= 'Legat ';
        }else if (sumCaract>= grade_centurion ){
            self.name= 'Centurion ';
        }else if(sumCaract>=grade_decurion){
            self.name= 'Decurion ';
        }


        var inc = self.stringNumber.length-1;

        if(parseInt(self.stringNumber[inc])%5==0){
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += 'ius ';
        }
        else if(parseInt(self.stringNumber[inc])%5==1){
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += 'us ';
        }
        else if(parseInt(self.stringNumber[inc])%5==2){
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += 'us ';
        }
        else{
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += 'ius ';
        }


        if(parseInt(self.stringNumber[inc])%3==0){
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += 'us ';
        }
        else if(parseInt(self.stringNumber[inc])%3==1){
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += 'ius ';
        }
        else{
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += get_letter(v,inc--);
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += 'us ';
        }

        if(parseInt(self.stringNumber[inc])%4==0){
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += 'ar';
        }
        else if(parseInt(self.stringNumber[inc])%4==1){
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += 'or';
        }
        else if(parseInt(self.stringNumber[inc])%4==2){
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += 'ar';
        }
        else{
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += 'us';
        }



    }

    this.save = function(){
        ajax('setCodeBar.php','result='+this.codebar.text+'&format='+this.codebar.format+'&id_gsm=123','cb_set_code_bar');
    };

    this.displayCodeBar = function(div){
        if(this.type==type_caractere){
            document.getElementById(div).innerHTML =this.stringNumber+'<div id="picture"><img id="picture" src="'+get_picture()+'" /></div><div id="name">'+this.name+'</div><div id="PV">VIE: '+this.PV+'/'+maxPV+'</div><div id="FO">DEGAT: '+this.FO+'/'+maxFO+'</div><div id="ARMOR">ARMURE: '+this.ARMOR+'/'+maxARMOR+'</div>';
        }
        else if(this.type==type_arme){
            document.getElementById(div).innerHTML = this.stringNumber+'<div id="picture"><img id="picture" src="'+get_picture()+'" /></div><div id="name">Epée</div><div id="FO">DEGAT: +'+this.FO+'</div>';
        }
        else{
            document.getElementById(div).innerHTML = this.stringNumber+'<div id="picture"><img id="picture" src="'+get_picture()+'" /></div><div id="name">Armure</div><div id="ARMOR">ARMURE: +'+this.ARMOR+'</div>';
        }
    };

}