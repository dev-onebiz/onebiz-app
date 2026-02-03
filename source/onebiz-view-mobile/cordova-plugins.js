document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
//    console.log("navigator.geolocation works well");

    alert('navigator.geolocation : ' + navigator.geolocation);
    alert('navigator.camera : ' + navigator.camera);
    alert('cordova.file : ' + cordova.file);
    
    // GPS
    navigator.geolocation.getCurrentPosition(
        function() {
            alert('Latitude: '      + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
        }, 
        function() {
            alert('gps code: '    + error.code    + '\n' +
                  'gps message: ' + error.message          );
        }
    );
    
    alert('cordova-plugin.js onDeviceReady');
}