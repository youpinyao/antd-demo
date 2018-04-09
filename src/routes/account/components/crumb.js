import React from 'react';
import {
  SecondMenu,
} from 'meetyou-antd-base';

export default class Crumb extends React.Component {
  render() {
    return (
      <SecondMenu>
        <SecondMenu.Item active link="#/account">
          女人通账户
        </SecondMenu.Item>
        <SecondMenu.Item link="#/coworker-list">协作者</SecondMenu.Item>
      </SecondMenu>
    );
  }
}
