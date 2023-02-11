/* eslint-disable no-unused-vars */
/**
 * Класс представляет собой абстракцию печатного издания
 */
class PrintEditionItem {
  name;
  releaseDate;
  pagesCount;
  _state = 100;
  type = null;
  /**
   *
   * @param {string} name название издания
   * @param {integer} releaseDate год выпуска
   * @param {integer} pagesCount число страниц
   */
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
  }

  /**
   * Состояние книги в %, может быть от 0 до 100 включительно
   *
   */
  get state() {
    return this._state;
  }

  /**
   *
   * @param {number} value
   * Присваивание значения меньше 0 или больше 100 будет проигнорированно.
   */
  set state(value) {
    value = +value;
    if (isNaN(value)) {
      return;
    }
    if (value <= 0) {
      this._state = 0;
    } else if (value >= 100) {
      this._state = 100;
    } else {
      this._state = value;
    }
  }

  /**
   * Чинит книгу улучшая ее состояние в 1,5 раз,
   * улучшение не повысит состояние выше 100%
   */
  fix() {
    this.state = this.state * 1.5;
  }
}

/**
 * Класс представляет собой абстракцию журнала
 */
class Magazine extends PrintEditionItem {
  type = 'magazine';
}

/**
 * Класс представляет собой абстракцию книги
 */
class Book extends PrintEditionItem {
  author;
  /**
   *
   * @param {*} author
   * @param {*} name
   * @param {*} releaseDate
   * @param {*} pagesCount
   */
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = 'book';
  }
}

/**
 * Класс представляет собой абстракцию книги из раздела 'новеллы'
 */
class NovelBook extends Book {
  /**
   *
   * @param {*} author
   * @param {*} name
   * @param {*} releaseDate
   * @param {*} pagesCount
   */
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'novel';
  }
}

/**
 * Класс представляет собой абстракцию книги из раздела 'фантастика'
 */
class FantasticBook extends Book {
  /**
   *
   * @param {*} author
   * @param {*} name
   * @param {*} releaseDate
   * @param {*} pagesCount
   */
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'fantastic';
  }
}

/**
 * Класс представляет собой абстракцию книги из раздела 'детективы'
 */
class DetectiveBook extends Book {
  /**
   *
   * @param {*} author
   * @param {*} name
   * @param {*} releaseDate
   * @param {*} pagesCount
   */
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'detective';
  }
}

/**
 * Класс представляет собой абстракцию библиотеки
 */
class Library {
  name;
  books = [];

  /**
   *
   * @param {string} name
   * @param {array} books
   */
  constructor(name, books) {
    this.name = name;
    // если books не массив тут бы исключение бросить,
    // ну да помолчим в этой задаче
    if (isArray(books) && books.length > 0) {
      // тут бы тоже поругаться если среди массива есть не печатные издания
      if (books.every((book) => book instanceof PrintEditionItem)) {
        this.books.push(...books);
      }
    }
  }

  /**
   *
   * @param {PrintEditionItem} book
   * @return {Library} вернет ссылку на текущий объект
   */
  addBook(book) {
    if (book instanceof PrintEditionItem) {
      if (book.state > 30) {
        this.books.push(book);
      }
    }
    return this;
  }

  /**
   * Найдет книгу по названиию и значению ее свойства.
   * @param {string} type
   * @param {*} value
   * @return {PrintEditionItem}
   * Вернет первую подходящую книгу, если не найдет то вернет null,
   * если type не строка или пустая строка вернет null
   */
  findBookBy(type, value) {
    if (!isString(type) || type.length === 0) {
      return null;
    }
    const result = this.books.find((book) => book[type] === value);
    if (result === undefined) {
      return null;
    }
    return result;
  }

  /**
   *
   * @param {string} bookName
   * @return {PrintEditionItem}
   * Вернет первую подходящую книгу, если не найдет то вернет null
   */
  giveBookByName(bookName) {
    const index = this.books.findIndex((book) => book.name === bookName);
    if (index === -1) {
      return null;
    }
    const book = this.books[index];
    this.books.splice(index, 1);
    return book;
  }
}

