import cookies from 'js-cookie';
import moment from 'moment';
import * as homeService from 'services/home';

export default {
  namespace: 'home',
  state: {
    account: cookies.get('user_name'),
    agentType: parseInt(cookies.get('agent_type'), 10),
    time: moment().format('YYYY年MM月DD日'),
    table1Data: [],
    table2Data: [],
    table1Loading: false,
    table2Loading: false,
    table1Pagination: {
      total: 0,
      pageSize: 10,
      current: 1,
    },
    table2Pagination: {
      total: 0,
      pageSize: 10,
      current: 1,
    },
    table1SortInfo: {
      order: null,
      field: null,
    },
    table2SortInfo: {
      order: 'descend',
      field: 'remain_amount',
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'init',
      });
    },
  },
  effects: {
    *init({ payload }, { put }) {
      yield put({
        type: 'queryTable1',
        payload: {},
      });

      yield put({
        type: 'queryTable2',
        payload: {},
      });
    },
    *queryTable1({ payload: { newPagination, newSorter } }, { call, put, select }) {
      let pagination = yield select(({ home }) => home.table1Pagination);
      let sorter = yield select(({ home }) => home.table1SortInfo);

      pagination = {
        ...pagination,
        ...newPagination,
      };
      sorter = {
        ...sorter,
        ...newSorter,
      };

      if (newSorter && newSorter.field === undefined) {
        sorter = {};
      }

      yield put({
        type: 'updateTable1',
        payload: true,
      });

      const data = yield call(homeService.query, {
        has_show: 1,
        size: pagination.pageSize,
        page: pagination.current,
        order_by: homeService.renderOrderBy(sorter),
      });

      yield put({
        type: 'updateTable1',
        payload: {
          data,
          sorter,
        },
      });
    },

    *queryTable2({ payload: { newPagination, newSorter } }, { call, put, select }) {
      let pagination = yield select(({ home }) => home.table2Pagination);
      let sorter = yield select(({ home }) => home.table2SortInfo);

      pagination = {
        ...pagination,
        ...newPagination,
      };
      sorter = {
        ...sorter,
        ...newSorter,
      };
      if (newSorter && newSorter.field === undefined) {
        sorter = {};
      }

      yield put({
        type: 'updateTable2',
        payload: true,
      });

      const data = yield call(homeService.query, {
        has_show: 2,
        size: pagination.pageSize,
        page: pagination.current,
        order_by: homeService.renderOrderBy(sorter),
      });

      yield put({
        type: 'updateTable2',
        payload: {
          data,
          sorter,
        },
      });
    },
  },
  reducers: {
    updateTable1(state, { payload }) {
      if (payload === true) {
        return {
          ...state,
          table1Loading: true,
        };
      }

      const { data, sorter } = payload;

      const table1Data = data.item_list;
      const table1Pagination = {
        total: data.total,
        pageSize: data.size,
        current: data.page,
      };
      const table1Loading = false;

      return {
        ...state,
        table1Data,
        table1Pagination,
        table1Loading,
        table1SortInfo: sorter,
      };
    },

    updateTable2(state, { payload }) {
      if (payload === true) {
        return {
          ...state,
          table2Loading: true,
        };
      }
      const { data, sorter } = payload;

      const table2Data = data.item_list;
      const table2Pagination = {
        total: data.total,
        pageSize: data.size,
        current: data.page,
      };
      const table2Loading = false;

      return {
        ...state,
        table2Data,
        table2Pagination,
        table2Loading,
        table2SortInfo: sorter,
      };
    },
  },
};
