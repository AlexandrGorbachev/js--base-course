import mainRequestPattern from "./../../../requests/mainRequestPattern";
import {getAndSetWeatherInfo} from "./../setMainPage";
import updateHistorySection from "./../historySection/updateHistorySection";


export default function searchSectionHandlers(target, requestMethod, directCityLink) {

    let searchButton = target.querySelector(".fa-search"),
        inputField = target.querySelector("input"),
        inputForm = target.querySelector("form"),
        inputFieldContent;
        
    //handler for search button
    searchButton.addEventListener("click", (event) => handleSearch(event));

    //handler for input field
    inputForm.addEventListener("submit", (event) => handleSearch(event));

    if (directCityLink) handleSearch();

    function handleSearch(event){
        if (event) event.preventDefault();

        if (directCityLink) {
            inputFieldContent = directCityLink;
            directCityLink = "";
        } else {
            inputFieldContent = inputField.value;
        }     

        if (!checkSearchField(inputFieldContent)) return;  
        handleCityCoordsResponse(inputFieldContent);
    }

    function checkSearchField (content) {
        if (content == "city" || "" || !/^\s*?[a-zа-я]{2,}(\s*?[-\s]\s*?[a-zа-я]+?)*?\s*?$/i.test(content) ) {
            alert("Please, correct your request");
            return false;       
        } else {
            return true;
        }
    }

    function handleCityCoordsResponse (content) {
        let searchUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${content}&key=-----------------&language=en`;

        inputField.value = "";
        let searchedAddress;

        mainRequestPattern(searchUrl, requestMethod)
            .then( response => {
                let type = response.results[0].types;
                let searchedCoords = response.results[0].geometry.location;
                searchedAddress = response.results[0].formatted_address;

                if (type.length != 2 && type[0] != "locality" && type[1] != "political"){
                  throw new Error();
                } else {
                  return searchedCoords;
                }        
            })
            .then( searchedCoords => {
                
                setTimeout( () => {
                    infoWindow.setPosition(searchedCoords);
                    map.setCenter(searchedCoords);
                }, 1000);

                setTimeout( () => {
                  infoWindow.setContent(`Searched city`);
                  infoWindow.open(map);
                }, 2000);

                getAndSetWeatherInfo(requestMethod, searchedCoords);

                updateHistorySection(document.getElementById("info-section_history_items"), searchedAddress);
                window.location.hash = `city-${encodeURI(content)}`;
            })

            .catch( error => {
                alert(`Error while requesting city. \nNote:${error.message}`);
            })           
    }
};
