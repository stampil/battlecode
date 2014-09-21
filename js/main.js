if(typeof cordova =='undefined'){
    var cordova = {
        plugins:{
            barcodeScanner:{
                scan:null
            }
        }
    }

    cordova.plugins.barcodeScanner.scan = function(){
        document.getElementById('ret').textContent='Scan non disponible';
        var BBF = new BattleBarFighter({text:Math.round((Math.random()*1000000000000)+1000000000000).toString(),format:1});
        BBF.displayCodeBar('ret');
    }
}

function scan(){
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            /*
             result.text result.format  result.cancelled
             */


            if(result.text) {
                var BBF = new BattleBarFighter(result);
                BBF.save();
                BBF.displayCodeBar('ret');
            }
            else{
                document.getElementById('ret').textContent='Scanning cancelled';
            }

        },
        function (error) {
            var ret = "Scanning failed: " + error;
            document.getElementById('ret').textContent=ret;
        }
    );
}



function ajax(page,param, callback){
    document.getElementById("ret2").textContent='loading...';
    var head = document.getElementsByTagName('head').item(0);
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'http://vps36292.ovh.net/mordu/BATTLECODE/'+page+'?'+param+'&callback='+callback);
    head.appendChild(script);
}