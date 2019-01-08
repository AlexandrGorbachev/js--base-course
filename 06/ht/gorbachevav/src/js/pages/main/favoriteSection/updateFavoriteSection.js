
export default function updateFavoriteSection(targetField, itemToInsert, itemToRemove) {

    targetField = targetField.querySelector("ul");
    targetField.innerHTML = "";

    let favoriteList;
    if (localStorage.getItem("favoriteList")) {
        favoriteList = JSON.parse(localStorage.getItem("favoriteList"));
    } else {
        favoriteList = [];
    }

    if (itemToInsert && !favoriteList.includes(itemToInsert)) favoriteList.unshift(itemToInsert);

    if (itemToRemove) {
        favoriteList.forEach( (item, i) => {
            if (item == itemToRemove) favoriteList.splice(i, 1);
        })
    }

    if (favoriteList.length > 5) favoriteList.length = 5;

    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));

    let tempElem = document.createElement("UL");

    favoriteList.forEach(item => {
        let listItem = document.createElement("LI");

        // listItem.innerHTML = item;
        listItem.insertAdjacentHTML("afterBegin", `<span>${item}</span><i class="fa fa-times"></i>`);

        tempElem.appendChild(listItem);
    })

    targetField.innerHTML = tempElem.innerHTML;

}
