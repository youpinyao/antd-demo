import lodash from 'lodash';

module.exports = [
  {
    validator(rule, value, callback) {
      if (lodash.isEmpty(value)) {
        callback();
        return;
      }
      if (/^[0-9]+$/.test(value)) {
        callback();
      } else {
        callback('请输入数字');
      }
    },
  },
];
