import React from 'react';
import { connect } from 'dva';
import { Row, Col, Tabs } from 'antd';
import {
  Table,
} from 'meetyou-antd-base';
import Header from './header';
import UserInfo from './userInfo';
import styles from './index.less';
import {
  table1Columns,
  table2Columns,
} from './columns';

const { TabPane } = Tabs;

class Home extends React.Component {
  render() {
    const dispatch = this.props.dispatch;

    const {
      table1Data,
      table1Loading,
      table1Pagination,
      table2Data,
      table2Loading,
      table2Pagination,
    } = this.props.home;

    const activeTabKey = '1';

    function handleTable1Change(pagination, filters, sorter) {
      dispatch({
        type: 'home/queryTable1',
        payload: {
          newPagination: pagination,
          newSorter: sorter,
        },
      });
    }
    function handleTable2Change(pagination, filters, sorter) {
      dispatch({
        type: 'home/queryTable2',
        payload: {
          newPagination: pagination,
          newSorter: sorter,
        },
      });
    }

    return (
      <div>
        <Row>
          <Col span={2} />
          <Col span={20}>
            <UserInfo {...this.props} />
            <Header {...this.props} />
            <Col span={24}>
              <Tabs defaultActiveKey={activeTabKey} animated={false} className={styles.tabs}>
                <TabPane tab="有曝光" key="1">
                  <Table
                    columns={table1Columns(this.props)}
                    rowKey={record => record.user_id}
                    dataSource={table1Data}
                    pagination={table1Pagination}
                    loading={table1Loading}
                    onChange={handleTable1Change}
                  />
                </TabPane>
                <TabPane tab="无曝光" key="2">
                  <Table
                    columns={table2Columns(this.props)}
                    rowKey={record => record.user_id}
                    dataSource={table2Data}
                    pagination={table2Pagination}
                    loading={table2Loading}
                    onChange={handleTable2Change}
                  />
                </TabPane>
              </Tabs>
            </Col>
          </Col>
          <Col span={2} />
        </Row>
      </div>
    );
  }
}

export default connect(({ home, app: { account, permissions } }) => ({
  home,
  account,
  permissions,
}))(Home);
