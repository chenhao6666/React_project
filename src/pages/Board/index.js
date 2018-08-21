
import React, { Component } from 'react'
import { Table, message, Button, Select, Divider, Icon, Modal, Input,  } from 'antd';
import connect from '../../modules/connect' 
import './index.scss'
const { TextArea } = Input
const Option = Select.Option;
    



class Board extends Component {

    constructor(props) {
        super(props)

        this.searchChange = this.searchChange.bind(this)
        this.checkDetail = this.checkDetail.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.deleteBoard = this.deleteBoard.bind(this)
        this.createBoard = this.createBoard.bind(this)
        this.submitCreateBoard = this.submitCreateBoard.bind(this)
    }

    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        data: [],
        types: [],
        check_data: {},
        modal_visible: false,
        columns: [{
                title: 'Title',
                dataIndex: 'title',
            }, {
                title: 'Content',
                dataIndex: 'content',
            }, {
                title: 'Type',
                dataIndex: 'type',
            },{
                title: 'Action',
                key: 'action',
                render: (text, record) => {
                    return (        
                        <span>
                            <a href="javascript:;">Change</a>
                            <Divider type="vertical" />
                            <a onClick = { this.deleteBoard.bind( null,record.id) } href="javascript:;">Delete</a>
                            <Divider type="vertical" />
                            <a onClick = { this.checkDetail.bind( null,record.id ) } href="javascript:;" className="ant-dropdown-link">
                                Check
                            </a>
                        </span>
                      )
                },
              }]
    }
    toggleModal () { //控制弹出框出现
        this.setState({ modal_visible: !this.state.modal_visible })
    }
    checkDetail(id) {//查看详情
        for (var i = 0; i < this.state.data.length; i++) {
            let item = this.state.data[i];
            if( item.id === id ){
                this.setState( { check_data: item })
                break;
            }
        }
        this.toggleModal()
    }

    getDate(type_id = 0) {//获取数据
        this.$http.ajax({
            url: '/api/board-' + type_id + '.json'
        }).then(data => {
            this.setState( {data: data.boardlist.map(item => {
                item.key = item.id
                return item
            })} )
        })

    }

    getType() {//获取类型
        this.$http.ajax({
            url: '/api/board-types.json'
        }).then(data => {
            this.setState( { types: data.boardtypes } )
        })
    }

    componentDidMount() {//执行相关函数
        this.getDate()
        this.getType()
    }

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
            selectedRowKeys: [],
            loading: false,
            });
        }, 1000);
    }

    onSelectChange = (selectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    
    searchChange(value) {//切换类型
        this.getDate(value)
    }

    checkPermission(type) {//检查权限
        let { permission } = this.props.commons.user_state 
        return permission.some( item => item === type )
    }

    deleteBoard(id) {//删除数据
        let can = this.checkPermission('control_board')
        if( !can ) {
            const warning = () => {
                message.warning('Not Permission',1);
            };
            warning();return false;
        }
        this.setState( {data: this.state.data.filter( item => item.id !== id ) })
    }

    createBoard(){//新增数据
        let can = this.checkPermission('create_board')
        if( !can ) {
            const warning = () => {
                message.warning('Not Permission',1);
            };
            warning();return false
        }
        this.setState({ check_data: {} })
        this.toggleModal() 
    }

    submitCreateBoard(title, content){//提交新增公告
        console.log(this);
        let id = this.state.data.length + 1
        let board = { title, content, type: 'Life', type_id: 1, id, key: id }
        this.state.data.push(board)
        this.setState({ data: this.state.data })
        this.toggleModal()  
          
    }


    render () {
        const { loading, selectedRowKeys, data, columns, types, modal_visible} = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div className = "app-board">
                
                <div style={{ marginBottom: 16 }}>
                <Select
                    showSearch
                    style={{ width: 150, paddingRight: 20 }}
                    placeholder="Select a type"
                    onChange = { this.searchChange }
                >
                    <Option key = {0} value={0}>All</Option>
                    { types.map(type => (<Option key = {type.id} value={type.id}>{type.title}</Option>)) }
                </Select>
                
                <Button
                    style = {{ marginRight: 20 }}
                    type="primary"
                    onClick={this.start}
                    disabled={!hasSelected}
                    loading={loading}
                >
                    Reload
                </Button>
                <Button
                    type="primary"
                    loading={loading}
                    onClick = { this.createBoard }
                >
                    Create
                </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination = { false }/>
                <Modal
                    title={this.state.check_data.title}
                    visible={this.state.modal_visible}
                    onOk={ this.state.check_data.title ? this.toggleModal : this.submitCreateBoard}
                    onCancel={this.toggleModal}
                >
                    <p>{ this.state.check_data.content }</p>
                </Modal>

                <OAModal
                    check_data={this.state.check_data}
                    visible={this.state.modal_visible}
                    onOk = { this.state.check_data.title ? this.toggleModal : this.submitCreateBoard }
                    onCancel = { this.toggleModal }
                    >
                </OAModal>


            </div>
        )
    }

}

const CreateForm = ({get_content, get_title}) => {
    return (
      <div>
        <Input onChange = {get_title} placeholder="please enter your title" style = {{ marginBottom: 5,}}/>
        <TextArea onChange = {get_content} placeholder="please enter your content" autosize={{ minRows: 3 }} />
      </div>
    )
  }



class OAModal extends Component {
    state = {
      board: {title: '', content: ''}
    }
    constructor ( props) {
      super(props)
      this.get_title = this.get_title.bind(this)
      this.get_content = this.get_content.bind(this)
    }
    get_title  (e) { 
     this.state.board.title = e.target.value;
      this.setState({board : this.state.board})
    }
    get_content  (e) { 
      this.state.board.content = e.target.value;
      this.setState({board : this.state.board})
    }
    render () {
      let title = this.props.check_data.title || 'New Board'
      let _content = this.props.check_data.content || <CreateForm  get_content = {this.get_content} get_title = {this.get_title}/>
     
      return <Modal
        title={ title }
        visible={this.props.visible}
        onOk = { this.props.onOk.bind(null, this.state.board.title, this.state.board.content) }
        onCancel = { this.props.onCancel }
      >
        <div>{_content}</div>
      </Modal>
    }
  }


export default  connect(Board, 'commons') 