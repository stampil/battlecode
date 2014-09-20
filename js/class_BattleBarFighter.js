function BattleBarFighter(codebar) {
    this.codebar;
    this.PV;
    this.FO;
    var self = this;

    function __Construct(param){
        console.log('construct');
        this.codebar=param;
        generate_PV();
    }

    function generate_PV(){
        var string = this.codebar.text.toString();
        this.PV=0;
        for (var i=0; i<string.length; i++){
            if(i%2==0){
                this.PV+= parseInt(string[i])*15;
            }
        }
    }

    function generate_FO(){
        var string = this.codebar.text.toString();
        this.FO=0;
        for (var i=0; i<string.length; i++){
            if(i%3==0){
                this.PV+= parseInt(string[i])*22;
            }
        }
    }

    this.save = function(){
        ajax('setCodeBar.php','result='+self.codebar.text+'&format='+self.codebar.format+'&id_gsm=123','cb_set_code_bar');
    };

    this.displayCodeBar = function(div){
        document.getElementById(div).textContent =self.codebar.text+'<div id="PV"> PV:'+self.PV+'</div><div id="FO">'+self.FO+'</div>';
    };

    __Construct(codebar);
}