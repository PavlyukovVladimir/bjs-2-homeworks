function getArrayParams(...arr) {
  if (arr.length === 0) {
    // Если ничего нет то и минимума нет,
    // и максимума нет,
    // количество ничего это 0, а сумма ничего это "ничего", значит деление "ничего" на 0 это NaN - ошибка вычисления.
    return { min: undefined, max: undefined, avg: NaN };
  }
  let min = Infinity;
  let max = -Infinity;
  let avg = 0;
  for (let element of arr) {
    let tempElement = +element;
    if (isNaN(tempElement)) {
      // Неизвестно что есть максимум если есть не числа,
      // неизвестно что есть минимум если есть не числа,
      // для нахождения среднего надо найти сумму складывать числа с не числами нельзя
      // (перегрузка + это не складывание, либо об этом надо явно договариваться - писать в условии задачи).
      return { min: undefined, max: undefined, avg: NaN };
    }
    if (min >= tempElement) {
      min = tempElement;
    }
    if (max <= tempElement) {
      max = tempElement;
    }
    avg += tempElement;
  }
  return { min: min, max: max, avg: +((avg / arr.length).toFixed(2)) };
}

function summElementsWorker(...arr) {
  if (arr.length === 0) {
    // Неизвестно что в пустом масиве, значит неизвестно можно ли его суммировать,
    // но в задании явно указано возвращать 0.
    return 0;
  }
  let sum = 0;
  for (let element of arr) {
    let tempElement = +element;
    if (isNaN(tempElement)) {
      // Неизвестно как складывать число и не число.
      return NaN;
    }
    sum += tempElement;
  }
  return sum;
}


function differenceMaxMinWorker(...arr) {
  if (arr.length === 0) {
    // Если массив пуст то максимум и минимум не определены,
    // а разницы между ничего и ничего - нет.
    return 0;
  }
  let max = -Infinity;
  let min = Infinity;
  for (let element of arr) {
    let tempElement = +element;
    if (isNaN(tempElement)) {
      // Непонятно как находить минимум или аксимум если среди чисел есть не число,
      // а вычитать из непонятно чего - непонятно чего - нельзя.
      return NaN;
    }
    if (min >= tempElement) {
      min = tempElement;
    }
    if (max <= tempElement) {
      max = tempElement;
    }
  }
  return max - min;
}

function differenceEvenOddWorker(...arr) {
  if (arr.length === 0) {
    // Когда нет ничего то и разницы нет, а нет разницы - это 0
    return 0;
  }
  let sumEvenElement = 0;
  let sumOddElement = 0;
  for (let element of arr) {
    let tempElement = +element;
    if (isNaN(tempElement)) {
      // Не числовой элемент не может быть с четным или нечетным значением.
      continue;
    }
    if (!Number.isInteger(tempElement)) {
      // Если значение элемента не целое число то оно не может быть четным или не четным.
      continue;
    }
    if (tempElement % 2 === 1) {
      sumOddElement += tempElement;
    } else {
      sumEvenElement += tempElement;
    }
  }
  // В sumEvenElement, sumOddElement суммируются числа, а значит если их нет то их сумма 0,
  // поэтому можно возвращать разницу между ними даже если не встретился ни один четный или не четный элемент.
  return sumEvenElement - sumOddElement;
}

function averageEvenElementsWorker(...arr) {
  if (arr.length === 0) {
    // У пустого массива 0 элементов, значит при вычислении среднего будет деление на 0,
    // но в задании явно указано возвращать 0.
    return 0;
  }
  let sumEvenElement = 0;
  let count = 0;
  for (let element of arr) {
    let tempElement = +element;
    if (isNaN(tempElement)) {
      continue;
    }
    if (!Number.isInteger(tempElement)) {
      continue;
    }
    if (tempElement % 2 === 0) {
      sumEvenElement += tempElement;
      count++;
    }
  }
  if (count === 0) {
    return NaN;
  }
  return +((sumEvenElement / count).toFixed(2));
}

function makeWork(arrOfArr, func) {
  return Math.max(...arrOfArr.map(x => {
    return func(...x)
  }));
}
