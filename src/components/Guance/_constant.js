import moment from 'moment';
import dayjs from 'dayjs';

export const DEFAULT_START_TIME = moment().subtract(8, 'days').format('YYYY-MM-DD');
export const DEFAULT_END_TIME = moment().subtract(1, 'days').format('YYYY-MM-DD');

export const TIME_TYPE_TO_START_TIME = {
  '本日': (time) => {
    return dayjs(time).add(0, 'd').format('YYYY-MM-DD')
  }, '本周': (time) => {
    return dayjs(time).add(-1, 'd').startOf('week').format('YYYY-MM-DD')
  }, '本月': (time) => {
    return dayjs(time).add(-1, 'd').startOf('month').format('YYYY-MM-DD')
  }, '近三日': (time) => {
    return dayjs(time).add(-3, 'd').format('YYYY-MM-DD')
  }, '近七日': (time) => {
    return dayjs(time).add(-7, 'd').format('YYYY-MM-DD')
  }, '近十五日': (time) => {
    return dayjs(time).add(-15, 'd').format('YYYY-MM-DD')
  }, '近三十日': (time) => {
    return dayjs(time).add(-30, 'd').format('YYYY-MM-DD')
  },
}
