import {setMainPage} from "./main/setMainPage";
import setAboutPage from "./about/setAboutPage";
import setAuthorPage from "./author/setAuthorPage";
import updateHistorySection from "./main/historySection/updateHistorySection";
import updateFavoriteSection from "./main/favoriteSection/updateFavoriteSection";


export default function setMainControlField() {

    let requestField = document.getElementById("request-method-field"),
        searchField = document.getElementById("search-section"),
        controlFieldWrap = document.getElementById("top-search-request-section"),
        mapField = document.getElementById("map"),
        infoField = document.getElementById("info-section"),
        aboutField = document.getElementById("about-section"),
        authorField = document.getElementById("author-section");

//request method handlers
    let requestMethod,
        requestMethodsList = requestField.querySelectorAll("input"),
        oldHashSearchResult;

    function defineRequestMethod(){
        for (let i = 0; i < requestMethodsList.length; i++){
            if (requestMethodsList[i].checked){
                requestMethod = requestMethodsList[i].parentElement.lastChild.textContent;
                break;
            }
        }
    }
 //first run defining   
    if (!requestMethod) defineRequestMethod();

//defining after any changes
    for (let i = 0; i < requestMethodsList.length; i++){
        requestMethodsList[i].addEventListener("change", () => defineRequestMethod()); 
    }

//setHistory and Favorite Fields
    updateHistorySection(document.getElementById("info-section_history_items"));
    updateFavoriteSection(document.getElementById("info-section_favorite_items"));
    
//window and document handlers

    document.addEventListener("DOMContentLoaded", routeByHash);

    window.addEventListener("hashchange", () => routeByHash());

    let fieldRulers = {
        requestField: requestField,
        searchField: searchField,
        controlFieldWrap: controlFieldWrap,
        mapField: mapField,
        infoField: infoField,
        aboutField: aboutField,
        authorField: authorField,
        requestMethod: requestMethod
    };

    function routeByHash(){

        if (window.location.hash == oldHashSearchResult){
            return;
        } else if (window.location.hash == "#about-section"){
            setAboutPage(fieldRulers);
        } else if (window.location.hash == ""){
            setMainPage(fieldRulers);
        } else if (window.location.hash == "#main-section"){
            setMainPage(fieldRulers, "stay-the-same");
        } else if (/city-/i.test(window.location.hash)){
            oldHashSearchResult = window.location.hash;
            setMainPage(fieldRulers, decodeURI(window.location.hash.slice(1).replace("city-", "")));
        } else if (window.location.hash == "#author-section") {
            setAuthorPage(fieldRulers);
        } else {
            alert("Page not found");
        }   
    }    
}