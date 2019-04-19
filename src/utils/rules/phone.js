import isEmpty from 'lodash/isEmpty';

module.exports = [
  {
    validator(rule, value, callback) {
      if (isEmpty(value)) {
        callback();
        return;
      }
      if (/^0?(13[0-9]|15[012356789]|17[0123456789]|18[0123456789]|14[57])[0-9]{8}$/.test(value)) {
        callback();
      } else {
        callback('请输入有效的手机号码');
      }
    },
  },
];
