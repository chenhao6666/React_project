
import React, { Component } from 'react'
import connect from '../../modules/connect'
import './index.scss'

import { Form, Input, Button, Radio, Icon, DatePicker, Table  } from 'antd';

import moment, { lang } from 'moment'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;



class Leave extends Component {
    
    constructor(props) {
        super(props);
        this.state = {formLayout: 'horizontal', }
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.goback = this.goback.bind(this)
      }

      state = {
            
            username:"",
            date:[],
            textarea: ""
      }
    
    onChange(dates, dateStrings){//时间获取
        this.setState({ date: dateStrings })
    }

    

    handleSubmit(){//表单数据获取
        let textArea = this.textarea.value
        this.setState({textarea: textArea})
        this.setState({username: this.props.commons.user_state.username})   

    }

    goback(){
        this.props.history.replace('/')
    }
   
    render () {
        let { username } = this.props.commons.user_state
        
        const { formLayout } = this.state;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 4,color: 'red' },
            wrapperCol: { span: 14 },
        } : null;
        const buttonItemLayout = formLayout === 'horizontal' ? {
            wrapperCol: { span: 14, offset: 4 },
        } : null

        return (
            <div className = "app-leave">
                
                <Form layout={formLayout} >
                    
                    <FormItem
                        label="Username : "
                        {...formItemLayout}
                    >
                        <Input defaultValue= {username} style={{width: 100, backgroundColor: '#f5f5f5'}} disabled/>
                    </FormItem>
                    <FormItem
                        label="Leave Reason"
                        {...formItemLayout}
                    >
                        <textarea  ref = { el => this.textarea = el }  placeholder="input Leave Reason" style={{width:400}}/>
                    </FormItem>
                    <FormItem
                        label="Leave Time"
                        {...formItemLayout}
                    >   
                        <RangePicker
                            ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            onChange={this.onChange}
                        />
                    </FormItem>
                    <FormItem {...buttonItemLayout} style ={{paddingLeft:50,paddingRight:50}} >
                        <Button onClick = {this.handleSubmit} type="primary" style = {{marginRight:20}}> <Icon type="check" /> Apply</Button>
                        <Button onClick = {this.goback} type="primary" style = {{marginRight:20}}> <Icon type="reload" /> Return</Button>
                    </FormItem>
                </Form>

                <DataTable  data = {this.state }/>
            </div>
        )
    }

}


class DataTable extends Component   {
    constructor(props){
        super(props)
        this.get_time = this.get_time.bind(this)
    }

  
    shouldComponentUpdate(nextProps, nextState) {
        if(!nextProps.data.username) return false
        return true
    }
    get_time(){
        if (!this.props.data.textarea) return false
        return this.props.data.date[0] +'---'+ this.props.data.date[1]
    }
    render() {
        let username = this.props.data.username
        let LeaveReason = this.props.data.textarea

        const columns = [{
            title: 'Name',
            dataIndex: 'Name',
            }, {
            title: 'LeaveReason',
            dataIndex: 'LeaveReason',
            }, {
            title: 'Time',
            dataIndex: 'Time',
        }]
        
        const data = [{
            key: '1',
            Name: username,
            LeaveReason: LeaveReason,
            Time: this.get_time(),
          
        }]


        return (
            <div>
                
                <div>
                    <Table pagination={false} columns={columns} dataSource={data} size="small" />
                </div>


            </div>
        );
    }
}




export default   connect(Leave, 'commons')