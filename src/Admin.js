import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Icon, Button, message } from 'antd';

import connect from './modules/connect'
import LeftNav from './components/LeftNav'
import BreadCrumb from './components/BreadCrumb'
import { withRouter } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

const warning = () => {
    message.warning('Not Permission',1);
};
const success = () => {
    message.success(' do not do that ',1);
  };
 
class Admin extends Component {

    constructor(props){
        super(props)
        this.changeInfo = this.changeInfo.bind(this)
        this.exit = this.exit.bind(this)
    }

    state = {
        collapsed: false,
        username: this.props.commons.user_state.username
    };
    checkPermission(type) {//检查权限
        let { permission } = this.props.commons.user_state 
        return permission.some( item => item === type )
    }
    changeInfo () {//修改信息
        let can = this.checkPermission( 'modify_info' )
        if ( !can ) {
            warning();return false;
        }
        success();
    }

    exit(){//退出登录
        sessionStorage.removeItem('user_state')
        this.props.history.replace('/login')
    }

    componentDidMount () {
        if ( !this.props.commons.menu_config ) {
            this.props.commons_actions.get_menu_config()
        }
    }
    
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        let  menu = (
            <Menu>
              <Menu.Item key="0">
                <a onClick = {this.changeInfo}>change_information</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a onClick = {this.exit} > exit </a>
              </Menu.Item>
            </Menu>
          )
        return (
            <div className = "adminPage">
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        style={{ background: '#f5f5f5', padding: 0 }}
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo" >
                            <img src= "/images/login/logo.png" alt=""/>
                        </div>
                      <LeftNav  menu_config = { this.props.commons.menu_config } />
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }} >
                            <Dropdown overlay={menu}>
                                <Button style={{ marginLeft: 8 }}>
                                    {this.state.username}
                                    <Icon type="down" />
                                </Button>
                            </Dropdown>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <BreadCrumb menu_config = { this.props.commons.menu_config } />
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                { this.props.children }
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            A Sigle React Application of studentOA ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default withRouter(connect(Admin, 'commons'));

// connect(Admin, 'commons')
 