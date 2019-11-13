import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import './asset/css/public.scss'
import { Layout, Menu, Icon, Tooltip, Modal } from 'antd';
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/zh-cn';
import routes from './router';
import store from  './store';
import actionCreator from './store/actionCreator';
moment.locale('zh-cn');


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { confirm } = Modal;

let backToBverall = () => {
  confirm({
    title: '提示!',
    content: '即将关闭页面返回总后台',
    centered: true,
    onOk() {
      window.location.href="https://test.xuanwovip.com/admin/shop?route=survey.survey.index&uniacid=2"
    },
    onCancel() {},
  });
};

let menuSelect = (val) => {
  let selectKey = val.key;
  window.sessionStorage.setItem('selectKey',selectKey)
};

let OpenChange = (val) => {
  let subState = JSON.stringify(val);
  window.sessionStorage.setItem('subState',subState)
};

let getToken = () => {
  let token = window.location.href.split('=')[1];
  let hasToken =  window.localStorage.getItem('token');
  if(hasToken !== token) {
    window.localStorage.setItem('token',token);
    store.dispatch(actionCreator.storeToken(token));
  }
};

let checkPermissions = () => {
  console.log('这是token',store.getState().token);
  return React.$axiosPost('datamontior.data-monitor.check',{
    token: store.getState().token
  }).then(response => {
    if (response.data.code === 401) {
      store.dispatch(actionCreator.getCode(401));
      window.localStorage.removeItem('token');
      confirm({
        title: '提示!',
        content: '你没有权限访问此页面',
        centered: true,
        onOk() {
          window.location.href="https://test.xuanwovip.com/admin/shop?route=survey.survey.index&uniacid=2"
        },
        onCancel() {
          window.location.href="https://test.xuanwovip.com/admin/shop?route=survey.survey.index&uniacid=2"
        },
      });
    }else if (response.data.code === 200) {
      store.dispatch(actionCreator.getCode(200))
    }
  });
};

function App() {
  const [state] = React.useState({
    subState: JSON.parse(window.sessionStorage.getItem('subState')) || ['sub1'],
    selectKey: window.sessionStorage.getItem('selectKey') || ['1']
  });
  getToken();
  return (
    <div className="App">
      <Router>
        <Layout style={{height:'100%'}}>
          <Header className="header">
            <div className="logo" >
              <Tooltip title="退出到总后台">
                <Icon type="logout" onClick={backToBverall} style={{transform:'rotate(180deg)'}}/>
              </Tooltip>
            </div>
            <h2 style={{color:'#ffffff'}}>炫窝荣耀数据监控中心</h2>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                  mode="inline"
                  defaultSelectedKeys={state.selectKey}
                  defaultOpenKeys={state.subState}
                  style={{ height: '100%', borderRight: 0 }}
                  onSelect={menuSelect}
                  onOpenChange={OpenChange}
              >
                <SubMenu
                    key="sub1"
                    title={
                      <span>
                  <Icon type="pie-chart" theme="filled" />
                  数据总览
                </span>
                    }
                >
                  <Menu.Item key="1">
                    <Link to="/">实时数据</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                      <span>
                  <Icon type="fund" theme="filled" />
                  用户分析
                </span>
                    }
                >
                  <Menu.Item key="5">
                    <Link to="/userTrajectory">实时用户轨迹</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to='/userData'>新老用户</Link>
                  </Menu.Item>
                  <Menu.Item key="7">
                    <Link to="/userPortrait">用户画像</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub3"
                    title={
                      <span>
                  <Icon type="code" theme="filled" />
                  客户端分析
                </span>
                    }
                >
                  <Menu.Item key="9">
                    <Link to='/regionalAnalysis'>区域</Link>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <Link to="/terminalInformation">终端信息</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={
                      <span>
                  <Icon type="file-text" theme="filled" />
                  页面分析
                </span>
                    }
                >
                  <Menu.Item key="11">
                    <Link to="/pageRanking">页面排行</Link>
                  </Menu.Item>
                  <Menu.Item key="12">
                    <Link to="/heatMapAnalysis">热图分析</Link>
                  </Menu.Item>
                  <Menu.Item key="13  ">
                    <Link to="/pageDepth">访问深度</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: '16px' }}>
              <Content
                  style={{
                    background: '#fff',
                    padding: 16,
                    margin: 0,
                    minHeight: 280,
                    height: '100%',
                    overflowY: 'auto'
                  }}
              >
                <Switch>
                {
                  routes.map((router, index) => {
                    if(router.exact) {
                      return <Route exact key={index} path={router.path}
                        render = {
                          props => {
                            checkPermissions();
                            if(store.getState().code === 200) {
                              return <router.component {...props} routes={router.routes}/>
                            }
                          }
                        }
                      />
                    }else {
                      return <Route key={index} path={router.path}
                        render = {
                          props => {
                            checkPermissions();
                            if(store.getState().code === 200) {
                              return <router.component {...props} routes={router.routes}/>
                            }
                          }
                        }
                      />
                    }
                  })
                }
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
