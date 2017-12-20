import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, routerRedux } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import App from './routes/app';

const { ConnectedRouter } = routerRedux;

const Routers = ({ history, app }) => {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  });
  const routes = [
    {
      path: '/home',
      models: () => [import('./models/home')],
      component: () => import('./routes/home/'),
    },
    {
      path: '/account',
      models: () => [import('./models/account')],
      component: () => import('./routes/account/'),
    },
    {
      path: '/account/:state',
      models: () => [import('./models/account')],
      component: () => import('./routes/account/'),
    },
    {
      path: '/account/edit/:id',
      models: () => [import('./models/account-edit')],
      component: () => import('./routes/account/edit'),
    },
    {
      path: '/account/add',
      models: () => [import('./models/account-edit')],
      component: () => import('./routes/account/edit'),
    },
    {
      path: '/coworker-list',
      models: () => [import('./models/coworker-list')],
      component: () => import('./routes/coworker-list/'),
    },
  ];

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <App>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            {routes.map(({ path, ...dynamics }, key) => (
              <Route
                key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))}
            <Route component={error} />
          </Switch>
        </App>
      </LocaleProvider>
    </ConnectedRouter>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;
