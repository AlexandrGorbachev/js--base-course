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
function drawInteractiveCalendar(el) {}