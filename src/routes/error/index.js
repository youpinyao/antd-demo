import React from 'react';
import styles from './index.less';

class Error extends React.Component {

  render() {
    const img = require('images/404.png');

    return (
      <div className={styles.errorPage}>
        <div className={styles.errorArticle}>
          <img src={img} alt="404" />
          <p>页面不存在或已被删除</p>
        </div>
      </div>
    );
  }
}

export default Error;
