var maps = (function(){

    var markers=[];
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }
    function deleteMarkers() {
        clearMarkers();
      };
    function clearMarkers() {
        setMapOnAll(null);
      }

    function _agregaMarcador(map,video,datos){
        geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': datos.coords}, function(results, status) {
          if (status === 'OK' && results[0]) {
              var marker=new google.maps.Marker({
                  position: datos.coords,
                  map: map
              })
              markers.push(marker);
      
                var infowindow = new google.maps.InfoWindow({
                  content: video+'<p>Dirección: '+results[1].formatted_address
                })
      
                marker.addListener('click',function(){
                infowindow.open(map, marker);
                })
          }
        });
    }


    return {
        "agregaMarcador": _agregaMarcador,
        "borrarMarcadores": deleteMarkers
    }
})();