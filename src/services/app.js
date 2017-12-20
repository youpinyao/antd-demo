
import * as request from 'request';
import * as urls from 'urls';

export async function logout() {
  return request.post(urls.logout);
}

export async function config() {
  return request.get(urls.config);
}

export async function province() {
  return request.get(urls.province);
}

export async function city(data) {
  return request.get(urls.city, data);
}
