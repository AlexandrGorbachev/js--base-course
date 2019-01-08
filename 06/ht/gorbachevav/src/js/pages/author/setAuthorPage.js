
export default function setAuthorPage(fieldRulers) {
    
    fieldRulers.requestField.style.display = "none";
    fieldRulers.searchField.style.display = "none";
    fieldRulers.controlFieldWrap.style.justifyContent = "center";
    fieldRulers.mapField.style.display = "none";
    fieldRulers.infoField.style.display = "none";
    fieldRulers.authorField.style.display = "block";
    fieldRulers.aboutField.style.display = "none";

    document.getElementById("wrapper").style.justifyContent = "start";  

    infoWindow.close(); 

}