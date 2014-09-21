function BattleBarFighter(codebar) {
    this.codebar=codebar;
    this.PV;
    this.FO;
    this.ARMOR;
    this.name;
    var self = this;
    var end = ['ith','on','ton','fer','man','us','sa','oth','ion','ius','aure','or','ob'];
    var c = ["b","c","d","f","g","h","j","k","l","m","n","p","r","s","t","v","w","x","y","z"];
    var v =["a","i","e","o","u"];

    generate_PV();
    generate_FO();
    generate_ARMOR();
    generate_name();


    function generate_PV(){
        var string = self.codebar.text.toString();
        self.PV=0;
        for (var i=0; i<string.length; i++){
            if(i%2==0){
                self.PV+= parseInt(string[i])*72;
            }
        }
    }

    function generate_FO(){
        var string = self.codebar.text.toString();
        self.FO=0;
        for (var i=0; i<string.length; i++){
            if(i%3==0){
                self.FO+= parseInt(string[i])*44;
            }
        }
    }

    function generate_ARMOR(){
        var string = self.codebar.text.toString();
        self.ARMOR=0;
        for (var i=0; i<string.length; i++){
            if(i%3==1){
                self.ARMOR+= parseInt(string[i])*22;
            }
        }
    }
    
    
    function get_letter(tab,string,inc){
        return tab[(parseInt(string[inc])+ tab.length*13)% tab.length];
    }

    function generate_name(){
        var string = self.codebar.text.toString();
        self.name='';
        var inc = string.length-1;

        if(parseInt(string[1])%3==0){
            self.name += get_letter(c,string,inc--).toUpperCase();
            self.name += get_letter(v,string,inc--);
            self.name += get_letter(c,string,inc--);
            self.name += get_letter(c,string,inc--);
            self.name += get_letter(v,string,inc--);
            self.name += get_letter(end,string,inc--);
        }
        else if(parseInt(string[1])%3==1) {
            self.name += get_letter(c,string,inc--).toUpperCase();
            self.name += get_letter(v,string,inc--);
            self.name += get_letter(c,string,inc--);
            self.name += get_letter(end,string,inc--);
        }
        else{
            self.name += get_letter(c,string,inc--).toUpperCase();
            self.name += get_letter(v,string,inc--);
            self.name += get_letter(c,string,inc--);
            self.name += get_letter(v,string,inc--);
            self.name += get_letter(c,string,inc--);
            self.name += get_letter(end,string,inc--);
        }

    }

    this.save = function(){
        ajax('setCodeBar.php','result='+this.codebar.text+'&format='+this.codebar.format+'&id_gsm=123','cb_set_code_bar');
    };

    this.displayCodeBar = function(div){
        document.getElementById(div).innerHTML =this.codebar.text+'<div id="name">'+this.name+'</div><div id="PV">PV: '+this.PV+'</div><div id="FO">FO: '+this.FO+'</div><div id="ARMOR">ARMOR: '+this.ARMOR+'</div>';
    };

}