
import React, { Component } from 'react'
import './index.scss'
import connect from '../../modules/connect' 

import { List, Card,Icon, Button} from 'antd'
const { Meta } = Card;
const gridStyle = {
    width: '50%',
    textAlign: 'center',
    hoverable: true
  }

 

class Home extends Component {
    constructor(props) {
        super(props)
        this.get_user_state = this.get_user_state.bind(this)
    }
    state = {
        user_info: {},
        data : [
            'IDcard : '+ this.props.commons.user_state.IDcard,
            'College : ' + this.props.commons.user_state.college,
            'Education : ' + this.props.commons.user_state.education ,
            'Major : ' + this.props.commons.user_state.major,
            'Student ID : ' + this.props.commons.user_state.number,
          ]
    }
    get_user_state(){
        let user_info = this.props.commons_actions.get_initial_state(()=>{})
        this.setState({user_info: user_info.user_state})
        
    }
    componentWillMount() {
        this.get_user_state()
    }
    componentDidMount(){
        console.log(this);
    }

     

    render () {
       
        return (
            <div className = "app-home">
                <Card title="User Information">
                    <Card.Grid style={gridStyle}>
                        <Card
                            type = "inner"
                            style={{ width: 300 }}
                            cover={<img alt="" src={ this.state.user_info.icon } />}
                            actions={[<Icon type="check" />,]}
                        >
                            <Meta
                            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title="User_Info"
                            description= { <div>username: {this.state.user_info.username}<p>level:{this.state.user_info.level === 5 ? "student" : "teacher"}</p></div>  }
                            />
                        </Card>
                       
                    </Card.Grid>


                    <Card.Grid style={gridStyle}>

                        <div>
                            
                            <List
                            bordered = {false}
                            split = {false}
                            size="large"
                            header={<div style = {{color: '#333', fontWeight:'bold'}} >Detailed Information <Button style={{float:'right'}} type="primary" size="small" >changeInfo</Button> </div>}
                            dataSource={this.state.data}
                            renderItem={item => (<List.Item actions={[<a>...</a>]}>{item}</List.Item>)}
                            />

                        </div>
                    
                    </Card.Grid>
                    
                   
                </Card>,


            </div>
        )
    }

}

export default connect(Home, 'commons')