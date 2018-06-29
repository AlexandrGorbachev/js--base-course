/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Функция вывода строк для работы в fizzBuzz
 * @param {*} a 
 */
function log(a) {
    console.log(a);
}

/* Раместите ваш код ниже */

/**
 * реализовать фукнцию `fizzBuzz` 
 * которая выводит числа от 1 до 100. 
 * Если число кратно 3 - вместо числа вывести `Fizz`. 
 * Если кратно 5 - вывести вместо числа `Buzz`. 
 * Если число кратно и 3 и 5 - вывести вместо числа `FizzBuzz`. 
 * Для вывода использовать фукнцию `log` (аналогично заданию в классе). 
 * В теле функции нельзя использовать  `if`, `switch`, тернарный оператор `? :`
 */
function fizzBuzz() {
 /* Ваше решение */
}


/**
 * реализовать фукнцию  `isPolindrom`, 
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString 
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {
 /* Ваше решение */
 return undefined;
}


/**
 * Реализовать фукнцию `drawCalendar` , 
 * которая принимает три аргумента - год, месяц, htmlElement 
 * и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).  
 * @param {number} year 
 * @param {number} month - номер месяца, начиная с 1
 * @param {external:HTMLElement} htmlEl 
 */
function drawCalendar(year, month, htmlEl) {

        var targetDate = new Date(year, month-1);
        var dayOfWeek = targetDate.getDay(); //day

    var totalDays = new Date(year, month, 0).getDate(); //total

        var totalString = "";

        for (var i = 1; i <= totalDays; i++) {
            var j = "";
            var countDate = new Date(year, month, i);
            if (i < 10){
                j = "__0" + i + " ";
            } else {
                j += "__" + i + " ";
            }
            if ( !countDate.getDay() ) {
                j += "<br>";
            }
            totalString += i + " ";
        }

        if (!dayOfWeek) dayOfWeek = 7;
        for (i = 2; i <= dayOfWeek; i++) {
            var additionToString = "____ ";
            totalString = additionToString + totalString;
        }

        totalString = "<pre>Пн  Вт  Ср  Чт  Пт  Сб  Вс</pre><br>" + totalString;
        htmlEl.innerHTML = '';
        htmlEl.innerHTML = totalString;
}


/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA 
 * @param {*} objB 
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }

    if (objA == null || typeof(objA) != "object" ||
        objB == null || typeof(objB) != "object") {
        return false;
    }

    var propertiesInA = 0,
        propertiesInB = 0;
    for (var property in objA) {
        propertiesInA += 1;
    }
    for (var property in objB) {
        propertiesInB += 1;
        if (!(property in objA) || !isDeepEqual(objA[property], objB[property])) {
            return false;
        }
    }
    return propertiesInA == propertiesInB;

 return undefined;
}
/**
 * Написать функцию `spiral`
 * которая возвращает спираль из массива
 */
function spiral(arr) {

    var result = [];
    var direction = 0;
    var i = 0;
    var j = 0;

    if (!Array.isArray(arr) || !arr.length) {
        return undefined;
    } else if (!arr[0].length){
        return arr;
    } else {
        while(  result.length < arr[0].length * arr.length ) {
            while (arr[j][i] !== 0) {
                switch (direction%4) {
                    case 0:
                        result.push(arr[j][i]);
                        arr[j][i] = 0;
                        if(i+1<arr[0].length && arr[j][i+1]!=0) {i++}
                        else {direction++;
                            j++;
                        }
                        break;
                    case 1:
                        result.push(arr[j][i]);
                        arr[j][i] = 0;
                        if(j+1<arr.length && arr[j+1][i]!=0) {j++}
                        else {direction++;
                            i--;
                        }
                        break;
                    case 2:
                        result.push(arr[j][i]);
                        arr[j][i] = 0;
                        if(i-1>=0 && arr[j][i-1]!=0) {i--}
                        else {direction++;
                            j--;
                        }
                        break;
                    case 3:
                        result.push(arr[j][i]);
                        arr[j][i] = 0;
                        if(j-1>=0 && arr[j-1][i]!=0) {j--}
                        else {direction++;
                            i++;
                        }
                        break;
                }
            }
        }
        return result;
    }
}
/**
 * Написать функцию `quadraticEquation
 * которая возвращает корни квадратного уровнения
 */
function quadraticEquation(a, b, c) {
    var discriminant = b*b - 4*a*c,
        x1, x2,
        result = [];

    if ( discriminant < 0 ) {
        return result;
    } else {
        discriminant = Math.sqrt(discriminant);
    }
    x1 = (-b + discriminant) / 2*a;
    x2 = (-b - discriminant) / 2*a;
    result.push(x1, x2);
    if (x1 == x2) result.length = 1;
    return result;
}
