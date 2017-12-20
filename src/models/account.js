import cookies from 'js-cookie';
import queryString from 'query-string';
import pathToRegexp from 'path-to-regexp';
import * as accountService from 'services/account';

export default {
  namespace: 'account',
  state: {
    agentType: parseInt(cookies.get('agent_type'), 10),
    tableData: [],
    tableLoading: false,
    agent_remain_amount: 0,
    subuser_remain_amount: 0,
    first_charge_remind: false,
    remain_amount_remind: false,
    userStateTypes: [],
    tablePagination: {
      total: 0,
      pageSize: 10,
      current: 1,
    },
    searchParams: {
      name: '',
      state: 0,
    },
    rechargeModal: {
      visible: false,
      amount: '',
      user_id: '',
      loading: false,
    },
    authModal: {
      visible: false,
      range_quantity_switch: false,
      loading: false,
      user_id: '',
      real_name: '',
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/account/:state').exec(pathname);

        if (match) {
          dispatch({
            type: 'init',
            payload: match[1],
          });
        } else if (pathname === '/account') {
          dispatch({
            type: 'init',
          });
        }
      });
    },
  },
  effects: {
    *init({ payload }, { put }) {
      // 如果是特定参数
      yield put({
        type: 'updateSearchParams',
        payload: {
          state: parseInt(payload, 10) || 0,
        },
      });
      yield put({
        type: 'queryTable',
        payload: {},
      });
      yield put({
        type: 'queryUserStateTypes',
      });
    },
    *doSwitchAuth({ payload: { range_quantity_switch } }, { call, put, select }) {
      const user_id = yield select(({ account }) => account.authModal.user_id);

      yield call(accountService.subuserAuthSwitch, {
        user_id,
        range_quantity_switch: range_quantity_switch ? 1 : 2,
      });

      yield put({
        type: 'oper_auth',
        payload: {
          loading: true,
        },
      });

      yield put({
        type: 'queryTable',
        payload: {},
      });

      yield put({
        type: 'oper_auth',
        payload: {
          visible: false,
          loading: false,
        },
      });
    },
    *doRecharge({ payload: { amount } }, { call, put, select }) {
      const user_id = yield select(({ account }) => account.rechargeModal.user_id);

      yield call(accountService.subuserRecharge, {
        user_id,
        amount,
      });

      yield put({
        type: 'oper_recharge',
        payload: {
          loading: true,
        },
      });

      yield put({
        type: 'queryTable',
        payload: {},
      });
      yield put({
        type: 'oper_recharge',
        payload: {
          visible: false,
          amount: '',
          loading: false,
        },
      });
    },
    *queryUserStateTypes({ payload }, { call, put }) {
      const data = yield call(accountService.userStateTypes);

      yield put({
        type: 'updateUserStateTypes',
        payload: data,
      });
    },
    *queryTable({ payload: { newPagination } }, { call, put, select }) {
      let pagination = yield select(({ account }) => account.tablePagination);
      const searchParams = yield select(({ account }) => account.searchParams);

      pagination = {
        ...pagination,
        ...newPagination,
      };

      yield put({
        type: 'updateTable',
        payload: true,
      });

      const data = yield call(accountService.subuser, {
        size: pagination.pageSize,
        page: pagination.current,
        ...searchParams,
      });

      yield put({
        type: 'updateTable',
        payload: {
          data,
        },
      });
    },
    *activate({ payload }, { call, put }) {
      const data = yield call(accountService.subuserActivate, payload);

      yield put({
        type: 'updateAccountState',
        payload: {
          ...payload,
          ...data,
        },
      });
    },
    *deactivate({ payload }, { call, put }) {
      const data = yield call(accountService.subuserDeactivate, payload);

      yield put({
        type: 'updateAccountState',
        payload: {
          ...payload,
          ...data,
        },
      });
    },
    *export({ payload }, { select }) {
      const searchParams = yield select(({ account }) => account.searchParams);

      if (!searchParams.name) {
        searchParams.name = '';
      }
      searchParams.name = encodeURIComponent(searchParams.name);

      window.open(`/subuser/subuserexport?${queryString.stringify(searchParams)}`);
    },
    *effect_oper_recharge({ payload }, { put }) {
      yield put({
        type: 'app/queryAccount',
      });

      yield put({
        type: 'oper_recharge',
        payload,
      });
    },
    *effect_oper_delete({ payload }, { put, call }) {
      yield call(accountService.subuserDel, payload);

      yield put({
        type: 'queryTable',
        payload: {},
      });
    },
  },
  reducers: {
    oper_auth(state, { payload }) {
      const authModal = {
        ...state.authModal,
        visible: true,
        ...payload,
      };

      return {
        ...state,
        authModal: {
          ...authModal,
        },
      };
    },
    oper_recharge(state, { payload }) {
      const rechargeModal = {
        ...state.rechargeModal,
        visible: true,
        ...payload,
      };

      return {
        ...state,
        rechargeModal: {
          ...rechargeModal,
        },
      };
    },
    updateSearchParams(state, { payload }) {
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          ...payload,
        },
      };
    },
    updateAccountState(state, { payload }) {
      let tableData = payload.tableData;

      tableData = state.tableData.map((item) => {
        const data = {};
        if (parseInt(item.user_id, 10) === payload.user_id) {
          data.state = payload.state;
          data.enabled = payload.state === 2;
        }

        return {
          ...item,
          ...data,
        };
      });

      return {
        ...state,
        tableData,
      };
    },
    updateUserStateTypes(state, { payload }) {
      return {
        ...state,
        userStateTypes: payload,
      };
    },
    updateTable(state, { payload }) {
      if (payload === true) {
        return {
          ...state,
          tableLoading: true,
        };
      }

      const { data } = payload;
      const {
        agent_remain_amount,
        subuser_remain_amount,
        first_charge_remind,
        remain_amount_remind,
        item_list,
      } = data;

      const tablePagination = {
        total: parseInt(data.total, 10),
        pageSize: data.size,
        current: data.page,
      };
      const tableLoading = false;

      return {
        ...state,
        tableData: item_list.map((item) => {
          return {
            ...item,
            enabled: item.state === '2',
          };
        }),
        tablePagination,
        tableLoading,
        agent_remain_amount,
        subuser_remain_amount,
        first_charge_remind,
        remain_amount_remind,
      };
    },
  },
};
