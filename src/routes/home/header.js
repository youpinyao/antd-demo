import React from 'react';
import {
  Col,
} from 'antd';

export default class Header extends React.Component {
  render() {
    const {
      task_switch,
      task_type,
      agent_subuser_count,
      today_consume_amount,
      remain_real_amount,
      point_month_amount,
    } = this.props.account;

    const { accountManager } = this.props.permissions;

    const taskType = { 2: '季度', 1: '年度', 3: '月' }[task_type];

    return (
      <Col span={24}>
        <div className="account-data-line-container">
          <div className="account-data-line">
            <div className="ant-col-8">
              <div className="data-line">
                <div className="data-content-line">
                  <div className="data-content">
                    <span className="data-title">有效推广账户数</span>
                    {(() => {
                      if (accountManager) {
                        return (
                          <a className="data" href="#/account/2">
                            {agent_subuser_count}
                          </a>
                        );
                      } else {
                        return (
                          <a className="data" href="javascript:void(0)">
                            {agent_subuser_count}
                          </a>
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>
            <div className="ant-col-8">
              <div className="data-line">
                <div className="data-content-line">
                  <div className="data-content">
                    <span className="data-title">今日消费（元）</span>
                    <span className="data">{today_consume_amount}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ant-col-8">
              <div className="data-line">
                <div className="data-content-line">
                  <div className="data-content">
                    <span className="data-title">现金余额（元）</span>
                    <span className="data">{remain_real_amount}</span>
                  </div>
                </div>
              </div>
            </div>
            {(() => {
              if (task_switch === 1) {
                return (
                  <div className="ant-col-8">
                    <div className="data-line">
                      <div className="data-content-line">
                        <div className="data-content">
                          <span className="data-title">{taskType}任务完成度（万元）</span>
                          <span className="data">{point_month_amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return '';
              }
            })()}
          </div>
        </div>
      </Col>
    );
  }
}
