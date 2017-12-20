import * as accountService from 'services/account';
import * as appService from 'services/app';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as convertData from '../routes/account/edit/convertData';

const defaultForm = {
  user_id: '',
  user_name: '',
  password: '',
  confirm_password: '',
  user_type: 2,
  real_name: '',
  home_url: '',
  email: '',
  licence_sn: '',
  licence_pic: [],
  id_pic_front: [],
  id_pic_back: [],
  telephone_code: '',
  telephone: '',
  cellphone: '',
  province: undefined,
  city: undefined,
  address: '',
  industry: '',
  industry_licence: [],
  was_agreed: 0,
};

export default {
  namespace: 'accountEdit',
  state: {
    industryItems: [],
    provinceItems: [],
    cityItems: [],
    form: defaultForm,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/account/edit/:id').exec(pathname);

        if (match) {
          dispatch({
            type: 'info',
            payload: match[1],
          });
        } else if (pathname === '/account/add') {
          dispatch({
            type: 'setup',
            payload: defaultForm,
          });
        }
      });
    },
  },
  effects: {
    *setup({ payload }, { call, put, select }) {
      const form = yield select(({ accountEdit }) => accountEdit.form);
      const industryItems = [];
      const provinceItems = [];
      const industryItemsJson = yield call(accountService.subuserIndustry);
      const provinceIitemsJson = yield call(appService.province);

      Object.keys(industryItemsJson).forEach((d) => {
        industryItems.push({
          value: d,
          text: industryItemsJson[d],
        });
      });

      Object.keys(provinceIitemsJson).forEach((d) => {
        provinceItems.push({
          value: d,
          text: provinceIitemsJson[d].province_name,
        });
      });

      if (payload) {
        yield put({
          type: 'updateForm',
          payload: defaultForm,
        });
      }

      yield put({
        type: 'updateState',
        payload: {
          industryItems,
          provinceItems,
        },
      });

      yield put({
        type: 'updateCity',
        payload: form.province,
      });
    },
    *updateCity({ payload }, { call, put }) {
      const cityItems = [];

      const cityItemsJson = yield call(appService.city, {
        province_id: payload,
      });

      Object.keys(cityItemsJson).forEach((d) => {
        cityItems.push({
          value: cityItemsJson[d].city_id,
          text: cityItemsJson[d].city_name,
        });
      });

      yield put({
        type: 'updateState',
        payload: {
          cityItems,
        },
      });
    },
    *info({ payload }, { call, put }) {
      const data = yield call(accountService.subuserInfo, {
        user_id: payload,
      });

      yield put({
        type: 'updateForm',
        payload: convertData.back(data),
      });
      yield put({
        type: 'setup',
      });
    },
    *add({ payload }, { call, put }) {
      const params = convertData.to(payload);
      yield call(accountService.subuserAdd, params);

      message.success('创建成功');

      yield put(
        routerRedux.push({
          pathname: '/account',
        }),
      );
    },

    *update({ payload }, { call, put }) {
      const params = convertData.to(payload);
      yield call(accountService.subuserUpdate, params);

      message.success('修改成功');

      yield put(
        routerRedux.push({
          pathname: '/account',
        }),
      );
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    updateForm(state, { payload }) {
      return {
        ...state,
        form: {
          ...state.form,
          ...payload,
        },
      };
    },
    resetCity(state) {
      return {
        ...state,
        form: {
          ...state.form,
          city: '',
        },
      };
    },
  },
};
