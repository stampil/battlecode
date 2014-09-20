function BattleBarFighter(codebar) {
    this.codebar;
    var privateVariable = 777;

    function __Construct(param){
        console.log('construct');
        this.codebar=param;
    }

    this.save = function(){
        ajax('setCodeBar.php','result='+result.text+'&format='+result.format+'&id_gsm=123','cb_set_code_bar');
    }

    this.displayCodeBar = function(div){
        document.getElementById(div).textContent =codebar;
    }

    __Construct(codebar);
}