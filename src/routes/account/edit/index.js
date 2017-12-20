import React from 'react';
import { connect } from 'dva';
import { Button, Col, Row } from 'antd';
import {
  Loading,
} from 'meetyou-antd-base';

import styles from './index.less';

import Crumb from '../components/crumb';
import Form from './form';

class AccountEdit extends React.Component {
  render() {
    const dispatch = this.props.dispatch;
    const loading = this.props.loading;
    const user_id = this.props.accountEdit.form.user_id;

    // console.log(this);

    let validateFieldsAndScroll = null;
    let resetFields = null;

    const onSubmit = () => {
      validateFieldsAndScroll((err, values) => {
        // console.log(values);
        if (!err) {
          dispatch({
            type: 'accountEdit/updateState',
            payload: {
              loading: true,
            },
          });
          dispatch({
            type: `accountEdit/${user_id ? 'update' : 'add'}`,
            payload: {
              ...values,
              user_id,
            },
          });
        }
      });
    };

    const doReset = () => {
      resetFields();
    };

    return (
      <div>
        <Loading show={!!loading.effects['accountEdit/info'] || !!loading.effects['accountEdit/setup']} />
        <Crumb />
        <Form
          {...this.props}
          onInit={(va, re) => {
            validateFieldsAndScroll = va;
            resetFields = re;
          }}
        />
        <Row className={styles.buttons}>
          <Col span={4} />
          <Col
            span={20}
            style={{
              width: 240,
            }}
          >
            <Button onClick={doReset}>重置</Button>
            <Button
              type="primary"
              loading={!!loading.effects['accountEdit/add'] || !!loading.effects['accountEdit/update']}
              onClick={onSubmit}
            >
              提交
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ accountEdit, loading, app: { account: appAccount, permissions } }) => ({
  accountEdit,
  appAccount,
  permissions,
  loading,
}))(AccountEdit);
