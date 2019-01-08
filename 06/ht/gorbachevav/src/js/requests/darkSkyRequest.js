import getCurrentCoords from "./getCurrentCoords";
import mainRequestPattern from "./mainRequestPattern";

export default function darkSkyRequest(method, givenCoords){
	return Promise.resolve()
		.then( () => {
			let coords;
			if (givenCoords) {
				coords = givenCoords;
				return coords;
			}
			coords = getCurrentCoords();
			return coords;
		})
		.then ( coords => {
			let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/----------------------/${coords.lat},${coords.lng}?exclude=minutely,hourly,flags&units=si`;
			return url;
		})
		.then( url => {
			return mainRequestPattern(url, method);
		})	
		.catch(error => {
			setTimeout( (() => {
				infoWindow.setContent(`Sorry, request failed`);
				infoWindow.open(map);
			}), 1000);
		})
	
}
