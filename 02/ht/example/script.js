/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA 
 * @param {*} objB 
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual(objA, objB) {
    var recursion = 0;
    if (isNaN(objA) === isNaN(objB)) {
        return true;
    }

    if (objA == null || typeof(objA) != "object" ||
        objB == null || typeof(objB) != "object") {
        return false;
    }

    var propertiesInA = 0,
        propertiesInB = 0;
    for (var property in objA) {
        if (objA[property] === objA) {
          recursion++;
          objA[property] = "circular";
        }
        propertiesInA += 1;
    }
    for (var property in objB) {
        if (objB[property] === objB) {
          recursion++;
          objB[property] = "circular";
        }
        propertiesInB += 1;
        if (!(property in objA) || !isDeepEqual(objA[property], objB[property])) {
            return false;
        }
    }
    return (propertiesInA == propertiesInB) && (recursion % 2 == 0);

   function isNaN(item){
     if (Number.isNaN(item)) {return "ok"};
      return item;
   }
 return undefined;
}

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind(func, context) {


  if (typeof(func) === "function") {
    return function(){
      func.apply(context, arguments);
    }
  }
  return undefined;
}

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind = function(context){
  var self = this;
  return function(){
      self.apply(context, arguments);
    }
}
/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/
var o = {};

o = new Proxy(o, {
 set(target, prop, value) {
   if (prop == "magicProperty"){ 
   var date = new Date();
    console.log(value + " время: " + date.getHours() + " : "
                + date.getMinutes() + " : " + date.getSeconds() );
   }
    target.prop = value;
    return true;
  }
});

/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function Asker(){
  var age,name;
  var self = this;
  function askName(){
    name = prompt("what's your name?", "");
    return self;
  }
  function askAge(){
    age = prompt("what's your age?", "");
    return self;
  }
  function showAgeInConsole(){
    console.log(age);
    return self;
  }
  function showNameInAlert(){
    alert(name);
    return self;
  }
  
  this.askName = askName;
  this.askAge = askAge;
  this.showAgeInConsole = showAgeInConsole;
  this.showNameInAlert = showNameInAlert;
}
var u = new Asker();

