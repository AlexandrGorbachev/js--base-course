function Calendar(options){
    var startOptions = options;
   
    document.head.insertAdjacentHTML("beforeEnd", '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">');

                //шаблон CSS
    var tmplCSS = '<style>\
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
        td span{\
            display:block;\
            font-size:14px;\
        }\
        td i{\
            font-size:10px;\
        }\
        tr{\
          valign: middle;\
        }\
        tbody>tr:first-child{\
          height: 60px;\
        }\
        th{\
           border: 2px solid rgb(130,130,130);\
        }\
        td{\
          border: 2px solid rgb(192,192,192);\
          width: 13%;\
        }\
        tr>td:last-child,\
        tr>td:nth-child(6){\
          color: #069;\
        }\
        </style>';
        document.head.insertAdjacentHTML("beforeEnd", tmplCSS);

    var tmplMainCreate = '<header>\
            <a href="#calendar">Calendar</a>\
            <span class="header_devider">|</span>\
            <a href="#create">Create</a>\
        </header>\
        <div id="myCalendar"></div>\
        <div id="calendar_configure_shaded" style="display:none">\
            <div id="calendar_inputs">\
                <fieldset>\
                    <legend>Configure Calendar</legend>\
                    <label><input type="checkbox" name="allowChangeMonth" checked>Allow change month</label>\
                    <label><input type="checkbox" name="allowAddTasks" checked>Allow add tasks</label>\
                    <label><input type="checkbox" name="allowRemoveTasks" checked>Allow remove tasks</label>\
                    <label><input type="checkbox" name="showMonth" checked>Show month / year</label>\
                    <select id="months_selector"></select>\
                    <select id="years_selector"></select>\
                </fieldset>\
            </div>\
            <div id="calendar_configure_code_section"></div>\
            <div id="calendar_configure_calendar_section"></div>\
        </div>';

    document.body.insertAdjacentHTML("afterBegin", tmplMainCreate);

    makeCalendar(startOptions);
}


