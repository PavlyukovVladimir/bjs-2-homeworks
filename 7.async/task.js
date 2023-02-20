'use strict';

/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

class AlarmClock {
  alarmCollection = [];
  intervalId = null;

  constructor() { }

  addClock(start, callback) {
    if (
      !start ||
      typeof start.valueOf() !== 'string' ||
      typeof callback !== 'function'
    ) {
      throw new Error('Отсутствуют обязательные аргументы');
    };
    if (this.alarmCollection.some((alarm) => alarm.time === start)) {
      console.warn('Уже присутствует звонок на это же время');
    }
    this.alarmCollection.push({callback, time: start, canCall: true});
  };

  removeClock(time) {
    this.alarmCollection = this.alarmCollection
        .filter((alarm) => alarm.time.valueOf() !== time.valueOf());
  };

  getCurrentFormattedTime() {
    return new Date().toLocaleTimeString('ru-Ru', {
      hour: '2-digit',
      minute: '2-digit',
    }).valueOf();
  };

  start() {
    if (this.intervalId !== null) {
      return;
    } else {
      this.intervalId = setInterval(() => {
        this.alarmCollection.forEach((alarm) => {
          if (
            alarm.canCall &&
            alarm.time.valueOf() === this.getCurrentFormattedTime()
          ) {
            alarm.canCall = false;
            alarm.callback();
          }
        });
      }, 1000);
    }
  };

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    };
  };

  resetAllCalls() {
    this.alarmCollection.forEach((alarm) => {
      alarm.canCall = true;
    });
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}
