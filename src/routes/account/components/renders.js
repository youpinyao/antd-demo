import React from 'react';
import classnames from 'classnames';
import 'antdes/switch/style/index.less';

export function renderOper(
  text,
  row,
  {
    subuser_recharge,
    subuser_auth,
    subuser_del,
    subuser_jump,
    subuser_update,
    styles,
    operClick,
    Popconfirm,
  },
) {
  const ops = row.op;

  const content = [];

  Object.keys(ops).forEach((key) => {
    const op = ops[key];

    switch (op.op_id) {
      case 1: {
        if (subuser_recharge) {
          content.push(
            <li key={op.op_id}>
              <a onClick={e => operClick('recharge', row, e)} href="javascript:void(0)">
                {op.op_name}
              </a>
            </li>,
          );
        }
        break;
      }
      case 2: {
        if (subuser_jump) {
          content.push(
            <li key={op.op_id}>
              <a onClick={e => operClick('operUser', row, e)} href={op.url} target="_blank">
                {op.op_name}
              </a>
            </li>,
          );
        }
        break;
      }
      case 3:
      case 4: {
        // content.push(
        //   <li key={op.op_id}>
        //     <a onClick={e => operClick('toggleState', row, e)} href="javascript:void(0)">
        //       {op.op_name}
        //     </a>
        //   </li>,
        // );
        break;
      }
      case 5: {
        if (subuser_del) {
          content.push(
            <li key={op.op_id}>
              <Popconfirm
                title={
                  <div>
                    删除后账户信息将无法恢复，<br />是否确定删除“{row.user_name}”？
                  </div>
                }
                onConfirm={e => operClick('delete', row, e)}
              >
                <a href="javascript:void(0)">{op.op_name}</a>
              </Popconfirm>
            </li>,
          );
        }
        break;
      }
      case 6: {
        if (subuser_update) {
          content.push(
            <li key={op.op_id}>
              <a onClick={e => operClick('update', row, e)} href={`#/account/edit/${row.user_id}`}>
                {op.op_name}
              </a>
            </li>,
          );
        }
        break;
      }
      case 7: {
        if (subuser_auth) {
          content.push(
            <li key={op.op_id}>
              <a onClick={e => operClick('auth', row, e)}>{op.op_name}</a>
            </li>,
          );
        }
        break;
      }
      default: {
        break;
      }
    }
  });
  return <ul className={styles.tableOpr}>{content}</ul>;
}

export function renderUserStateTxt(
  text,
  row,
  { subuser_state, switchChange, Tooltip, styles, tips, Popconfirm },
) {
  // 提示
  let tip = '';
  let hasTip = false;
  if (row.state === '3' && row.remark) {
    hasTip = true;
    tip = row.remark || '&nbsp';
  }
  // 操作
  let operate = '';
  let toggleState = 0;

  const tipText = parseInt(row.state, 10) === 2 ? '确认停用该账户。' : '确认生效该账户。';

  const showSwitch = subuser_state;

  (row.op || []).forEach((item) => {
    if (item.op_id === 3 || item.op_id === 4) {
      toggleState = item.op_id;
    }
  });
  if (row.state === '4' || toggleState === 3 || toggleState === 4) {
    // 停用
    const disable = row.state === '4' && row.is_agent_stop === '0';
    operate = showSwitch ? (
      <span>
        <Popconfirm title={tipText} onConfirm={e => switchChange(e, row)}>
          <span
            className={classnames('ant-switch', {
              'ant-switch-checked': row.enabled,
              'ant-switch-disabled': disable,
            })}
            tabIndex="0"
          >
            <span className="ant-switch-inner" />
          </span>
        </Popconfirm>&nbsp;&nbsp;
      </span>
    ) : (
      ''
    );

    if (disable && row.remark) {
      tip = `${row.disable_time || ''} 账户停用， ${row.remark || ''}`;
      operate = <Tooltip title={tip}>{operate}</Tooltip>;
    }
  }
  const stateText = <span>{row.user_state_txt}&nbsp;&nbsp;</span>;
  return (
    <div>
      {stateText}
      {(() => {
        return hasTip ? (
          <Tooltip title={tip}>
            <img className={styles.tips} src={tips} alt="" />
          </Tooltip>
        ) : (
          ''
        );
      })()}
      {operate}
    </div>
  );
}
