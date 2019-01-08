import getCurrentCoords from "./requests/getCurrentCoords";
import setMainControlField from "./pages/setMainControlField";
import * as template from "./templates/htmlTemplates";

//console output only. Used HTML5 API instead
document.head.insertAdjacentHTML("beforeEnd", '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">');

document.body.insertAdjacentHTML("afterBegin", template.mainTemplate);

document.getElementById("top-search-request-section").insertAdjacentHTML("afterBegin", template.requestAndSearchTemplate);
document.getElementById("info-section_wrapper").insertAdjacentHTML("afterBegin", template.infoSectionTemplate);
document.getElementById("about-section").insertAdjacentHTML("afterBegin", template.aboutSectionTemplate);
document.getElementById("author-section").insertAdjacentHTML("afterBegin", template.authorSectionTemplate);

setMainControlField();
