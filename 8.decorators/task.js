'use strict';
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

// Задача № 1
function cachingDecoratorNew(func) {
  const cache = [];
  const maxCount = 5;
  return function(...args) {
    const hash = md5(args);
    const index = cache.findIndex((element)=>element.hash === hash);
    if ( index !== -1) {
      return 'Из кэша: ' + cache[index].value;
    }
    if (cache.length === maxCount) {
      cache.shift();
    }
    cache.push({hash, value: func(...args)});
    return 'Вычисляем: ' + cache[cache.length - 1].value;
  };
};

// Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId = null;
  // обертка описана с использованием ключевого слова function и поименована,
  // поэтому ей можно задать свойства-счетчики до ее описания
  wrapper.allCount = 0;
  wrapper.count = 0;
  // добавляем фичу подсчета запусков декорируемой функции
  function countWrapper(...args) {
    // будет вызов декорируемой функции, надо увеличить счетчик ее вызовов
    wrapper.count++;
    func(...args);
  }
  // добавляем фичу задерженного запуска и подсчета всех попыток запуска
  function wrapper(...args) {
    // при каждом вызове декоратора, счетчик всех вызовов увеличится
    wrapper.allCount++;
    if (wrapper.count !== 0) { // запуск не первый, значит запускаем асинхронно
      // если timeoutId не null, надо сбросить выполнение по таймауту
      if (timeoutId) {
        // надо быстро за-null-ить timeoutId,
        // чтобы не произошло clearTimeout(null)
        // или очистки очищщенного
        const tempId = timeoutId;
        timeoutId = null;
        clearTimeout(tempId);
      }
      timeoutId = setTimeout(() => {
        // надо за-null-ить timeoutId,
        // чтобы не прервалось выполнение countWrapper(...args);
        timeoutId = null;
        countWrapper(...args);
      }, delay);
    } else { // счетчик на нуле - запуск первый и синхронно
      countWrapper(...args);
    }
  };
  return wrapper;
}
