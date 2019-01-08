export default function mainRequestPattern(url, method) {

    return Promise.resolve()
    	.then( () => {
			if (method == "XHR"){
				let xhr = new XMLHttpRequest();
				xhr.open("GET", url, false);
				xhr.send();

				let response = JSON.parse(xhr.responseText);
				return response;
				
			} else {
				let fetchInit = { method: 'GET',
				               mode: 'cors',
				               cache: 'default'};
				return fetch(url, fetchInit)
					.then(response => response.json()
					)
					.catch(error => alert("Error occured while requesting, please, choose another request method"));
			}
		})    	
}