import getFileName from 'utils/getFileName';
import $ from 'jquery';

export const to = (params) => {
  const data = $.extend(true, {}, params);

  if (data.id_pic_back && data.id_pic_back.length) {
    data.id_pic_back = data.id_pic_back[0].url || data.id_pic_back[0].response.fileurl;
  } else {
    data.id_pic_back = '';
  }

  if (data.id_pic_front && data.id_pic_front.length) {
    data.id_pic_front = data.id_pic_front[0].url || data.id_pic_front[0].response.fileurl;
  } else {
    data.id_pic_front = '';
  }

  if (data.licence_pic && data.licence_pic.length) {
    data.licence_pic = data.licence_pic[0].url || data.licence_pic[0].response.fileurl;
  } else {
    data.licence_pic = '';
  }

  if (data.industry_licence && data.industry_licence.length) {
    data.industry_licence.forEach((v, k) => {
      data.industry_licence[k] = v.url || v.response.fileurl;
    });
  } else {
    data.industry_licence = [];
  }

  return data;
};

export const back = (params) => {
  const data = $.extend(true, {}, params);

  if (data.id_pic_back) {
    data.id_pic_back = [{
      uid: 0,
      status: 'done',
      name: getFileName(data.id_pic_back),
      url: data.id_pic_back,
    }];
  } else {
    data.id_pic_back = [];
  }

  if (data.id_pic_front) {
    data.id_pic_front = [{
      uid: 0,
      status: 'done',
      name: getFileName(data.id_pic_front),
      url: data.id_pic_front,
    }];
  } else {
    data.id_pic_front = [];
  }

  if (data.licence_pic) {
    data.licence_pic = [{
      uid: 0,
      status: 'done',
      name: getFileName(data.licence_pic),
      url: data.licence_pic,
    }];
  } else {
    data.licence_pic = [];
  }

  if (data.industry_licence && data.industry_licence.length) {
    data.industry_licence.forEach((v, k) => {
      data.industry_licence[k] = {
        uid: k,
        status: 'done',
        name: getFileName(v),
        url: v,
      };
    });
  } else {
    data.industry_licence = [];
  }

  data.user_type = parseInt(data.user_type, 10);

  return data;
};
