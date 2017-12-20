import React from 'react';
import { withRouter } from 'dva/router';
import { connect } from 'dva';
import { Layout, Menu } from 'antd';
import {
  RootLayout,
} from 'meetyou-antd-base';
import styles from './app.less';

const { Header, Content } = Layout;

class App extends React.Component {
  render() {
    const { app: { selectedMenu, contentMinHeight, contentEl, user_name }, dispatch } = this.props;
    const logoSrc = require('images/logo-1.png');
    const ybbIcon = require('images/ybb-icon.png');
    const selectedMenuKeys = [selectedMenu ? selectedMenu.key : undefined];

    const contentStyle = {
      minHeight: contentMinHeight,
    };

    function onSelect(key) {
      dispatch({
        type: 'app/selectMenu',
        payload: key,
      });
    }

    function setContentElement(el) {
      if (contentEl) {
        return;
      }
      dispatch({
        type: 'app/updateContentMinHeight',
        payload: el,
      });
    }

    function logout() {
      dispatch({
        type: 'app/logout',
      });
    }

    return (
      <RootLayout className={styles.layout}>
        <Header className={styles.header}>
          <div className={styles.logo}>
            <img alt="" src={logoSrc} />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedMenuKeys}
            defaultSelectedKeys={selectedMenuKeys}
            onSelect={({ key }) => onSelect(key)}
            className={styles.menu}
          >
            {this.props.app.menus.map((menu) => {
              return <Menu.Item key={menu.key}>{menu.name}</Menu.Item>;
            })}
          </Menu>
          <div className={styles.info}>
            <img className="head" src={ybbIcon} alt="" />
            <span>{user_name}</span> | <a onClick={logout} href="javascript:void(0)">退出后台</a>
          </div>
        </Header>
        <Content className={styles.content} style={contentStyle} id="mainContent" ref={el => setContentElement(el)}>
          {this.props.children}
        </Content>
      </RootLayout>
    );
  }
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App));
