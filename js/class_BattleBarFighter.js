function BattleBarFighter(codebar) {
    this.codebar=codebar;
    this.PV;
    this.FO;
    this.ARMOR;
    this.name;
    this.type;
    this.stringNumber = codebar.text.toString();

    var maxPV;
    var maxFO;
    var maxARMOR;
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
    generate_name();

    function getType(){
        self.type = 0;
        for (var i=0; i<self.stringNumber.length; i++){
            if(i%2==1){
                self.type += (parseInt(self.stringNumber[i])+1)*167;
            }
            else{
                self.type += (parseInt(self.stringNumber[i])+1)*233;
            }
        }

        self.type = self.type%15;
        if(self.type<2) return type_caractere;
        if(self.type<5) return type_arme;
        return type_caractere;

    }


    function generate_PV(){
        self.PV=0;
        maxPV=0;
        for (var i=0; i<self.stringNumber.length; i++){
            if(i%2==1){
                self.PV+= (parseInt(self.stringNumber[i])+1)*167;
                maxPV+=10*167;
            }
        }
    }

    function generate_FO(){

        self.FO=0;
        maxFO=0;
        for (var i=0; i<self.stringNumber.length; i++){
            if(i%3==0){
                self.FO+= (parseInt(self.stringNumber[i])+1)*85;
                maxFO+=10*85;
            }
        }
    }

    function generate_ARMOR(){

        self.ARMOR=0;
        maxARMOR=0;
        for (var i=0; i<self.stringNumber.length; i++){
            if(i%3==1){
                self.ARMOR+= (parseInt(self.stringNumber[i])+1)*43;
                maxARMOR+= 10*43;
            }
        }
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

    this.save = function(){
        ajax('setCodeBar.php','result='+this.codebar.text+'&format='+this.codebar.format+'&id_gsm=123','cb_set_code_bar');
    };

    this.displayCodeBar = function(div){
        document.getElementById(div).innerHTML =this.stringNumber+'<div id="name">'+this.name+'</div><div id="PV">VIE: '+this.PV+'/'+maxPV+'</div><div id="FO">FORCE: '+this.FO+'/'+maxFO+'</div><div id="ARMOR">ARMURE: '+this.ARMOR+'/'+maxARMOR+'</div><div>type : '+type[this.type]+'</div>';
    };

}