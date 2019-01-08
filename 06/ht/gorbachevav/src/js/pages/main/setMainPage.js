import darkSkyRequest from "./../../requests/darkSkyRequest";
import searchSectionHandlers from "./searchSection/searchSectionHandlers";
import updateFavoriteSection from "./favoriteSection/updateFavoriteSection";

export function setMainPage(fieldRulers, directCityLink) {

    fieldRulers.requestField.style.display = "block";
    fieldRulers.searchField.style.display = "block";
    fieldRulers.controlFieldWrap.style.justifyContent = "space-between";
    fieldRulers.mapField.style.display = "block";
    fieldRulers.infoField.style.display = "block";
    fieldRulers.authorField.style.display = "none";
    fieldRulers.aboutField.style.display = "none";

    fieldRulers.mapField.addEventListener("map_center_changed", (event) => {
        getAndSetWeatherInfo(fieldRulers.requestMethod, event.detail);
    })

    if (!directCityLink) getAndSetWeatherInfo(fieldRulers.requestMethod);

    //imported handlers for search field
    if (directCityLink != "stay-the-same"){
        searchSectionHandlers(document.getElementById("search-section"), fieldRulers.requestMethod, directCityLink);
    }

    //listeners for favorite section
    document.getElementById("info-section_history").addEventListener("click", event => {
        if (event.target.tagName == "I") {
            updateFavoriteSection(document.getElementById("info-section_favorite_items"), event.target.parentNode.firstChild.textContent);
        } else if (event.target.tagName == "SPAN"){
            window.location.hash = `city-${event.target.textContent.match( /\w{2,}/i )}`;
        }
    });
    document.getElementById("info-section_favorites").addEventListener("click", event => {
        if (event.target.tagName == "I") {
            updateFavoriteSection(document.getElementById("info-section_favorite_items"), null, event.target.parentNode.firstChild.textContent);
        } else if (event.target.tagName == "SPAN"){
            window.location.hash = `city-${event.target.textContent.match( /\w{2,}/i )}`;
        }       
    });
}

export function getAndSetWeatherInfo(requestMethod, coords){

    let currentWeatherField = document.getElementById("info-section_current");
    let tomorrowWeatherField = document.getElementById("info-section_tomorrow");

    Promise.resolve()
        .then(() => {
            return darkSkyRequest(requestMethod, coords);
        })
        .then(forecast => {  
                             
            setWeatherInfo(forecast, "currently", currentWeatherField);
            setWeatherInfo(forecast, "daily", tomorrowWeatherField);
        })
        .catch(error => console.log(error.message))

    function setWeatherInfo(data, type, target){

        let weatherFragment = target.querySelector(".weather-description");
        weatherFragment.innerHTML = "";

        if (!data) {
            weatherFragment.innerHTML += "Request failed";
            return;
        }

        if (type == "daily") {
            data = data[type].data[0];
        } else {
            data = data[type];
        }

        let parameters = Object.create(null);
        parameters = {"icon": `It is ${data["icon"]}.`, 
                    "temperature": ` Temperature is ${Math.round(data["temperature"])} deg.`,
                    "humidity": ` Humidity is ${Math.round(data["humidity"]*10000)/100}%.`, 
                    "windSpeed": ` Windspeed is ${data["windSpeed"]} m per second. `,
                    "pressure": ` Pressure is ${Math.round(data["pressure"])} mm.`};

        if (type == "daily") {
            parameters["temperature"] = ` Average temperature is ${Math.round(data.temperatureMin + data.temperatureMax)/2} deg. `;
        }

        for (let prop in parameters){
            weatherFragment.innerHTML += parameters[prop];
        }
    } 
}