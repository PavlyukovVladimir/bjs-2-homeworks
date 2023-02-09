"use strict"
function solveEquation(a, b, c) {
  if(a === 0){
    if( b===0 ){
      if(c === 0){
        return ['x - любое число'];
      }else{
        return [];
      }
    }else{
      return [-c / b];
    }
  }

  const d = b ** 2 - 4 * a * c;

  if(d === 0){
    return [-b / (2 * a)];
  }

  if(d < 0){
    return [];
  }

  let x1 = (Math.sqrt(d) - b) / (2 * a);
  let x2 = (- b - Math.sqrt(d)) / (2 * a);
  
  // if(x1 < x2){
  //   return [x1, x2];
  // }
  
  // return [x2, x1]; // принято решения уравнений выдавать в порядке возрастания.

  return [x1, x2];
}

// percent - процентная ставка
// contribution - сумма первоначального взноса
// amount - сумма кредита
// countMonths - срок (длительность кредита в месяцах)
function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  // Платёж = S * (P + (P / (((1 + P)^n) - 1)))
  // S — тело кредита
  // P — 1/12 процентной ставки (от 0 до 1)
  // n — количество месяцев
  let tpercent = percent;
  percent = +percent;
  let tcontribution = contribution;
  contribution = +contribution;
  let tamount = amount;
  amount = +amount;
  let tcountMonths = countMonths;
  countMonths = +countMonths;
  if(isNaN(percent)){
    return `Параметр percent содержит неправильное значение ${tpercent}`
  }

  if(percent < 0 || percent >100){
    return `Параметр percent содержит неправильное значение ${tpercent}`
  }

  if(isNaN(contribution)){
    return `Параметр contribution содержит неправильное значение ${tcontribution}`
  }
  if(contribution < 0){
    return `Параметр contribution содержит неправильное значение ${tcontribution}`
  }
  if(isNaN(amount)){
    return `Параметр amount содержит неправильное значение ${tamount}`
  }
  if(amount < 0){
    return `Параметр amount содержит неправильное значение ${tamount}`
  }
  if(isNaN(countMonths)){
    return `Параметр countMonths содержит неправильное значение ${tcountMonths}`
  }
  if(countMonths < 0){
    return `Параметр countMonths содержит неправильное значение ${tcountMonths}`
  }
  if(!Number.isInteger(countMonths)){
    return `Параметр countMonths содержит неправильное значение ${tcountMonths}`
  }
  if(contribution > amount){
    return 'Аргумент "contribution" не должен быть больше чем "amount".'
  }
  let S = amount - contribution;
  let P = percent / 1200;
  // выдавать сумму, которую в итоге заплатит клиент
  // (первоначальный взнос, погашение основного долга, проценты за пользование кредитом).
  // Первоначальный взнос платят когда берут кредит и поптом по числу месяцев платят сумму из формулы
  let total = contribution + S * (P + (P / (((1 + P) ** countMonths) - 1))) * countMonths;
  // округлим и вернем результат
  return Math.round(100 * total) / 100;
}