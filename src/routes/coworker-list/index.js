import React from 'react';
import { connect } from 'dva';
import {
  SecondMenu,
} from 'meetyou-antd-base';
import './index.less';

class CoworkerList extends React.Component {
  render() {
    return (
      <SecondMenu>
        <SecondMenu.Item link="#/account">女人通账户</SecondMenu.Item>
        <SecondMenu.Item active link="#/coworker-list">协作者</SecondMenu.Item>
      </SecondMenu>
    );
  }
}

export default connect(({ coworkerist }) => ({ coworkerist }))(CoworkerList);
