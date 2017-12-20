import React from 'react';
import { Modal, Alert, Form, InputNumber } from 'antd';

const FormItem = Form.Item;

class RechargeModal extends React.Component {
  render() {
    const dispatch = this.props.dispatch;
    const { visible, amount, loading } = this.props.account.rechargeModal;
    const {
      remain_currency_point_amount,
      remain_amount_ratio,
      remain_currency_point_ratio,
    } = this.props.appAccount;

    const { getFieldDecorator, validateFieldsAndScroll } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    function handleOk() {
      validateFieldsAndScroll((err, values) => {
        if (!err) {
          dispatch({
            type: 'account/doRecharge',
            payload: values,
          });
        }
      });
    }

    function handleCancel() {
      dispatch({
        type: 'account/oper_recharge',
        payload: {
          visible: false,
        },
      });
    }

    function inputNumberFormat(e) {
      if (!e && e !== 0) {
        return '';
      }

      if (isNaN(e)) {
        return '';
      }

      return parseInt(e, 10);
    }

    function amountChange(e) {
      dispatch({
        type: 'account/oper_recharge',
        payload: {
          amount: e,
        },
      });
    }

    function validatorAmount(rule, value, callback) {
      if (value > remain_currency_point_amount) {
        callback('划拨点数不能多于可分配消费点数');
      }
      callback();
    }

    return (
      <Modal
        title="划款"
        visible={visible}
        onOk={handleOk}
        width={400}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Alert message="请确认划拨金额无误，此操作不能修改。" type="warning" />
        <Form className="mt-30">
          <FormItem {...formItemLayout} label="可分配消费点数">
            {remain_currency_point_amount}
          </FormItem>
          <FormItem {...formItemLayout} label="划拨点数">
            {getFieldDecorator('amount', {
              initialValue: amount,
              rules: [
                {
                  required: true,
                  message: '请填写划拨点数',
                },
                {
                  validator: validatorAmount,
                },
              ],
            })(
              <InputNumber
                min={0}
                max={parseFloat(remain_currency_point_amount)}
                formatter={inputNumberFormat}
                style={{ width: '100%' }}
                onChange={amountChange}
              />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="划款金额">
            {(amount * remain_amount_ratio) / remain_currency_point_ratio
              ? (amount * remain_amount_ratio) / remain_currency_point_ratio
              : 0}元
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(RechargeModal);
