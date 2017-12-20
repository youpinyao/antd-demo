import * as request from 'request';
import * as urls from 'urls';

export async function query() {
  return request.get(urls.account);
}

export async function subuser(data) {
  return request.get(urls.subuser, data);
}

export async function subuserDeactivate(data) {
  return request.post(urls.subuserDeactivate, data);
}

export async function subuserActivate(data) {
  return request.post(urls.subuserActivate, data);
}

export async function subuserRecharge(data) {
  return request.post(urls.subuserRecharge, data);
}

export async function subuserAuthSwitch(data) {
  return request.post(urls.subuserAuthSwitch, data);
}

export async function subuserDel(data) {
  return request.post(urls.subuserDel, data);
}

function subuserCheck(data) {
  return request.post(urls.subuserCheck, {
    ...data,
  }, {
    errorTip: false,
  });
}

export function checkUserName(user_name) {
  return subuserCheck({
    type: 1,
    user_name,
  });
}

export function checkCellphone(cellphone) {
  return subuserCheck({
    type: 2,
    cellphone,
  });
}

export function checkUserEmail(email) {
  return subuserCheck({
    type: 3,
    email,
  });
}

export async function userStateTypes() {
  return new Promise((reslove) => {
    reslove([
      {
        value: 0,
        text: '所有',
      },
      {
        value: 1,
        text: '审核中',
      },
      {
        value: 2,
        text: '有效',
      },
      {
        value: 3,
        text: '不通过',
      },
      {
        value: 4,
        text: '停用',
      },
      {
        value: 5,
        text: '余额不足',
      },
    ]);
  });
}

export async function subuserIndustry() {
  return request.get(urls.subuserIndustry);
}

export async function subuserAdd(data) {
  return request.post(urls.subuserAdd, data);
}

export async function subuserInfo(data) {
  return request.post(urls.subuserInfo, data);
}

export async function subuserUpdate(data) {
  return request.post(urls.subuserUpdate, data);
}
