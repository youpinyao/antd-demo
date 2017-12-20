import React from 'react';
import { Col, Button } from 'antd';
import { routerRedux } from 'dva/router';

export default class Header extends React.Component {
  render() {
    const dispatch = this.props.dispatch;
    const {
      remain_currency_point_ratio,
      remain_amount_ratio,
      remain_currency_point_amount,
      pay_switch,
      remain_real_amount,
    } = this.props.appAccount;

    const {
      agentType,
      remain_amount_remind,
      subuser_remain_amount,
      agent_remain_amount,
    } = this.props.account;

    const data21 = remain_currency_point_amount * remain_amount_ratio;
    const data211 = data21 / (remain_currency_point_ratio || 1);

    function linkToCharge() {
      dispatch(
        routerRedux.push({
          pathname: 'financialManagement-recharge',
        }),
      );
    }

    return (() => {
      return agentType !== 4 ? (
        <div className="account-data-line">
          <Col span={8}>
            <div className="data-line">
              <div className="data-content-line">
                <div className="data-content">
                  <span className="data-title">账户总余额（元）</span>
                  <span className="data">{agent_remain_amount}</span>
                  <span className="data-2">
                    <span>现金部分：</span>
                    {remain_real_amount}
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="data-line">
              <div className="data-content-line">
                <div className="data-content">
                  <span className="data-title">
                    可分配消费点（{remain_currency_point_ratio}点={remain_amount_ratio}元）
                  </span>
                  <span className="data">{remain_currency_point_amount}</span>
                  <span className="data-2">{data211}元</span>
                  {(() => {
                    if (remain_amount_remind === true && pay_switch === 1) {
                      return (
                        <div className="clearfix" style={{ display: 'block' }}>
                          <Button className="mt-10 fl" onClick={linkToCharge}>
                            充值
                          </Button>
                        </div>
                      );
                    } else {
                      return '';
                    }
                  })()}
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="data-line">
              <div className="data-content-line">
                <div className="data-content">
                  <span className="data-title">推广账户余额（元）</span>
                  <span className="data">{subuser_remain_amount}</span>
                </div>
              </div>
            </div>
          </Col>
        </div>
      ) : (
        ''
      );
    })();
  }
}
