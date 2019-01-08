export default function getCurrentCoords() {

    return new Promise( (resolve, reject) => {
		// UserInfo.getInfo( data => {
	 //        console.log(`current coordinates ${data.position.latitude} and ${data.position.longitude} in ${data.country.name}`);
	 //        resolve({lat: data.position.latitude, lng: data.position.longitude});
	 //    }, 
	 //    err => {
	 //        console.log(`Failed to get current coordinates!\n${err.message}`);
  //   	});

  		navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            };
            resolve(pos);
        });
    });
    	
}