var buscate=(function(){
    var _run = function() {
        var buscar= document.getElementById("buscar");
        buscar.addEventListener("click", function(obj_evento){
            var busca=document.getElementById("nombrev").value;
            if(busca!=""&&busca!=undefined)
            youtube.llenaMapa();
        },false);

        var prevPag= document.getElementById("prev-button");
        var sigPag= document.getElementById("next-button");
        prevPag.addEventListener("click",function(){
            sigPag.style.display = "block";
            var actual=parseInt(prevPag.getAttribute("actual"));
            youtube.muestraBusquedas(actual-20,actual-10);
            prevPag.setAttribute("actual",actual-10);
            sigPag.setAttribute("actual",actual-10);
            if(actual-10<=10){
                prevPag.style.display = "none";
            }
        },false);
        sigPag.addEventListener("click",function(){
            prevPag.style.display = "block";
            var actual=parseInt(prevPag.getAttribute("actual"));
            var total=document.getElementById("cantidadv").value;
            if(actual+10<total){
                youtube.muestraBusquedas(actual,actual+10);
                prevPag.setAttribute("actual",actual+10);
                sigPag.setAttribute("actual",actual+10);
            }else{
                console.log("desaparece sig")
                youtube.muestraBusquedas(actual,total);
                prevPag.setAttribute("actual",actual+10);
                sigPag.style.display = "none";
            }
            },false);
        
    };
    var _run = function(){
        _run();
    };
    
    return {
        "_run": _run
    };

})();