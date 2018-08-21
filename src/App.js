import React, { Component } from 'react';
import connect from './modules/connect'
import { withRouter } from 'react-router-dom'

import SpinLoaidng from './components/SpinLoading'

class App extends Component {

	state = {
		isLoading: false
	}

	componentWillReceiveProps (props) {

		let { pathname } = props.location
		if ( pathname !== this.props.location.pathname ) {
			this.checkLogin(props)
		}
}

	componentWillMount () {
		//进入项目获取登陆状态
		this.props.commons_actions.get_initial_state(() => {			
			this.checkLogin(this.props)
		})

		
		this.bus.on('change-loading', (bool) => {
			this.setState({ isLoading: !this.state.isLoading })
			this.setState({ isLoading: bool })
		})
	}


	checkLogin (props) {//登录判断函数
		
		let { commons, history } = this.props
		if ( props.location.pathname !== '/login' ) {
			if( !commons.user_state ){
				console.log(commons.user_state);
				props.history.replace('/login')
			}
		}
	}

	render() {
		let { isLoading } = this.state
		return (
		<div className="App">  
			{this.props.children}
			<SpinLoaidng loading = { isLoading } />
		</div> 
		);
	}
	}

export default withRouter(connect(App, 'commons'));

// ant-spin