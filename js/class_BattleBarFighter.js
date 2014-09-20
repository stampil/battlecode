function BattleBarFighter(codebar) {
    this.codebar;
    var privateVariable = 777;

    function __Construct(param){
        console.log('construct');
        this.codebar=param;
    }

    this.getCodeBar= function() {
       return codebar;
    }

    __Construct(codebar);
}