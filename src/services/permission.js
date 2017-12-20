
import * as request from 'request';
import * as urls from 'urls';

export async function query() {
  return request.get(urls.permission);
}
