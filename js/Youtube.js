var youtube= (function(){
    var arreglo_videos=[];
    var _llenaMapa = function(){
        var busca=document.getElementById("nombrev").value;
        arreglo_videos=[];
        var prevPag= document.getElementById("prev-button");
        var sigPag= document.getElementById("next-button");
        prevPag.style.display="none";
        sigPag.style.display="none";
        document.getElementById("videos").style.display="block";
        maps.borrarMarcadores();
        _buscaVideosParaMapa(busca,"");

    }

    var _auxLlenaMapa = function(response,sigPagina){
        //console.log(response);
        //console.log(response.result.nextPageToken);
        var resultados=response.result.items;
        var videosTotales= document.getElementById("cantidadv").value;
        //console.log("previo"+response.result.prevPageToken);
        for(var i=0;i<resultados.length;i++){
            arreglo_videos.push(resultados[i]);
            if(arreglo_videos.length<videosTotales){
            if(resultados[i].recordingDetails!=undefined){
                if(resultados[i].recordingDetails.location!=undefined){
                    var latitud=resultados[i].recordingDetails.location.latitude; 
                    var longitud=resultados[i].recordingDetails.location.longitude;
                    if(latitud!=undefined&&longitud!=undefined){
                    maps.agregaMarcador(map,resultados[i].player.embedHtml,{coords:{lat:latitud,lng:longitud}});
          
                }}}}}

        if(sigPagina!=undefined&&arreglo_videos.length<videosTotales){
            var busca=document.getElementById("nombrev").value;
            //console.log(sigPagina);
            _buscaVideosParaMapa(busca,sigPagina);
        }else{
            //console.log(arreglo_videos);
            if(videosTotales<=10){
                _muestraBusquedas(0,videosTotales);
            }else{
                _muestraBusquedas(0,10);
                var prevPag= document.getElementById("prev-button");
                var sigPag= document.getElementById("next-button");
                prevPag.setAttribute("actual",10);
                sigPag.setAttribute("actual",10);
                sigPag.style.display = "block";
            }
        }
        
    }

    var _buscaVideosParaMapa = function(query,pagina){
        return gapi.client.youtube.search.list({
            "part": "id,snippet",
            "maxResults": "50",
            "order": "date",
            "type": "video",
            "q": query,
            "pageToken": pagina
          })
              .then(function(response) {
                      //console.log("Response", response);
                      var videos=response.result.items;
                      var stringVideos="";
                      for(var i=0; i< videos.length; i++){
                          stringVideos+=videos[i].id.videoId;
                          if(i+1<videos.length){
                              stringVideos+=",";
                          }
                      }
                      _buscaUnVideo(stringVideos,response.result.nextPageToken);
                    },
                    function(err) { console.error("Execute error", err); });
    };

      var _buscaUnVideo = function(videos,pagina) {
        gapi.client.youtube.videos.list({
      "part": "id,snippet,recordingDetails,player",
      "id": videos,
        })
            .then(function(response) {
                _auxLlenaMapa(response,pagina);
                  },
                  function(err) { console.error("Execute error", err); });
      };   
      var _buscaNombreVideo = function(busca) {
        return gapi.client.youtube.videos.list({
          "part": "id,snippet",
          "id": busca
        })
            
      };
    
      var  _muestraBusquedas = function(inicio,fin){
        var division=document.getElementById("videos");
        console.log(inicio+" : "+fin);
        while(division.children.length>0){
            division.removeChild(division.firstElementChild);
        }
        for(var i=inicio;i<fin;i++){
          var iframe=document.createElement("iframe");
          iframe.setAttribute("width","15%");
          iframe.setAttribute("height","45%");
          iframe.setAttribute("style","margin: 0 auto;");
          iframe.setAttribute("src","https://www.youtube.com/embed/"+arreglo_videos[i].id);
          //console.log("https://www.youtube.com/embed/"+arreglo_videos[i].id);
          division.appendChild(iframe);
          var button=document.createElement("button");
          button.setAttribute("class","boton-compartir ");
          button.setAttribute("id",arreglo_videos[i].id);
          button.addEventListener("click",function(obj_evt){
            var divcorreo=document.getElementById("envio_de_mensaje");
            var id_c=obj_evt.target.getAttribute("id");
            divcorreo.setAttribute("idvideo",id_c);
            _buscaNombreVideo(id_c);
          },false);
          var icon=document.createElement("icon");
          icon.setAttribute("class","material-icons");
          icon.textContent="share";
          icon.setAttribute("id",arreglo_videos[i].id);
          button.appendChild(icon);
          division.appendChild(button);
        }
    };
    return {
        "buscaNombreVideo" : _buscaNombreVideo,
        "buscaUnVideo" : _buscaUnVideo,
        "compartirVideo": _compartirVideo,
        "llenaMapa" : _llenaMapa,
        "muestraBusquedas" : _muestraBusquedas
    }
})();