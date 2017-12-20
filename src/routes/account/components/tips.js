import React from 'react';
import { Alert } from 'antd';

import styles from '../index.less';

export default class Tips extends React.Component {
  render() {
    const { remain_amount_remind } = this.props.account;

    return remain_amount_remind ? (
      <Alert className={styles.alert} message="为确保广告正常投放，请及时充值" type="warning" />
    ) : (
      <div></div>
    );
  }
}
