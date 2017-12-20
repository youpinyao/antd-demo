import * as accountService from 'services/account';
import debounce from 'lodash.debounce';
import lodash from 'lodash';

module.exports = (user_name) => {
  return [
    {
      min: 3,
      message: '长度为3-20个字符',
    },
    {
      max: 20,
      message: '长度为3-20个字符',
    },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: '可使用字母、数字、下划线的任意组合，不可含特殊字符',
    },
    {
      validator: debounce((rule, value, callback) => {
        if (lodash.isEmpty(value)) {
          callback();
          return;
        }
        if (user_name === value) {
          callback();
          return;
        }
        accountService.checkUserName(value).then(
          () => {
            callback();
          },
          (res) => {
            callback(res.message);
          },
        );
      }, 300),
    },
  ];
};
