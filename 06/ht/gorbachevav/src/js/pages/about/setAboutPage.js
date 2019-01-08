
export default function setAboutPage(fieldRulers) {
    
    fieldRulers.requestField.style.display = "none";
    fieldRulers.searchField.style.display = "none";
    fieldRulers.controlFieldWrap.style.justifyContent = "center";
    fieldRulers.mapField.style.display = "none";
    fieldRulers.infoField.style.display = "none";
    fieldRulers.authorField.style.display = "none";
    fieldRulers.aboutField.style.display = "block";
    
    document.getElementById("wrapper").style.justifyContent = "start";  

    infoWindow.close();
    
}