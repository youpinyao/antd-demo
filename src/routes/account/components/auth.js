import React from 'react';
import { Modal, Form, Checkbox } from 'antd';

const FormItem = Form.Item;

class AuthModal extends React.Component {
  render() {
    const dispatch = this.props.dispatch;
    const { visible, range_quantity_switch, loading, real_name } = this.props.account.authModal;

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
            type: 'account/doSwitchAuth',
            payload: values,
          });
        }
      });
    }

    function handleCancel() {
      dispatch({
        type: 'account/oper_auth',
        payload: {
          visible: false,
        },
      });
    }

    function onChange(e) {
      console.log(e);
      dispatch({
        type: 'account/oper_auth',
        payload: {
          range_quantity_switch: e.target.checked,
        },
      });
    }

    return (
      <Modal
        title="权限"
        visible={visible}
        onOk={handleOk}
        width={400}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form className="mt-30">
          <FormItem {...formItemLayout} label="推广账户">
            {real_name}
          </FormItem>
          <FormItem {...formItemLayout} label="划拨点数">
            {getFieldDecorator('range_quantity_switch', {
              initialValue: range_quantity_switch,
              valuePropName: 'checked',
            })(
              <Checkbox onChange={onChange}>展示“广告受众覆盖量”</Checkbox>,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AuthModal);