// для задачи 3

/**
 * Класс представляет собой абстракцию студента
 */
class Student {
  name;
  gender;
  age;
  marks = {};

  /**
   *
   * @param {string} name
   * @param {string} gender
   * @param {integer} age
   */
  constructor(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
  }

  /**
   * Добавляет к журналу оценок новый предмет, если его не было.
   * Ничего не сделает, если такой предмет есть.
   *
   * @param {string} subjectName
   * @return {void}
   */
  setSubject = function(subjectName) {
    if (!isString(subjectName) || subjectName === '') {
      return;
    }
    // если предмета нет, то добавим его
    if (!this.marks[subjectName]) {
      this.marks[subjectName] = [];
    }
  };

  /**
   * Добавляет оценку по предмету.
   * Если предмета нет в журнале, он будет добавлен.
   *
   * @param {number} mark
   * @param {string} subjectName
   */
  addMark = function(mark, subjectName) {
    if (
      isString(subjectName) && // имя предмета должно быть строкой
      !!subjectName && // не пустой
      'marks' in this && // должно быть поле 'marks',
      // иначе студент исключен и нет смысла ставить оценку
      !isNaN(+mark) && mark >= 2 && mark <= 5 // оценки числа от 2 до включая 5
    ) {
      // Надо проверить есть ли предмет,
      // даже если я знаю, что setSubject это сделает,
      // вдруг его логика изменилась...
      if (!this.marks[subjectName]) {
        this.setSubject(subjectName);
      }
      // наконецто можно добавить оценку
      this.marks[subjectName].push(mark);
    }
  };

  /**
   * Считает средную оценку по предмету.
   *
   * @param {string} subjectName
   * @return {number}
   *
   * Вернет среднюю оценку по предмету,
   * если предмета нет или оценок нет вернет 0;
   */
  getAverageBySubject(subjectName) {
    if (
      !isString(subjectName) || // имя предмета должно быть строкой
      !subjectName || // не пустой
      !'marks' in this || // поле 'marks' должно быть
      !this.marks[subjectName] || // есть список оценок по предмету
      this.marks[subjectName].length === 0 // по предмету есть хоть одна оценка
    ) {
      return 0;
    }
    const arr = this.marks[subjectName];
    return arr.reduce(
        (previousValue, currentValue) => {
          return previousValue + currentValue;
        }
        , 0) / arr.length;
  }

  /**
   * Считает среднюю оценку по всем предметам в журнале.
   *
   * @return {number}
   *
   * Вернет среднее средних оценок по всем предметам в журнале.
   */
  getAverage() {
    if (!'marks' in this) {
      return 0;
    }
    const keys = Object.keys(this.marks);
    if (keys.length === 0) {
      return 0;
    }
    return keys.reduce(
        (previousAverage, key) => {
          return previousAverage + this.getAverageBySubject(key);
        }
        , 0,
    ) / keys.length;
  }

  /**
   * Исключает студента
   *
   * @param {string} reason
   */
  exclude = function(reason) {
    if (isString(reason) && reason.length > 0) {
      delete this.marks;
      this.excluded = reason;
    }
  };
}

/**
 * Проверяет строка ли переданный аргумент.
 *
 * @param {object} obj
 * @return {boolean}
 */
function isString(obj) {
  return obj instanceof String || typeof obj === 'string';
}

// function isIterable(obj) {
//     return !!obj[Symbol.iterator]
// }

// function isNotEmptyIterable(obj) {
//     if(!isIterable(obj)){
//         return false;
//     }
//     let first = obj[Symbol.iterator]().next();
//     return !first.done || first.value !== undefined;
// }

/**
 * Проверяет массив ли переданный аргумент.
 *
 * @param {object} obj
 * @return {boolean}
 */
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};