function makeCalendar(options){
    document.title = "Calendar";

    var isShowMonth = options.showMonth,
        isAllowAdd = options.allowAdd,
        isAllowRemove = options.allowRemove,
        isAllowChangeMonth = options.allowChangeMonth,
        target = options.el.slice(1),
        date = options.date;

    var currentDate,
        monthCollection = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],   
        mainPage = document.getElementById(target),
        calendarField;


    if (options.date === null) {
        currentDate = new Date();
    } else {
        currentDate = new Date(options.date);
    } 

    window.addEventListener("hashchange", function(){
        if (window.location.hash == "#create"){
            clearPage();
            showCreatePage();
        } else {
            repaintOnlyCalendar();
        }
    });

    window.location.hash = "#calendar";
    repaintOnlyCalendar();

    function repaintOnlyCalendar(){
        clearPage();
        showCalendar(document.getElementById("myCalendar")); 
        document.getElementById("myCalendar").style = "padding: 0 150px";  
    }

    function clearPage(){
        mainPage.innerHTML = "";
    }

    function showCreatePage(){

        var createPage = document.getElementById("calendar_configure_shaded").cloneNode(true);
        createPage.id = "calendar_configure";
        createPage.style.display = "block";
        mainPage.appendChild(createPage);

        var codeField = document.getElementById("calendar_configure_code_section");
        
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

//скрытие выбора месяцев
          
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
        yearSelector.addEventListener("change", function(){
            currentDate.setFullYear(yearSelector.value);
            repaintCalendarPage();
        });
        monthSelector.addEventListener("change", function(){
            currentDate.setMonth(monthSelector.selectedIndex);
            repaintCalendarPage();
        });

        function setChangeMonth(){
            monthSelector.disabled = !isAllowChangeMonth;
            yearSelector.disabled = !isAllowChangeMonth;
        }
        setChangeMonth();

        function repaintCalendarPage(){
            setChangeMonth();
            codeField.innerHTML = "";
            calendarField.innerHTML = "";
            fillCodeSection();
            showCalendar(calendarField);
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
            insertCodeLine("date: null // date = [2018, 09]");
            insertCodeLine("})");
            insertCodeLine("})();");
            insertCodeLine("</script>");
        } 
        fillCodeSection(); 
 
        showCalendar(calendarField);   
    }

    function showCalendar(calendarField){

        var tmplTableHead = '<table id="calendarTable" cols="7">\
            <tr>\
                <th colspan="7">\
                    <i class="fa fa-chevron-left" id="prevMonth" style="float:left; margin:0 15px; cursor: pointer"></i>\
                    <span id="dateString"></span>\
                    <i class="fa fa-chevron-right" id="nextMonth" style="float:right; margin:0 15px; cursor: pointer"></i>\
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
        </table>';
               
        currentDate.setDate(1);

        var dateFormatter = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long"
        });

        calendarField.insertAdjacentHTML("afterBegin", tmplTableHead);

        var table = document.getElementById("calendarTable"),
            dateString = document.getElementById("dateString");
  //поведения для переключателей              
                //отображаем месяц или скрываем
        if (!isShowMonth) {
            dateString.style = "display:none";
        } 

        var prevMonth = document.getElementById("prevMonth"),
            nextMonth = document.getElementById("nextMonth");
        if (!isAllowChangeMonth) {
            prevMonth.style = "display:none";
            nextMonth.style = "display:none";
        }
            //вотчеры на стрелки
        prevMonth.addEventListener("click", function(){
            if(currentDate.getMonth()){
                currentDate.setMonth(currentDate.getMonth() - 1);
            } else {
                currentDate.setMonth(11);
                currentDate.setFullYear(currentDate.getFullYear() - 1);
            }
            if (window.location.hash == "#create") {
                clearPage();
                showCreatePage();             
            } else {
                repaintOnlyCalendar();
            }
                
            });
        nextMonth.addEventListener("click", function(){
            if(currentDate.getMonth() != 11){
                currentDate.setMonth(currentDate.getMonth() + 1);
            } else {
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                currentDate.setMonth(0);             
            }
            if (window.location.hash == "#create") {
                clearPage();
                showCreatePage();               
            } else {
                repaintOnlyCalendar();
            }
        });

        dateString.textContent = dateFormatter.format(currentDate);

        var totalMonthDays = new Date(currentDate);
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
                if (daysCounter <= totalMonthDays && (firstDayDigit % 7 == i || (firstDayDigit % 7 == 0 && i == 7))){
                    firstDayDigit++;
                    cell.textContent = "" + daysCounter++;
                }
                if(window.location.hash == "#calendar"){
                    row.style = "height:80px";
                } else {
                    row.style = "height:40px";
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        putInfoFromStorage(table);

        table.addEventListener("dblclick", function(e){
            var target = e.target;
            while (target != table) {
                if (target.tagName == 'TD' && isAllowAdd && target.innerHTML) {                  
                    var task = prompt("Want to add a task?", "");
                    if (!task) return;
                    createTaskElement(task, target);
                
                    localStorage.setItem(target.firstChild.textContent + "-" + (currentDate.getMonth() + 1) + "-" 
                        + currentDate.getFullYear() + "-" + Math.random(), task);
                    return;
                }
                target = target.parentNode;
            }
        })
    }
    function createTaskElement(task, cell){
        var taskElement = document.createElement("span");
            taskElement.innerHTML = task + "<i class='fa fa-times' style='cursor:pointer; margin-left:5px'></i>";

        var closeElement = taskElement.querySelector("i");
        closeElement.addEventListener("click", function(e){
            if (isAllowRemove){
                for(var i = 0; i < localStorage.length; i++){
                    if (localStorage.getItem(localStorage.key(i)) == this.parentElement.firstChild.textContent){
                        localStorage.removeItem(localStorage.key(i));
                        break;
                    }
                }
                cell.removeChild(closeElement.parentElement);
                e.stopPropagation();
            }
        });
        cell.appendChild(taskElement);
    }

    function putInfoFromStorage(table){
        var tdCollection = table.querySelectorAll("td");
        for(var i = 0; i < localStorage.length; i++){
           var item = localStorage.key(i).split("-");         
           if (item.length == 4 && item[1] == (currentDate.getMonth() + 1)){
                for (var j = 0; j < tdCollection.length; j++){
                    if (tdCollection[j].firstChild && tdCollection[j].firstChild.textContent == item[0]){
                        createTaskElement(localStorage.getItem(localStorage.key(i)), tdCollection[j]);
                    }
                }
            }  
        }
    }     
}