// u.askName().askAge().showAgeInConsole().showNameInAlert();
/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(sign){
  var total;
  return function(x){
    return function(y){
      switch(sign) {
        case "+":
          total = x + y;
          break;
        case "-":
          total = x - y;
          break;
        case "*":
          total = x * y;
          break;
        case "/":
          total = x / y;
          break;
        default:
          alert("недопустимый символ");
       }
      return total;
    }  
  }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function Singleton() {
    if (Singleton.instance) {
    return Singleton.instance;
  }
  Singleton.instance = this;
  return;
  throw "undefined";
}

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
function ForceContructor(a, b, c){
  if( this instanceof ForceContructor){
  this.a = a;
  this.b = b;
  this.c = c;
  } else {
    return new ForceContructor(a, b, c);
    }
  return;
  throw "undefined";
}

/**
 * Написать фукнцию сумматор, которая будет работать 
 * var s = sum();
 * log(s); // 0
 * log(s(1)); // 1
 * log(s(1)(2)); //3
 * log(s(3)(4)(5)); // 12
 * Число вызовов может быть неограниченым
 */
function sum(a) {
  var total;
  if (a === undefined){
    a = 0;
  }
  total = a;
  function innerSum(b){
    if (b === undefined){
      return sum(total);
    } else {
      return sum(total + b);
    }
  }
  innerSum.toString = function(){
    return total;
  }
  return innerSum;
  throw "undefined";
}

///////

function log(x) {
  console.log(+x);
}

/**
 * Написать каррирующую функцию и покрыть ее тестами
 * Функция должна поддерживать каррирование функций с 2,3,4,5 параметрами
 * пример работы  функции
 * 
 * function target1(a,b,c,d) { return a + b + c + d }
 * function target2(a,b) { return a + b }
 * curry(target1)(1)(2)(3)(4) // 10
 * curry(target2)(5)(8) // 13
 * 
 * Примеры тестов смотреть в файле тестов
 * 
 * Читать
 * http://prgssr.ru/development/vvedenie-v-karrirovanie-v-javascript.html
 * @param {*} func 
 */
function curry(curried){
  var total = [];
  function innerCurry(arg){
    total.push(arg);
    return innerCurry;
  }
    innerCurry.toString = function(){
    return curried.apply(this, total);
  }
  return innerCurry;
}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/

function PreUser(){}
PreUser.prototype = Array.prototype;
function User(){}
User.prototype = PreUser.prototype;

var u = new User();

// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true

/*
Создать веб страницу. Добавить на нее форму с полями 
- имя (строкое поле), 
- родной город (Выпадающий список), 
- Комментарий (многострочное поле), пол (radiobutton). 
При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой, 
после чего поля очистить.
*/

/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
var calendarButton = document.getElementById("calendar-button");
var calendarIsShown = false;

calendarButton.addEventListener("click", function(){
  if (calendarIsShown) return;
  drawInteractiveCalendar(document.body);
});

function drawInteractiveCalendar(el) {
  calendarIsShown = true;
  var calendarContainer = document.createElement("div");
  calendarContainer.style.border = "1px solid grey";
  calendarContainer.style.width = "300px";
  calendarContainer.style.position = "fixed";
  calendarContainer.style.top = "100px";
  calendarContainer.style.right = "100px";
  calendarContainer.id = "calendar";

  var year = +prompt("введите год", "2018");
  var month = +prompt("введите месяц в формате числа от 1 до 12", "7");

  publishCalendar(year, month, calendarContainer);

  function clearCalendar() {
    el.removeChild(calendarContainer);
  }

  function publishCalendar(year, month, calendarContainer){
    var calendarString = drawCalendar(year, month, calendarContainer);

    el.appendChild(calendarContainer);

    var calendarMonthText = document.getElementById("calendarMonth");
    calendarMonthText.innerHTML = month;

    var calendarYearText = document.getElementById("calendarYear");
    calendarYearText.innerHTML = year;

    var buttonPrev = document.getElementById("prev");
    buttonPrev.addEventListener("click", function(){
    clearCalendar();
      if (month == 1) {
        month = 12;
        year--;
      } else {
        month--;
      }
    publishCalendar(year, month, calendarContainer);
    });

    var buttonNext = document.getElementById("next");
    buttonNext.addEventListener("click", function(){
    clearCalendar();
      if (month == 12) {
        month = 1;
        year++;
      } else {
        month++;
      }
    publishCalendar(year, month, calendarContainer);
    });

    var buttonClose = document.getElementById("close");
    buttonClose.addEventListener("click", function(){
      clearCalendar();
      calendarIsShown = false;
    });

    var cellRemember = document.getElementById("calendar");
    cellRemember.addEventListener("click", function(event){
      if (!event.target.classList.contains("cell")) return;

      document.getElementById("output").innerHTML = "";

      var dateToRemember = event.target.textContent.match(/\d\d/) + "-" + month + "-" + year;
      var rememberedDate = localStorage.getItem(dateToRemember);
      if (rememberedDate) {
        document.getElementById("output").innerHTML = dateToRemember + "<br>" + localStorage.getItem(dateToRemember);
        // return; //позволяет корректировать уже введенную дату
      }

      var message = prompt("ваш комментарий", "");
      if (!message) return;
      document.getElementById("output").innerHTML = dateToRemember + "<br>" + message;
      localStorage.setItem(dateToRemember, message);
    });
  }
}

function drawCalendar(year, month, htmlEl) {

        var targetDate = new Date(year, month-1);
        var dayOfWeek = targetDate.getDay(); //day of week

    var totalDays = new Date(year, month, 0).getDate(); //total

        var totalString = "";

        for (var i = 1; i <= totalDays; i++) {
            var j = "";
            var countDate = new Date(year, month-1, i);
            if (i < 10){
                j = "<span class='cell' style = 'cursor: pointer'>__0" + i + "</span>";
            } else {
                j += "<span class='cell' style = 'cursor: pointer'>__" + i + "</span>";
            }
            if ( !countDate.getDay() ) {
                j += "<br>";
            }
            totalString += j + " ";
        }

        if (!dayOfWeek) dayOfWeek = 7;
        for (i = 2; i <= dayOfWeek; i++) {
            var additionToString = "____ ";
            totalString = additionToString + totalString;
        }

        totalString = "<span id='prev' style='cursor:pointer'>[<]</span><span id='calendarMonth'></span>/<span id='calendarYear'></span><span id='next' style='cursor:pointer'>[>]</span><span id='close' style='cursor:pointer; float:right'>X</span><br>"
                      + "<pre>  Пн   Вт   Ср   Чт  Пт   Сб   Вс</pre><br>" 
                      + totalString
                      +"<div id='output' style='height:40px; color:green; border-top:1px solid grey'></div>";

        htmlEl.innerHTML = '';
        htmlEl.innerHTML = totalString;

        return totalString;
}




// функция throttle

function throttle(fun, delay){  
  var timer, counter = 0;
    return function(arg){
      counter++;
      if (!timer) {
        timer = +new Date();
        return fun(arg);
      }
      var startTime = +new Date();
      var counterLast = counter;
      setTimeout(function(){
        if (((startTime - timer) < delay) && (counterLast != counter)) return;
        timer = +new Date();
        return fun(arg);
    }, delay);
  }
}

// function throttle(func, ms) {

//   var isThrottled = false,
//     savedArgs,
//     savedThis;

//   function wrapper() {

//     if (isThrottled) { // (2)
//       savedArgs = arguments;
//       savedThis = this;
//       return;
//     }

//     func.apply(this, arguments); // (1)

//     isThrottled = true;

//     setTimeout(function() {
//       isThrottled = false; // (3)
//       if (savedArgs) {
//         wrapper.apply(savedThis, savedArgs);
//         savedArgs = savedThis = null;
//       }
//     }, ms);
//   }

//   return wrapper;
// }

function debounce(fun, delay){  
  var timer;
    return function(arg){
      if (!timer) {
        timer = +new Date();
        return fun(arg);
      }
      var startTime = +new Date();
      setTimeout(function(){
        if ((startTime - timer) < delay) return;
        timer = +new Date();
        return fun(arg);
    }, delay);
  }
}


function sleep(delay) {
    var start = Date.now();
    while (Date.now() - start < delay * 1000) { };
  return;
}