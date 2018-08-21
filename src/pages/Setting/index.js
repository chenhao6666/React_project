
import React, { Component } from 'react'
import{ Button } from 'antd'
import './index.scss'

class Setting extends Component {
    constructor(props){
        super(props)
    }
    handler() {
        console.log(666);
    }

    componentWillReceivePorps(){
        console.log('进入setting');
    }
    render () {
        
        return (
            <div className = "app-setting">
                <Button type= "default" value = "6666" icon = "home">6656</Button>
            </div>
        )
    }

}


export default Setting