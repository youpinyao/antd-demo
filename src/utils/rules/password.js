import lodash from 'lodash';

module.exports = [
  {
    min: 6,
    message: '长度为6-16个字符',
  },
  {
    max: 16,
    message: '长度为6-16个字符',
  },
  {
    validator(rule, value, callback) {
      if (lodash.isEmpty(value)) {
        callback();
        return;
      }
      const pwdReg = /^[a-zA-Z0-9_!@#$%^&*]+$/;
      const num = /^[0-9]{1,9}$/;
      const res = pwdReg.test(value) && !num.test(value);

      callback(res ? undefined : '长度为6-16个字符，不能包含空格，不能是9位以下纯数字');
    },
  },
];
