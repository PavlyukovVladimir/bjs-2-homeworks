/* eslint-disable no-unused-vars */
/**
 * Преобразует строку в число.
 * Выбрасывает исключение TypeError если не удалось.
 * @param {string} str строковое представление числа
 * @return {number}
 * Возвращает число полученное из строкового представления числа.
 */
function parseCount(str) {
  const parsedNumber = Number.parseFloat(str);
  if (isNaN(parsedNumber)) {
    throw new TypeError('Невалидное значение');
  } else {
    return parsedNumber;
  }
}

/**
 * Преобразует текст в число,
 * Если не получается вернет текст ошибки.
 * @param {string} str строковое представление числа
 * @return {*}
 * Вернет число или текст ошибки.
 */
function validateCount(str) {
  try {
    return parseCount(str);
  } catch (error) {
    return error;
  }
}

/**
 *
 */
class Triangle {
  _firstSideLength;
  _secondSideLength;
  _thirdSideLength;

  /**
   *
   * @param {number} firstSideLength
   * @param {number} secondSideLength
   * @param {number} thirdSideLength
   */
  constructor(firstSideLength, secondSideLength, thirdSideLength) {
    const first = +firstSideLength;
    const second = +secondSideLength;
    const third = +thirdSideLength;
    let errorMessage = '';
    if (isNaN(first)) {
      errorMessage += 'Первая сторона не число.';
    }
    if (isNaN(second)) {
      if (errorMessage.length === 0) {
        errorMessage += 'Вторая сторона не число.';
      } else {
        errorMessage += '\nВторая сторона не число.';
      }
    }
    if (isNaN(third)) {
      if (errorMessage.length === 0) {
        errorMessage += 'Третья сторона не число.';
      } else {
        errorMessage += '\nТретья сторона не число.';
      }
    }
    if (errorMessage.length !== 0) {
      throw new TypeError(errorMessage);
    }
    if (
      (first + second) <= third ||
      (first + third) <= second ||
      (second + third) <= first
    ) {
      throw new TypeError('Треугольник с такими сторонами не существует');
    }

    this._firstSideLength = first;
    this._secondSideLength = second;
    this._thirdSideLength = third;
  }

  /**
   * Площадь треугольника.
   */
  get area() {
    const semiPerimeter = this.perimeter / 2;
    return Math.round(1000 * Math.sqrt(
        semiPerimeter *
        (semiPerimeter - this.firstSideLength) *
        (semiPerimeter - this.secondSideLength) *
        (semiPerimeter - this.thirdSideLength),
    )) / 1000;
  }

  /**
   * Периметр треугольника.
   */
  get perimeter() {
    return this._firstSideLength +
      this._secondSideLength +
      this._thirdSideLength;
  }

  /**
   * Первая сторона.
   */
  get firstSideLength() {
    return this._firstSideLength;
  }

  /**
   * Вторая сторона.
   */
  get secondSideLength() {
    return this._secondSideLength;
  }

  /**
   * Третья сторона.
   */
  get thirdSideLength() {
    return this._thirdSideLength;
  }
}

/**
 *
 * @param {number} firstSideLength
 * @param {number} secondSideLength
 * @param {number} thirdSideLength
 * @return {Triangle}
 */
function getTriangle(firstSideLength, secondSideLength, thirdSideLength) {
  try {
    return new Triangle(firstSideLength, secondSideLength, thirdSideLength);
  } catch ( error ) {
    return {
      get area() {
        return 'Ошибка! Треугольник не существует';
      },
      get perimeter() {
        return 'Ошибка! Треугольник не существует';
      },
    };
  }
}
