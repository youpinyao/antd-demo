import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import {
  Table,
} from 'meetyou-antd-base';
import Crumb from './components/crumb';
import SearchBar from './components/search';
import RechargeModal from './components/recharge';
import AuthModal from './components/auth';
import Header from './components/header';
import Tips from './components/tips';

class Account extends React.Component {
  render() {
    const dispatch = this.props.dispatch;
    const tableColumns = require('./components/columns')(this.props);

    const {
      tableData,
      tableLoading,
      tablePagination,
    } = this.props.account;

    function handleTableChange(pagination) {
      dispatch({
        type: 'account/queryTable',
        payload: {
          newPagination: pagination,
        },
      });
    }

    return (
      <div>
        <Crumb />
        <Row>
          <Col span={2} />
          <Col span={20}>
            <Tips {...this.props} />
            <Header {...this.props} />
            <SearchBar {...this.props} className="mt-20" />
            <Table
              columns={tableColumns}
              rowKey={record => record.user_id}
              dataSource={tableData}
              pagination={tablePagination}
              loading={tableLoading}
              onChange={handleTableChange}
            />
          </Col>
          <Col span={2} />
        </Row>
        <RechargeModal {...this.props} />
        <AuthModal {...this.props} />
      </div>
    );
  }
}

export default connect(({ account, app: { account: appAccount, permissions } }) => ({
  account,
  appAccount,
  permissions,
}))(Account);
