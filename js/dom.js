var el = document.querySelector("#scan_button");
console.log(el);
el.onclick=function(e){
    console.log('click',e);
    scan();
};

