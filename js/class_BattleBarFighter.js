function BattleBarFighter(codebar) {
    this.codebar=codebar;
    this.PV;
    this.FO;
    this.name;
    var self = this;
    var tabName = ['an','to','ni','pa','ta','sa','me','ki','lu','bo'];

        generate_PV();
        generate_FO();


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
                self.FO+= parseInt(string[i])*22;
            }
        }
    }

    function generate_name(){
        var string = self.codebar.text.toString();
        self.name='';
        for (var i=0; i<string.length; i++){
            if(i%3==0){
                self.name+= tabName[parseInt(string[i])%10];
            }
        }
    }

    this.save = function(){
        ajax('setCodeBar.php','result='+this.codebar.text+'&format='+this.codebar.format+'&id_gsm=123','cb_set_code_bar');
    };

    this.displayCodeBar = function(div){
        document.getElementById(div).innerHTML =this.codebar.text+'<div id="name">'+this.name+'</div><div id="PV">PV: '+this.PV+'</div><div id="FO">FO: '+this.FO+'</div>';
    };

}