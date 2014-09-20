function scan(){
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var ret = "We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled;
            document.getElementById('ret').innerText=ret;
            if(result.text) ajax('setCodeBar.php','result='+result.text+'&format='+result.format+'&id_gsm=123','cb_setcodebar');
        },
        function (error) {
            var ret = "Scanning failed: " + error;
            document.getElementById('ret').innerText=ret;
        }
    );
}

function cb_setcodebar(data) {
    document.getElementById("ret2").innerHTML=JSON.stringify(data);
}

function ajax(page,param, callback){
    document.getElementById("ret2").innerHTML='loading...';
    var head = document.getElementsByTagName('head').item(0);
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'http://vps36292.ovh.net/mordu/BATTLECODE/'+page+'?'+param+'&callback='+callback);
    head.appendChild(script);
}