
export default function updateHistorySection(targetField, itemToInsert) {

    targetField = targetField.querySelector("ul");
    targetField.innerHTML = "";

    let historyList;
    if (localStorage.getItem("historyList")) {
        historyList = JSON.parse(localStorage.getItem("historyList"));
    } else {
        historyList = [];
    }

    if (itemToInsert && !historyList.includes(itemToInsert)) historyList.unshift(itemToInsert);
    if (historyList.length > 5) historyList.length = 5;

    localStorage.setItem("historyList", JSON.stringify(historyList));

    let tempElem = document.createElement("UL");

    historyList.forEach(item => {
        let listItem = document.createElement("LI");

        // listItem.innerHTML = item;
        if (item.length >= 35) item = item.slice(0,35) + "...";
        listItem.insertAdjacentHTML("afterBegin", `<span>${item}</span><i class="fa fa-thumbs-o-up"></i>`);

        tempElem.appendChild(listItem);
    })

    targetField.innerHTML = tempElem.innerHTML;

}
