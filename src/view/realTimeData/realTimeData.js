import React from 'react'
import style from './realTimeData.module.scss'
import { Select, Input, Button, Statistic, Card, Icon, DatePicker, Table } from 'antd';
import TitleBar from '../../components/titleBar'
import moment from 'moment'

const { Option } = Select;
const { RangePicker } = DatePicker;

// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/legendScroll');

class realTimeData extends  React.Component{
	constructor(props) {
		super(props);
		this.state = {
			title: '实时数据',
			searchParams: {
				searchValue1:'',
				searchValue2:'',
			},
			dataStatistics_V1: [
				{title: '昨日活跃用户', value:'237', proportion: 15.6, tendency: 'up', id:1, key:'1'},
				{title: '过去7日活跃用户', value:'347', proportion: 14.7, tendency: 'up', id:2, key:'2'},
				{title: '过去14日活跃用户', value:'458', proportion: 11.4, tendency: 'down', id:3, key:'3'},
				{title: '过去30日活跃用户', value:'615', proportion: 18.2, tendency: 'down', id:4, key:'4'},
			],
			pagination: {
				pageSize:10,
				total:50,
				pageSizeOptions: ['10','20','30','40'],
				showSizeChanger: true,
				showQuickJumper: true,
				showTotal: total => `Total ${total} items`
			},
			tableColumns: [
				{title: '日期', dataIndex: 'date', key: 'date',},
				{title: '总用户数', dataIndex: 'users', key: 'users',},
				{title: '新增用户', dataIndex: 'newUsers', key: 'newUsers',},
				{title: '留存用户', dataIndex: 'keepUser', key: 'keepUser',},
				{title: '活跃用户', dataIndex: 'activeUser', key: 'activeUser',},
				{title: '跳出率', dataIndex: 'bounceRate', key: 'bounceRate',},
				{title: '平均在线时长', dataIndex: 'onlineTime', key: 'onlineTime',},
			],
			tableData: [
				{id:1, date:'08/02', users:'86', newUsers:'86', keepUser:86, activeUser:86, bounceRate:'15%', onlineTime:'00:00:02'},
				{id:2, date:'08/02', users:'86', newUsers:'86', keepUser:86, activeUser:86, bounceRate:'15%', onlineTime:'00:00:02'},
				{id:3, date:'08/02', users:'86', newUsers:'86', keepUser:86, activeUser:86, bounceRate:'15%', onlineTime:'00:00:02'},
				{id:4, date:'08/02', users:'86', newUsers:'86', keepUser:86, activeUser:86, bounceRate:'15%', onlineTime:'00:00:02'},
				{id:5, date:'08/02', users:'86', newUsers:'86', keepUser:86, activeUser:86, bounceRate:'15%', onlineTime:'00:00:02'},
			]
		}
	}

	componentDidMount() {
		this.initEcharts();
	}

	render() {
		let state = this.state;
		return (
				<div className={style.realTimeData}>
					<header>
						<span>做过</span>
						<Select defaultValue="lucy" onChange={this.selectChange1} style={{ width: 120 }}>
							<Option value="jack">访问</Option>
							<Option value="lucy">下单</Option>
							<Option value="disabled">购买</Option>
						</Select>
						<span>至少</span>
						<Input ref={el => this.Input = el} style={{width:'150px'}} defaultValue="1" type="number" placeholder="输入次数" />
						<span>次的</span>
						<Select defaultValue="lucy" style={{ width: 120 }} onChange={this.selectChange2}>
							<Option value="jack">访问用户</Option>
							<Option value="lucy">登录用户</Option>
						</Select>
						<Button type="primary" onClick={this.search}>搜索</Button>
					</header>
					<TitleBar title="关键指标" showSide={true}/>
					<div className={style.indicator}>
						{state.dataStatistics_V1.map(e => {
							return (
									<Card key={e.id}>
										<span>{e.title}</span>
										<h2>{e.value}</h2>
										<Statistic
												value={e.proportion}
												precision={2}
												valueStyle={{ color: e.tendency === 'up'? '#3f8600':'#cf1322'}}
												prefix={e.tendency === 'up'? <Icon type="arrow-up" />:<Icon type="arrow-down" />}
												suffix="% 相比上一周期"
										/>
									</Card>
							)
						})}
					</div>
					<TitleBar title="活跃用户趋势" showSide={true}/>
					<RangePicker
							placeholder={['开始日期','结束日期']}
							ranges={{
								'今天': [moment(), moment()],
								'这个月': [moment().startOf('month'), moment().endOf('month')],
							}}
							onChange={this.onRangePickerChange}
					/>
					<div ref={el => this.trendTable = el} className={style.trendTable}> </div>
					<TitleBar title="详细数据" showSide={true}/>
					<div className={style.detail}>
						<Table columns={state.tableColumns} dataSource={state.tableData} pagination={state.pagination} />
					</div>
				</div>
		)
	}

	search = () => {
		console.log(this.Input);
	};

	selectChange1 = (value) => {
		let obj = Object.assign({},this.state.searchParams,{searchValue1:value});
		this.setState({
			searchParams:obj
		})
	};

	selectChange2 = (value) => {
		let obj = Object.assign({},this.state.searchParams,{searchValue2:value});
		this.setState({
			searchParams:obj
		})
	};

	//初始化echarts
	initEcharts = () => {
		let myChart = echarts.init(this.trendTable);
		// 绘制图表
		myChart.setOption({
			color: ['#3398DB'],
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis : [
				{
					type : 'value'
				}
			],
			series : [
				{
					name:'直接访问',
					type:'bar',
					barWidth: '60%',
					data:[10, 52, 200, 334, 390, 330, 220]
				}
			]
		});
	};

	onRangePickerChange = (date, dateString) => {
		console.log(date, dateString);
	}
}

export default realTimeData;