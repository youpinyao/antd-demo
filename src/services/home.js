
import * as request from 'request';
import * as urls from 'urls';

export async function query(data) {
  return request.get(urls.homeTable, data);
}


export function renderOrderBy(sorter) {
  let orderBy = undefined;
  const isAsc = sorter.order === 'ascend';

  switch (sorter.field) {
    case 'shows': {
      if (isAsc) {
        orderBy = 12;
      } else {
        orderBy = 11;
      }
      break;
    }
    case 'clicks': {
      if (isAsc) {
        orderBy = 21;
      } else {
        orderBy = 22;
      }
      break;
    }
    case 'ctr': {
      if (isAsc) {
        orderBy = 31;
      } else {
        orderBy = 32;
      }
      break;
    }
    case 'ecpm': {
      if (isAsc) {
        orderBy = 41;
      } else {
        orderBy = 42;
      }
      break;
    }
    case 'ecpc': {
      if (isAsc) {
        orderBy = 51;
      } else {
        orderBy = 52;
      }
      break;
    }
    case 'amount': {
      if (isAsc) {
        orderBy = 61;
      } else {
        orderBy = 62;
      }
      break;
    }
    case 'remain_amount': {
      if (isAsc) {
        orderBy = 71;
      } else {
        orderBy = 72;
      }
      break;
    }
    default: {
      break;
    }
  }

  return orderBy;
}

