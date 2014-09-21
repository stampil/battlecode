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
    var end = ['ith','on','er','an','us','as','oth','ion','ius','aure','or','ob'];
    var c = ["b","c","d","f","g","h","j","k","l","m","n","p","r","s","t","v","w","x","y","z"];
    var v =["a","i","e","o","u"];
    var type_caractere =2;
    var type_arme=1;
    var type_armure=0;
    var type = ["armure","arme","personnage"];

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
                console.log(i,self.stringNumber[i],1,167,self.PV);
            }
            else{
                self.PV+= (parseInt(self.stringNumber[i])+1)*87;
                console.log(i,self.stringNumber[i],1,87,self.PV);;
            }
        }
        self.PV %= maxPV;
    }

    function generate_FO(){

        self.FO=0;
        for (var i=0; i<self.stringNumber.length; i++){
            if(i%3==0){
                self.FO+= (parseInt(self.stringNumber[i])+1)*315;
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

    function generate_name(){
        var sumMax = maxARMOR+maxFO+maxPV;
        var sumCaract = self.ARMOR+self.FO+self.PV;
        var limit_mega = sumMax*2/3;
        var limit_super = sumMax/3;
        self.name='';
        if (sumCaract> limit_mega ){
            self.name+= 'Mega ';
        }else if(sumCaract>limit_super){
            self.name+= 'Super ';
        }


        var inc = self.stringNumber.length-1;

        if(parseInt(self.stringNumber[1])%4==0){
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += get_letter(c,inc--);
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += get_letter(end,inc--);
        }
        else if(parseInt(string[1])%4==1) {
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += get_letter(end,inc--);
        }
        else if(parseInt(string[1])%4==2) {
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += get_letter(c,inc--);
            self.name += get_letter(end,inc--);
        }
        else{
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += get_letter(end,inc--);
        }

    }

    function generate_roman_name(){
        var sumMax = maxARMOR+maxFO+maxPV;
        var sumCaract = self.ARMOR+self.FO+self.PV;
        var limit_mega = sumMax*2/3;
        var limit_super = sumMax/3;
        self.name='';
        if (sumCaract> limit_mega ){
            self.name+= 'Centurion ';
        }else if(sumCaract>limit_super){
            self.name+= 'Decurion ';
        }else{
            self.name+= 'Legionnaire ';
        }


        var inc = self.stringNumber.length-1;

        self.name += get_letter(c,inc--).toUpperCase();
        self.name += get_letter(v,inc--);
        self.name += get_letter(c,inc--);
        self.name += 'ius ';



        if(parseInt(self.stringNumber[inc])%2==0){
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(c,inc--);
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += 'us ';
        }
        else{
            self.name += get_letter(c,inc--).toUpperCase();
            self.name += get_letter(v,inc--);
            self.name += get_letter(c,inc--);
            self.name += get_letter(c,inc--);
            self.name += 'us ';
        }
        self.name += get_letter(c,inc--).toUpperCase();
        self.name += get_letter(v,inc--);
        self.name += get_letter(c,inc--);
        self.name += 'ar';




    }

    this.save = function(){
        ajax('setCodeBar.php','result='+this.codebar.text+'&format='+this.codebar.format+'&id_gsm=123','cb_set_code_bar');
    };

    this.displayCodeBar = function(div){
        if(this.type==type_caractere){
            document.getElementById(div).innerHTML =this.stringNumber+'<div id="name">'+this.name+'</div><div id="PV">VIE: '+this.PV+'/'+maxPV+'</div><div id="FO">DEGAT: '+this.FO+'/'+maxFO+'</div><div id="ARMOR">ARMURE: '+this.ARMOR+'/'+maxARMOR+'</div>';
        }
        else if(this.type==type_arme){
            document.getElementById(div).innerHTML = this.stringNumber+'<div id="name">Epée</div><div id="FO">DEGAT: +'+this.FO+'</div>';
        }
        else{
            document.getElementById(div).innerHTML = this.stringNumber+'<div id="name">Armure</div><div id="ARMOR">ARMURE: +'+this.ARMOR+'</div>';
        }
    };

}