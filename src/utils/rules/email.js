import lodash from 'lodash';

module.exports = [
  {
    validator(rule, value, callback) {
      if (lodash.isEmpty(value)) {
        callback();
        return;
      }
      if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)) {
        callback();
      } else {
        callback('请输入正确的邮箱');
      }
    },
  },
];
