import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import classnames from 'classnames';
import { routerRedux } from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option;

export default class SearchBar extends React.Component {
  render() {
    const { userStateTypes, searchParams } = this.props.account;
    const dispatch = this.props.dispatch;

    function selectState(e) {
      dispatch({
        type: 'account/updateSearchParams',
        payload: {
          state: parseInt(e, 10),
        },
      });
    }

    function inputName(e) {
      dispatch({
        type: 'account/updateSearchParams',
        payload: {
          name: e.target.value,
        },
      });
    }

    function doSearch() {
      dispatch({
        type: 'account/queryTable',
        payload: {},
      });
    }

    function doExport() {
      dispatch({
        type: 'account/export',
      });
    }

    function addAccount() {
      dispatch(
        routerRedux.push({
          pathname: 'account/add',
        }),
      );
    }

    return (
      <Form className={classnames('clearfix', this.props.className)}>
        <FormItem label="女人通账户" className="ant-col-6">
          <Input
            value={searchParams.name}
            onChange={inputName}
            onPressEnter={doSearch}
            placeholder="公司名/用户名"
          />
        </FormItem>
        <FormItem label="账户状态" className="ant-col-6 ml-20">
          <Select value={`${searchParams.state}`} onChange={selectState}>
            {userStateTypes.map((item) => {
              return (
                <Option key={`${item.value}`} value={`${item.value}`}>
                  {item.text}
                </Option>
              );
            })}
          </Select>
        </FormItem>
        <FormItem className="ant-col-3 ml-20">
          <Button type="primary" onClick={doSearch}>
            搜索
          </Button>
        </FormItem>
        <FormItem className="fr right">
          <Button type="primary" onClick={addAccount}>创建账户</Button>
          <Button type="primary" className="ml-20" onClick={doExport}>
            导出数据
          </Button>
        </FormItem>
      </Form>
    );
  }
}
