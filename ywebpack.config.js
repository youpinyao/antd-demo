const path = require('path');
const fs = require('fs');
const aliOss = require('meetyou-ali-oss');
const lessToJs = require('less-vars-to-js');

const less = fs.readFileSync('./node_modules/meetyou-antd-base/src/less/vars.less', 'utf8');
const vars = lessToJs(less);

module.exports = {
  devtool: 'source-map',
  port: '8080',
  host: '0.0.0.0',
  path: 'dist',
  vendors: ['react', 'dva', 'antd', 'jquery', 'moment', 'js-cookie', 'babel-polyfill'],
  entrys: [{
    template: 'src/index.html',
    filename: 'index.html',
    entry: 'src/index.js',
  }],
  lessOptions: {
    modifyVars: vars,
  },
  // 需要同项目一起构建
  buildInclude: /(node_modules\/meetyou-antd-base)/,
  production: {
    publicPath: '//estatic.seeyouyima.com/my-dsp-agent-front/',
    extraBabelPlugins: [
      ['import', {
        libraryName: 'antd',
        style: true,
      }],
    ],
  },
  development: {
    publicPath: '/static/',
    extraBabelPlugins: [
      'dva-hmr', ['import', {
        libraryName: 'antd',
        style: true,
      }],
    ],
  },
  afterBuild() {
    // aliOss({
    //   deduplication: true,
    //   srcDir: './dist',
    //   ignoreSuffix: 'html',
    //   prefix: 'my-dsp-agent-front',
    // }).then(() => {
    //   // 上传成功
    //   console.log('ali oss 上传成功');
    // });
  },
  webpackMerge: {
    resolve: {
      alias: {
        antdes: path.resolve(__dirname, './node_modules/antd/es'),
        antdstyle: path.resolve(__dirname, './node_modules/antd/es/style'),
        less: path.resolve(__dirname, 'src/less'),
        images: path.resolve(__dirname, 'src/images'),
        utils: path.resolve(__dirname, 'src/utils'),
        urls: path.resolve(__dirname, 'src/utils/urls.js'),
        request: path.resolve(__dirname, 'src/utils/request.js'),
        services: path.resolve(__dirname, 'src/services'),
        components: path.resolve(__dirname, 'src/components'),
      },
    },
  },
};
