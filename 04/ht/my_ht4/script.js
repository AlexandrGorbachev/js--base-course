document.head.insertAdjacentHTML("beforeEnd", "<script src='https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js'></script>");

function Calendar(options){
    var isShowMonth = options.showMonth,
        isAllowAdd = options.allowAdd,
        isAllowRemove = options.allowRemove,
        isAllowChangeMonth = options.allowChangeMonth,
        target = options.el.slice(1),
        date = options.date;

    window.location.hash = "#calendar";
    window.addEventListener("hashchange", function(){
        if (window.location.hash == "#create"){
            clearPage();
            showCreatePage();
        } else {
            clearPage();
        }
    });

    var currentDate = new Date(),
        monthCollection = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],   
        mainPage = document.getElementById(target); //див для вставки

    function clearPage(){
        mainPage.innerHTML = "";
    }


    function showCreatePage(){

        var createPage = document.getElementById("calendar_configure_shaded").cloneNode(true);
        createPage.id = "calendar_configure";
        createPage.style.display = "block";
        mainPage.appendChild(createPage);

        var codeField = document.getElementById("calendar_configure_code_section"),
            calendarField = document.getElementById("calendar_configure_calendar_section");
        
        //заполняем слектор месяцев
        var monthSelector = document.getElementById("months_selector");


        var monthSelectorInnerData = document.createDocumentFragment();
        monthCollection.forEach(function(item, i, arr){
            var singleMonth = document.createElement("option");
            singleMonth.textContent = item;
            if (i == currentDate.getMonth()){
                singleMonth.setAttribute("selected", "true");
            }
            monthSelectorInnerData.appendChild(singleMonth);
        });
        monthSelector.appendChild(monthSelectorInnerData);

        //заполняем селектор лет
        var yearSelector = document.getElementById("years_selector");

        var yearSelectorInnerData = document.createDocumentFragment();
        for (var i = 1990; i < 2030; i++){
            var singleYear = document.createElement("option");
            singleYear.textContent = String(i);
            if (i == currentDate.getFullYear()){
                singleYear.setAttribute("selected", "true");
            }
            yearSelectorInnerData.appendChild(singleYear);
        };   
        yearSelector.appendChild(yearSelectorInnerData);


//вотчеры за инпутами 
        var inputAddTasks = document.getElementsByName("allowAddTasks")[0],
            inputRemoveTasks = document.getElementsByName("allowRemoveTasks")[0],
            inputShowMonth = document.getElementsByName("showMonth")[0],
            inputChangeMonth = document.getElementsByName("allowChangeMonth")[0];

//стартовые значения
        inputAddTasks.checked = isAllowAdd;
        inputRemoveTasks.checked = isAllowRemove;
        inputShowMonth.checked = isShowMonth;
        inputChangeMonth.checked = isAllowChangeMonth;
          
        inputAddTasks.addEventListener("change", function(){
            isAllowAdd = this.checked;
            repaintCalendarPage();
        });
        inputRemoveTasks.addEventListener("change", function(){
            isAllowRemove = this.checked;
            repaintCalendarPage();
        });
        inputShowMonth.addEventListener("change", function(){
            isShowMonth = this.checked;
            repaintCalendarPage();
        });
        inputChangeMonth.addEventListener("change", function(){
            isAllowChangeMonth = this.checked;
            repaintCalendarPage();
        });

        function repaintCalendarPage(){
            codeField.innerHTML = "";
            calendarField.innerHTML = "";
            fillCodeSection();
            showCalendar();
        }

//заполнение поля с кодом
        function fillCodeSection(){           
            function insertCodeLine(text){
                var codeString1 = document.createElement("span");
                codeString1.textContent = text;
                codeField.appendChild(codeString1);
            }
            insertCodeLine("<script src='script.js'></script>");
            insertCodeLine("<script>");
            insertCodeLine("(function(){");
            insertCodeLine("var id = 'calendar123';");
            insertCodeLine("document.write('<div id=\"\' + id + \'\"></div>');");
            insertCodeLine("new Calendar({");
            insertCodeLine("el: \'#\' + id,");
            insertCodeLine("showMonth:" + isShowMonth + ",");
            insertCodeLine("allowAdd:" + isAllowAdd + ",");
            insertCodeLine("allowRemove:" + isAllowRemove + ",");
            insertCodeLine("allowChangeMonth:" + isAllowChangeMonth + ",");
            insertCodeLine("date: null // date = [2017, 11]");
            insertCodeLine("})");
            insertCodeLine("})();");
            insertCodeLine("</script>");
        } 
        fillCodeSection(); 

        function showCalendar(){

            var currentDate = new Date();
            currentDate.setDate(1);

            var dateFormatter = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long"
            });

            calendarField.insertAdjacentHTML("afterBegin", tmplTableHead(null));

            var table = document.getElementById("calendarTable"),
                dateString = document.getElementById("dateString");
  //поведения для переключателей              
                //отображаем месяц или скрываем
            if (!isShowMonth) {
                dateString.style = "display:none";
            } 
                //скрытие выбора месяцев
            monthSelector.disabled = !isAllowChangeMonth;
            yearSelector.disabled = !isAllowChangeMonth;

            dateString.textContent = dateFormatter.format(currentDate);

            var totalMonthDays = new Date();
            totalMonthDays.setMonth(totalMonthDays.getMonth() + 1);
            totalMonthDays.setDate(0);
            totalMonthDays = totalMonthDays.getDate();

            var datesFragment = document.createDocumentFragment();
            var isDates = true,
                firstDayDigit = currentDate.getDay();
            if (!firstDayDigit) firstDayDigit = 7;
            var daysCounter = 1;

            while (isDates) {
                var row = document.createElement("tr");
                for (var i = 1; i <= 7; i++){  
                    if ((daysCounter + 1) > totalMonthDays) isDates = false;
                    var cell = document.createElement("td");
                    if (daysCounter <= totalMonthDays && firstDayDigit % 7 == i || firstDayDigit % 7 == 0){
                        firstDayDigit++;
                        cell.textContent = "" + daysCounter++;
                    }
                    row.appendChild(cell);
                }
                table.appendChild(row);
            }
        }
        showCalendar();
    }
}


