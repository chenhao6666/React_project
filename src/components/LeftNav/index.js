
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {  Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
class LeftNav extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            openKeys: [this.getOpenKey()]
        }

        this.renderMenu = this.renderMenu.bind(this)
        this.getOpenKey = this.getOpenKey.bind(this)
        this.handleMenuClick = this.handleMenuClick.bind(this)
        this.handleTitleClick = this.handleTitleClick.bind(this)
    }
    handleMenuClick ( {item , key, keypath} ) {
        this.props.history.push(key)
    }
    handleTitleClick ({key}) {
        console.log(key);
        this.setState({ openKeys: [key] })
    }


    renderMenu() {
        let { menu_config } = this.props
        if ( !menu_config ) return ''
        return  <Menu theme="light"  mode="inline"  onClick = {this.handleMenuClick} openKeys = {this.state.openKeys} selectedKeys={[this.props.location.pathname]}>  
                { menu_config.map(menu => {
                    if( menu.children && menu.children.length ){
                        return(
                             <SubMenu
                                onTitleClick = { this.handleTitleClick }
                                key= {menu.path}
                                title={<span><Icon type={ menu.icon } /><span>{menu.title}</span></span>}
                            >
                                { menu.children.map(m => (
                                    <Menu.Item key={m.path}> <Icon type= { m.icon } />{m.title}</Menu.Item>
                                )) }
                            </SubMenu>
                        )  
                    }  
                     return (<Menu.Item key={menu.path}>
                                    <Icon type="pie-chart" />
                                    <span>{menu.title}</span>
                                </Menu.Item>)                      
                }) 
            }         
                </Menu>
    }   

    getOpenKey () {
        let { pathname } = this.props.location
        let { menu_config } = this.props
        if ( !menu_config ) return '/'
        for (let i = 0; i < menu_config.length; i++) {
            if (menu_config[i].children) {
                for (let j = 0; j < menu_config[i].children.length; j++) {
                    if ( menu_config[i].children[j].path === pathname ) {
                        return menu_config[i].path
                    }                 
                }
            }
        }
        
    }

    render() {
        return (
            <div className = "left-nav">
                { this.renderMenu() }
            </div> 
        );
    }
}

export default withRouter(LeftNav);