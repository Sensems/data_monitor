import React from 'react'
import { DatePicker, Radio, Table} from 'antd';
import TitleBar from '../../components/titleBar'
import style from "./userData.module.scss";
import moment from 'moment'

// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入折线图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

const { RangePicker } = DatePicker;

class userData extends  React.Component{
	constructor(props) {
		super(props);
		this.state = {
			title: '新老用户',
			dateValue: [],
			timeValue: '7',
			startTime:moment().subtract(6, 'days').format('YYYY-MM-DD'),
			endTime:moment().format('YYYY-MM-DD'),
			tableLoad:true,
			userDataList:[],
			newUserList:[],
			oldUserList:[],
			dateTimeList:[],
			timeList: [
				{title:'今天',value:'0'},
				{title:'7天',value:'7'},
				{title:'14天',value:'14'},
				{title:'30天',value:'30'},
			],
			pagination: {
				current:1,
				pageSize:10,
				total:50,
				pageSizeOptions: ['10','20','30','40'],
				showSizeChanger: true,
				showQuickJumper: true,
				showTotal: total => `一共 ${total} 条`,
				onShowSizeChange:this.onShowSizeChange,
				onChange:this.pageChange
			},
			tableColumns: [
				{title: '日期', dataIndex: 'date', key: 'date',},
				{title: '新用户数', dataIndex: 'newones', key: 'newones',},
				{title: '新用户占比', dataIndex: 'newper', key: 'newper',},
				{title: '老用户数', dataIndex: 'oldones', key: 'oldones',},
				{title: '老用户占比', dataIndex: 'oldper', key: 'oldper',}
			],
		}
	}

	componentDidMount() {
		// this.initEcharts();
		this.getData();
	}

	render() {
		let state = this.state;
		return (
				<div className={style.userData}>
					<header>
						<h2>{this.state.title}</h2>
						<div className={style.searchBtnBox}>
							<span className={style.title}>时间:</span>
							<Radio.Group onChange={this.RadioGroupChange1} value={state.timeValue} defaultValue="7">
								{state.timeList.map(e => {
									return <Radio.Button key={e.value} value={e.value}>{e.title}</Radio.Button>
								})}
							</Radio.Group>
							<RangePicker
									placeholder={['开始日期','结束日期']}
									onChange={this.onRangePickerChange}
									style={{marginLeft:'20px'}}
									disabledDate={this.disabledDate}
									value={state.dateValue}
							/>
						</div>
					</header>
					<TitleBar title="用户比趋势图" showSide={true} />
					<div className={style.tendencyChart} ref={el => this.tendencyChart = el}> </div>
					<TitleBar title="详细数据" showSide={true} />
					<div className={style.tableDataDetail}>
						<Table rowKey="date" columns={state.tableColumns} loading={state.tableLoad} dataSource={state.userDataList} pagination={state.pagination} />
					</div>
				</div>
		)
	}

	//点击时间按钮组切换
	RadioGroupChange1 = (val) => {
		let dateVal = null;
		if (val.target.value !== '0') {
			dateVal = (val.target.value - 1);
		}else{
			dateVal = 0
		}
		let time = moment().subtract(dateVal, 'days').format('YYYY-MM-DD');
		this.setState({
			startTime:time,
			endTime:moment().format('YYYY-MM-DD'),
			timeValue:val.target.value,
			dateValue: []
		},() => {
			this.getData();
		})
	};

	//选择时间弹框范围
	onRangePickerChange = (date,time) => {
		let obj = Object.assign({},this.state.pagination,{current:1});
		this.setState({
			startTime:time[0],
			endTime:time[1],
			pagination:obj,
			dateValue:[moment(time[0]),moment(time[1])],
			timeValue:''
		},() => {
			this.getData();
		})
	};

	//初始化折线图
	initEcharts = () => {
		let myChart = echarts.init(this.tendencyChart);
		myChart.setOption({
			title: {
				text: '用户比'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data:['新用户','老用户']
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
				data: this.state.dateTimeList
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name:'新用户',
					type:'line',
					stack: '总量',
					data:this.state.newUserList
				},
				{
					name:'老用户',
					type:'line',
					stack: '总量',
					data:this.state.oldUserList
				},
			]
		})
	};

	//切换页数
	pageChange = (page) => {
		let obj = Object.assign({},this.state.pagination,{current:page});
		this.setState({
			pagination:obj
		},() => {
			this.getData()
		});
	};

	//切换单页显示条数
	onShowSizeChange = (current, pageSize) => {
		console.log(pageSize);
		let obj = Object.assign({},this.state.pagination,{
			current:current,
			pageSize:pageSize
		});
		this.setState({
			pagination:obj
		},() => {
			this.getData()
		})
	};

	//获取数据
	getData = () => {
		this.setState({tableLoad:true});
		React.$axiosGet('datamontior.new-user.index',{
			'search[time][start]': this.state.startTime,
			'search[time][end]': this.state.endTime,
			'pageSize':this.state.pagination.pageSize,
			'page':this.state.pagination.current
		}).then(result => {
			console.log(result);
			let resultData = result.data;
			let newUserList = [],
					oldUserList = [],
					dateTimeList = [];

			for (let e of resultData.search_data) {
				newUserList.push(e.newones);
				oldUserList.push(e.oldones);
				dateTimeList.push(e.date);
			}
			let obj = Object.assign({},this.state.pagination,{total:resultData.search_data.data_all_percent});
			this.setState({
				newUserList,
				oldUserList,
				dateTimeList,
				pagination:obj,
				userDataList:resultData.search_data,
				tableLoad:false
			},() => {
				console.log(this.state);
				this.initEcharts()
			})
		})
	};

	//阻止用户选择未来的时间
	 disabledDate = (current) => {
		return current && current > moment().endOf('day');
	}
}

export default userData;