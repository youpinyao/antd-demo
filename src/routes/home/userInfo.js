import React from 'react';
import { Col } from 'antd';
import styles from './index.less';

export default class UserInfo extends React.Component {
  render() {
    const ybbIcon = require('images/ybb-icon.png');
    const {
      agentType,
      account,
      main_user_name,
      company_name,
      time,
    } = this.props.home;
    return (
      <Col className={styles.accountInfoLineContainer} span={24}>
        <div className={styles.accountInfoLine}>
          <div className={styles.accountIcon}>
            <img alt="" src={ybbIcon} />
          </div>
          <div className={styles.accountInfo}>
            <div className={styles.info}>
              <span>Hi，{account}</span>
            </div>
            {(() => {
              return agentType === 4 ? (
                <div className={styles.welTime}>
                  <span>
                    主账户：{main_user_name}（{company_name}）欢迎来到女人通代理商平台，现在是{time}
                  </span>
                </div>
              ) : (
                <div className={styles.welTime}>
                  <span>欢迎来到女人通代理商平台，现在是{time}</span>
                </div>
              );
            })()}
          </div>
        </div>
      </Col>
    );
  }
}