//шаблон CSS
var tmplCSS = _.template('<style>\
body{\
    font-size: 20px;\
    min-width: 900px;\
}\
.header_devider{\
    font-weight: bold;\
    margin: 15px;\
}\
header a{\
    color: #069;\
}\
header a:first-child{\
    margin-left: 30%;\
}\
#calendar_inputs{\
    margin: 15px auto;\
    width: 60%;\
}\
#calendar_configure label{\
    display: block;\
    margin: 5px;\
}\
\
#calendar_configure_code_section{\
    float: left;\
    width: 30%;\
    border: 2px groove rgb(192,192,192);\
    margin: 20px 5%;\
}\
#calendar_configure_calendar_section{\
    float: right;\
    width: 50%;\
    margin: 20px 5% 0 0;\
}\
#calendar_configure_code_section span{\
    display: block;\
}\
table{\
  margin-top: 50px;\
  width: 100%;\
  border-collapse: collapse;\
  text-align: center;\
  border: 2px;\
  bordercolor: rgb(192,192,192);\
}\
tr{\
  height: 20px;\
  valign: middle;\
}\
th{\
   border: 1px solid black;\
   height: 35px;\
}\
td{\
  border: 1px solid black;\
  height: 35px;\
  width: 13%;\
}\
tr>td:last-child,\
tr>td:nth-child(6){\
  color: #069;\
}\
</style>');

document.head.insertAdjacentHTML("beforeEnd", tmplCSS(null));

var tmplTableHead = _.template('<table id="calendarTable" cols="7">\
        <tr>\
            <th colspan="7">\
                <span id="dateString"></span>\
            </th>\
        </tr>\
        <tr>\
            <td>Mo.</td>\
            <td>Tu.</td>\
            <td>We.</td>\
            <td>Th.</td>\
            <td>Fr.</td>\
            <td>Sa.</td>\
            <td>Su.</td>\
        </tr>\
    </table>');

new Calendar({
    el: '#myCalendar',
    showMonth: true,
    allowAdd: false,
    allowRemove: true,
    allowChangeMonth: true,
    date: null // date = [2018, 9]
});