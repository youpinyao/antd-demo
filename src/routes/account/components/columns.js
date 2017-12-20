import { Tooltip, Popconfirm } from 'antd';
import { renderUserStateTxt, renderOper } from './renders';
import styles from '../index.less';

const tips = require('images/tips.svg');

export default function columns(props) {
  const {
    subuser_state,
    subuser_recharge,
    subuser_jump,
    subuser_del,
    subuser_update,
    subuser_auth,
  } = props.permissions;
  const dispatch = props.dispatch;

  function operClick(type, row) {
    // recharge
    // operUser
    // delete
    // update
    // auth
    let prefix = '';

    if (type === 'recharge' || type === 'delete') {
      prefix = 'effect_';
    }
    if (type === 'delete') {
      dispatch({
        type: `account/${prefix}oper_${type}`,
        payload: {
          user_id: row.user_id,
        },
      });

      return;
    }
    dispatch({
      type: `account/${prefix}oper_${type}`,
      payload: {
        user_id: row.user_id,
        real_name: row.real_name,
        range_quantity_switch: row.range_quantity_switch === '1',
      },
    });
  }

  function switchChange(e, row) {
    let type = '';

    switch (parseInt(row.state, 10)) {
      case 2: {
        type = 'account/deactivate';
        break;
      }
      case 4: {
        type = 'account/activate';
        break;
      }
      default: {
        break;
      }
    }
    dispatch({
      type,
      payload: {
        user_id: row.user_id,
      },
    });
  }

  return [
    {
      dataIndex: 'real_name',
      title: '推广账户',
      className: 'col-realName',
    },
    {
      dataIndex: 'user_name',
      title: '用户名',
      className: 'col-userName',
    },
    {
      dataIndex: 'industry',
      title: '所属行业',
      className: 'col-industry',
    },
    {
      dataIndex: 'user_state_txt',
      title: '账户状态',
      render(text, row) {
        return renderUserStateTxt(text, row, {
          subuser_state,
          switchChange,
          Tooltip,
          styles,
          tips,
          Popconfirm,
        });
      },
    },
    {
      dataIndex: 'consume_amount',
      title: '已消费（元）',
      className: 'table-number-col col-consumeAmount',
    },
    {
      dataIndex: 'remain_amount',
      title: '账户余额（元）',
      className: 'table-number-col col-remainAmount',
    },
    {
      dataIndex: 'created_date',
      title: '创建日期',
      className: 'col-createdDate',
    },
    {
      dataIndex: 'oper',
      title: '操作',
      className: 'col-oper',
      render(text, row) {
        return renderOper(text, row, {
          subuser_recharge,
          subuser_auth,
          subuser_del,
          subuser_jump,
          subuser_update,
          styles,
          operClick,
          Popconfirm,
        });
      },
    },
  ];
}
