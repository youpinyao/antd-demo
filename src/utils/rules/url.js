import isEmpty from 'lodash/isEmpty';

module.exports = [
  {
    validator(rule, value, callback) {
      if (isEmpty(value)) {
        callback();
        return;
      }
      if (/^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i.test(value)) {
        callback();
      } else {
        callback('格式有误，例如http://www.meiyou.com');
      }
    },
  },
];
