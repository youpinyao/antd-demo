import isEmpty from 'lodash/isEmpty';

module.exports = [
  {
    validator(rule, value, callback) {
      if (isEmpty(value)) {
        callback();
        return;
      }
      if (/^[0-9A-Z]{9,30}$/.test(value)) {
        callback();
      } else {
        callback('请输入正确的营业执照编号');
      }
    },
  },
];
