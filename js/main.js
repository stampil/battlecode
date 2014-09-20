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
    }
}

function scan(){
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var ret = "We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled;
            document.getElementById('ret').textContent=ret;
            if(result.text) {
                var BBF = new BattleBarFighter(result.text);
                BBF.save();
                BBF.displayCodeBar('ret');
            }

        },
        function (error) {
            var ret = "Scanning failed: " + error;
            document.getElementById('ret').textContent=ret;
        }
    );
}

function cb_set_code_bar(data) {
    document.getElementById("ret2").textContent=JSON.stringify(data);
}

function ajax(page,param, callback){
    document.getElementById("ret2").textContent='loading...';
    var head = document.getElementsByTagName('head').item(0);
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'http://vps36292.ovh.net/mordu/BATTLECODE/'+page+'?'+param+'&callback='+callback);
    head.appendChild(script);
}