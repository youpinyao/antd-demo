import queryString from 'query-string';
import cookies from 'js-cookie';
import lodash from 'lodash';
import { routerRedux } from 'dva/router';
import $ from 'jquery';
import * as permissionService from 'services/permission';
import * as accountService from 'services/account';
import * as appService from 'services/app';

export default {
  namespace: 'app',
  state: {
    user_name: cookies.get('user_name'),
    locationPathname: '',
    locationQuery: {},
    selectedMenu: null,
    contentEl: null,
    contentMinHeight: 0,
    permissions: {},
    account: {},
    menus: [
      {
        key: 'homePage',
        name: '首页',
        path: '/home',
      },
      {
        key: 'accountManager',
        name: '账户管理',
        path: '/account',
      },
      {
        key: 'statisticsReportManager',
        name: '数据统计',
        path: '/statistics',
      },
      {
        key: 'financeManager',
        name: '财务管理',
        path: '/financial',
      },
      {
        key: 'operationLogManager',
        name: '日志',
        path: '/log',
      },
      {
        key: 'settingManager',
        name: '设置',
        path: '/setting',
      },
    ],
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        });
      });
    },

    setup({ dispatch }) {
      window.addEventListener('resize', () => {
        dispatch({
          type: 'updateContentMinHeight',
        });
      });

      dispatch({
        type: 'init',
      });
    },
  },
  effects: {
    *init({ payload }, { put }) {
      yield put({
        type: 'queryPermission',
      });
      yield put({
        type: 'queryAccount',
      });
    },
    *queryPermission({ payload }, { put, call }) {
      const permissions = yield call(permissionService.query);

      yield put({
        type: 'setPermission',
        payload: permissions,
      });
    },
    *queryAccount({ payload }, { put, call }) {
      const account = yield call(accountService.query);
      const config = yield call(appService.config);

      yield put({
        type: 'setAccont',
        payload: config,
      });
      yield put({
        type: 'setAccont',
        payload: account,
      });
    },
    *selectMenu({ payload }, { put, select }) {
      const { menus } = yield select(({ app }) => app);
      const menuItem = menus.filter(menu => menu.key === payload);

      yield put(
        routerRedux.push({
          pathname: menuItem[0].path,
        }),
      );
    },
    *logout({ payload }, { call, select }) {
      const login_url = yield select(({ app }) => app.account.login_url);

      yield call(appService.logout);
      window.location.href = login_url;
    },
  },
  reducers: {
    setPermission(state, { payload }) {
      const permissions = {};

      eachPermission(payload);
      function eachPermission(items) {
        items.forEach((permission) => {
          permissions[permission.module] = permission;

          if (permission.sub_module && permission.sub_module.length) {
            eachPermission(permission.sub_module);
          }
        });
      }

      return {
        ...state,
        permissions,
      };
    },

    setAccont(state, { payload }) {
      return {
        ...state,
        account: {
          ...state.account,
          ...payload,
        },
      };
    },
    updateContentMinHeight(state, { payload }) {
      const mergeState = {
        contentEl: state.contentEl,
      };

      if (payload) {
        mergeState.contentEl = payload;
      }

      return {
        ...state,
        ...mergeState,
        contentMinHeight: $(window).height() - $(`#${mergeState.contentEl.props.id}`).offset().top,
      };
    },
    updateState(state, { payload }) {
      const mergeState = {};
      state.menus.forEach((menu) => {
        if (lodash.startsWith(payload.locationPathname, menu.path)) {
          mergeState.selectedMenu = menu;
        }
      });

      return {
        ...state,
        ...payload,
        ...mergeState,
      };
    },
  },
};
