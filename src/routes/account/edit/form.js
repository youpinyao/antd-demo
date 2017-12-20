import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Radio, Select, Upload, Button, message } from 'antd';
import {
  ImageUpload,
} from 'meetyou-antd-base';
import classnames from 'classnames';

import * as rules from 'utils/rules/index';
import * as urls from 'utils/urls';

import styles from './index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_type_state: this.props.accountEdit.form.user_type,
      telephoneVlidate: {
        fields: {},
        validateStatus: 'success',
        help: undefined,
      },
    };
  }
  render() {
    const dispatch = this.props.dispatch;
    const { getFieldDecorator, validateFieldsAndScroll, resetFields } = this.props.form;
    const onInit = this.props.onInit;
    const { industryItems, provinceItems, cityItems } = this.props.accountEdit;
    const { user_qulification_number } = this.props.appAccount;
    const user_type_state = this.state.user_type_state;
    const telephoneVlidate = this.state.telephoneVlidate;
    const {
      user_name,
      password,
      confirm_password,
      real_name,
      home_url,
      licence_sn,
      licence_pic,
      id_pic_front,
      id_pic_back,
      email,
      telephone_code,
      telephone,
      cellphone,
      province,
      city,
      address,
      industry,
      industry_licence,
      user_id,
      user_type,
    } = this.props.accountEdit.form;
    const everCheck = this.props.accountEdit.form.was_agreed === 1;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    const onUserTypeChange = (e) => {
      this.setState({
        user_type_state: e.target.value,
      });
    };

    // 如果user_type 有变动
    if (user_type !== user_type_state) {
      setTimeout(() => {
        onUserTypeChange({
          target: {
            value: user_type,
          },
        });
      });
    }

    const validateTelephone = (type, e) => {
      rules.number[0].validator(undefined, e.target.value, (help) => {
        const fields = telephoneVlidate.fields;

        let validateStatus = 'success';
        let helpMessage = undefined;

        fields[type] = {
          validateStatus: help ? 'error' : 'success',
          help,
        };

        Object.keys(fields).forEach((key) => {
          if (fields[key].validateStatus === 'error') {
            validateStatus = fields[key].validateStatus;
            helpMessage = fields[key].help;
          }
        });

        this.setState({
          telephoneVlidate: {
            fields,
            validateStatus,
            help: helpMessage,
          },
        });
      });
      return e.target.value;
    };

    function provinceChange(e) {
      dispatch({
        type: 'accountEdit/resetCity',
      });
      dispatch({
        type: 'accountEdit/updateCity',
        payload: e,
      });
    }

    function normFile(e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    }

    onInit(validateFieldsAndScroll, resetFields);

    return (
      <Form className={classnames(styles.form, 'pt-20')}>
        <FormItem
          {...formItemLayout}
          label="用户名"
          extra="长度为3-20个字符，可使用字母、数字、下划线任意组合，不可含特殊字符"
        >
          {getFieldDecorator('user_name', {
            initialValue: user_name,
            validateFirst: true,
            rules: rules.required('请输入用户名').concat(rules.user_name(user_name)),
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="登录密码"
          extra="长度为6-16个字符，不能包含空格，不能是9位以下纯数字"
        >
          {getFieldDecorator('password', {
            initialValue: password,
            validateFirst: true,
            rules: rules.required('请输入登录密码').concat(rules.password),
          })(<Input type="password" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="确认密码" extra="与登录密码保持一致">
          {getFieldDecorator('confirm_password', {
            initialValue: confirm_password,
            validateFirst: true,
            rules: rules.required().concat([
              {
                validator: (rule, value, callback) => {
                  if (value !== this.props.form.getFieldValue('password')) {
                    callback('与登录密码保持一致');
                  } else {
                    callback();
                  }
                },
              },
            ]),
          })(<Input type="password" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="公司类型" extra="企业用户可获得更多功能及权限">
          {getFieldDecorator('user_type', {
            initialValue: user_type,
            validateFirst: true,
            rules: rules.required(),
          })(
            <RadioGroup className={styles.w240} onChange={onUserTypeChange}>
              {/* <Radio value={1} disabled={!!user_id}>
                个人
              </Radio> */}
              <Radio value={2} disabled={!!user_id}>
                企业
              </Radio>
            </RadioGroup>,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="公司名" extra="公司名称">
          {getFieldDecorator('real_name', {
            initialValue: real_name,
            validateFirst: true,
            rules: rules.required('请输入姓名或公司名'),
          })(<Input disabled={everCheck} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="推广域名" extra="需推广的主域名">
          {getFieldDecorator('home_url', {
            initialValue: home_url,
            validateFirst: true,
            rules: rules.required('请输入推广的域名').concat(rules.url),
          })(<Input />)}
        </FormItem>

        {(() => {
          return user_type_state === 1 ? (
            <FormItem
              {...formItemLayout}
              label={<div>&nbsp;</div>}
              colon={false}
              extra="双手持身份证，手指不可遮挡身份证信息，照片需免冠，建议未化妆，五官清晰可见，照片内容真实有效，不得做任何修改，支持的图片格式包括：JPG、JPEG、PNG；图片在 5M 以内。"
            >
              {getFieldDecorator('id_pic_front', {
                initialValue: id_pic_front,
                rules: rules.required('请上传手持身份证正面照'),
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              })(
                <ImageUpload
                  className={styles.avatarUploader}
                  action={urls.upload}
                  data={{
                    image_style: 6,
                  }}
                  text={
                    <span>
                      点击上传<br />手持身份证正面照
                    </span>
                  }
                />,
              )}
            </FormItem>
          ) : (
            ''
          );
        })()}

        {(() => {
          return user_type_state === 1 ? (
            <FormItem {...formItemLayout} label={<div>&nbsp;</div>} colon={false}>
              {getFieldDecorator('id_pic_back', {
                initialValue: id_pic_back,
                rules: rules.required('请上传手持身份证背面照'),
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              })(
                <ImageUpload
                  className={styles.avatarUploader}
                  action={urls.upload}
                  data={{
                    image_style: 6,
                  }}
                  text={
                    <span>
                      点击上传<br />手持身份证背面照
                    </span>
                  }
                />,
              )}
            </FormItem>
          ) : (
            ''
          );
        })()}

        {(() => {
          return user_type_state === 2 ? (
            <FormItem {...formItemLayout} label="营业执照" extra="营业执照编号">
              {getFieldDecorator('licence_sn', {
                initialValue: licence_sn,
                validateFirst: true,
                rules: rules.required('请输入营业执照编号').concat(rules.licence_sn),
              })(<Input />)}
            </FormItem>
          ) : (
            ''
          );
        })()}

        {(() => {
          return user_type_state === 2 ? (
            <FormItem
              {...formItemLayout}
              label={<div>&nbsp;</div>}
              colon={false}
              extra="图片上传要求：支持的图片格式包括：JPG、JPEG、PNG；图片在 5M 以内；图片光线良好，正常曝光，无软件处理，无剪裁；图像清晰可辨认（摆放端正、无截断、文件占80%图片）；图像内容易读取（无大片阴影、无强烈反光点、无白平衡失调）"
            >
              {getFieldDecorator('licence_pic', {
                initialValue: licence_pic,
                rules: rules.required('请上传营业执照'),
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              })(
                <ImageUpload
                  className={styles.avatarUploader}
                  action={urls.upload}
                  data={{
                    image_style: 6,
                  }}
                  text={
                    <span>
                      点击上传<br />营业执照
                    </span>
                  }
                />,
              )}
            </FormItem>
          ) : (
            ''
          );
        })()}
        <FormItem {...formItemLayout} label="电子邮箱" extra="用于找回密码及收取消息">
          {getFieldDecorator('email', {
            initialValue: email,
            validateFirst: true,
            rules: rules.required('请输入邮箱地址').concat(rules.email),
          })(<Input disabled={everCheck} />)}
        </FormItem>

        <FormItem
          {...formItemLayout}
          validateStatus={telephoneVlidate.validateStatus}
          help={telephoneVlidate.help}
          label="座机"
          extra="选填字段，便于联系"
        >
          <div className="fl">
            {getFieldDecorator('telephone_code', {
              initialValue: telephone_code,
              validateFirst: true,
              rules: rules.number,
              getValueFromEvent: e => validateTelephone('telephone_code', e),
            })(
              <Input
                maxLength="4"
                style={{
                  width: 240 * 0.36,
                }}
              />,
            )}
            <span
              style={{
                width: 240 * 0.08,
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              -
            </span>
            {getFieldDecorator('telephone', {
              initialValue: telephone,
              validateFirst: true,
              rules: rules.number,
              getValueFromEvent: e => validateTelephone('telephone', e),
            })(
              <Input
                maxLength="14"
                style={{
                  width: 240 * 0.56,
                }}
              />,
            )}
          </div>
        </FormItem>

        <FormItem {...formItemLayout} label="手机" extra="选填字段，便于联系">
          {getFieldDecorator('cellphone', {
            initialValue: cellphone,
            validateFirst: true,
            rules: rules.phone,
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="所属区域" extra="公司所属行政区域">
          <div className="fl">
            {getFieldDecorator('province', {
              initialValue: province,
              validateFirst: true,
            })(
              <Select
                onChange={provinceChange}
                style={{
                  width: 240 * 0.46,
                }}
              >
                {provinceItems.map((item, index) => {
                  return (
                    <Option key={index} value={item.value}>
                      {item.text}
                    </Option>
                  );
                })}
              </Select>,
            )}
            <span
              style={{
                width: 240 * 0.08,
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              -
            </span>
            {getFieldDecorator('city', {
              initialValue: city,
              validateFirst: true,
            })(
              <Select
                style={{
                  width: 240 * 0.46,
                }}
              >
                {cityItems.map((item, index) => {
                  return (
                    <Option key={index} value={item.value}>
                      {item.text}
                    </Option>
                  );
                })}
              </Select>,
            )}
          </div>
        </FormItem>

        <FormItem {...formItemLayout} label="详细地址" extra="可收发邮政快递的详细地址">
          {getFieldDecorator('address', {
            initialValue: address,
            validateFirst: true,
          })(<Input.TextArea maxLength="255" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="行业" extra="您的产品与服务所处行业">
          {getFieldDecorator('industry', {
            initialValue: industry,
            validateFirst: true,
            rules: rules.required(),
          })(
            <Select disabled={everCheck}>
              {industryItems.map((item, index) => {
                return (
                  <Option key={index} value={item.value}>
                    {item.text}
                  </Option>
                );
              })}
            </Select>,
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="行业资质证明"
          extra={
            <span>
              <a href="./license" target="_blank" style={{ textDecoration: 'underline' }}>
                相关行业资质证明说明文档
              </a>；支持的上传格式包括：JPG、JPEG、PNG、PDF；图片在 5M
              以内；图片光线良好，正常曝光，无软件处理，无剪裁；图像清晰可辨认（摆放端正、无截断、文件占80%图片）；图像内容易读取（无大片阴影、无强烈反光点、无白平衡失调）
            </span>
          }
        >
          {getFieldDecorator('industry_licence', {
            initialValue: industry_licence,
            validateFirst: true,
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          })(
            <Upload
              accept="image/jpeg,image/jpg,image/png,image/jpeg,application/pdf"
              action={urls.upload}
              className={styles.antUploadWithTextList}
              showUploadList
              listType="text"
              beforeUpload={(file) => {
                const isValid = /(jpg|jpeg|png|pdf)$/g.test(file.type);
                if (!isValid) {
                  message.error('请上传正确的文件格式，仅接受如下格式：jpg、jpeg、png、pdf。');
                  return false;
                }
                if (industry_licence.length >= user_qulification_number) {
                  message.error(`最多只能上传${user_qulification_number}张行业资质证明`);
                  return false;
                }
                return true;
              }}
            >
              <Button type="primary">上传文件</Button>
            </Upload>,
          )}
        </FormItem>
      </Form>
    );
  }
}

AccountForm.propTypes = {
  onInit: PropTypes.func,
};
AccountForm.defaultPropTypes = {
  onInit() {},
};
export default Form.create()(AccountForm);
