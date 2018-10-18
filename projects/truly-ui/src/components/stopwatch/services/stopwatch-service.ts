import {Injectable} from '@angular/core';

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
}
