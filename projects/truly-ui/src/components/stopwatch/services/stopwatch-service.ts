import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class StopwatchService {

  public hour = 0;

  public minute = 0;

  public second = 0;

  public LIMIT_HOUR = 24;

  public LIMIT_MINUTE = 60;

  public LIMIT_SECOND = 60;

  public isPause = true;

  public interval;

  public refreshHour = new EventEmitter();

  constructor() {}

  isLimitHour() {
    return this.hour === this.LIMIT_HOUR;
  }

  isLimitMinute() {
    return this.minute === this.LIMIT_MINUTE;
  }

  isLimitSecond() {
    return this.second === this.LIMIT_SECOND;
  }

  resetHour() {
    this.hour = 0;
  }

  resetMinute() {
    this.minute = 0;
  }

  resetSecond() {
    this.second = 0;
  }

  incrementHour() {
    this.resetMinute();
    this.hour++;
  }

  incrementMinute() {
    this.resetSecond();
    this.minute++;
  }

  incrementSecond() {
    this.second++;
  }

  start() {
    this.isPause = false;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.isPause) {
        return;
      }
      this.incrementSecond();
      if (this.isLimitSecond()) {
        this.incrementMinute();
      }
      if (this.isLimitMinute()) {
        this.incrementHour();
      }
      if (this.isLimitHour()) {
        this.resetHour();
      }
      this.refreshHour.emit(this.getHour());
    }, 1000);
  }

  stop() {
    this.isPause = true;
    this.refreshHour.emit(this.getHour());
  }

  getHour() {
    return this.formatTime(this.hour) + ':' +
      this.formatTime(this.minute) + ':' +
      this.formatTime(this.second);
  }

  formatTime(digit) {
    return digit <= 9 ? '0' + digit : digit;
  }

  reset() {
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.refreshHour.emit(this.getHour());
  }

}
