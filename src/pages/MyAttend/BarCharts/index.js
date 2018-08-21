import React, { Component } from 'react';
import echarts from 'echarts'
import { Button } from 'antd'

let option = {
    title: {
        text: 'Attend-Chart',
        textStyle: { fontSize: 14 }
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['arrive','leave']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['MON','TUE','WED','THU','FRI','SAT','SUN']
    },
    yAxis: {
        type: 'value'
    },
    series: [
       
    ]
}


class BarCharts extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        week: 1,     
        datas: [],
        
    }

    getTime() {
        this.$http.ajax({
            url: '/api/attend-time.json'
        }).then(res => {
            this.setState({ datas: res })
            this.handleData(res)
        })
    }

    handleData (datas, week) {
        if ( !week ) week = this.state.week
        let data = datas.filter(item => item.week === week)[0]
        option.title.text = 'My-Attend-Chart('+ week +'--week)'
        option.series = [
            {
                name:'arrive',
                type:'line',
                data:data.times.morning,
            },
            {
                name:'leave',
                type:'line',
                data:data.times.evening
            } 
        ]
        this.chart.setOption(option, true);
    }

    changeWeek(num){
        let { week } = this.state
        week += num;
        if ( week >= 4 ) week = 4;
        if ( week <= 1 ) week = 1;
        this.setState({ week })
    }

    shouldComponentUpdate (props, state) {
        if ( state.week !== this.state.week ) {
            this.handleData(this.state.datas, state.week)
        }
        return true;
    }

    render() {
        let { week } = this.state
        return (
            <div className = "bar-chart" >
                <div ref = {el => this.el = el} className="content"></div>
                <Button
                    type = "primary"
                    disabled = { week === 1}
                    style={{  marginRight: 20 }}
                    onClick = { this.changeWeek.bind(this, -1) }
                >Prev Week</Button>
                <Button
                    type = "primary"
                    disabled = { week === 4}
                    style={{  marginRight: 20 }}
                    onClick = { this.changeWeek.bind(this, 1) }
                >Next Week</Button>
            </div>
        )
    }

    componentDidMount() {
        this.getTime()
        this.chart = echarts.init(this.el)
    }




}

export default BarCharts;