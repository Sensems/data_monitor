import React from 'react'
import style from './userTrajectory.module.scss'
import {Icon, Input, Radio, Table} from 'antd';
import TitleBar from '../../components/titleBar'

const { Search } = Input;

class userTrajectory extends  React.Component{
	constructor(props) {
		super(props);
		this.state = {
			title: '实时用户轨迹',
			radioGroupValue1: '',
			radioGroupValue2: '',
			radioGroupValue3: '',
			radioGroupValue4: '',
			accessTimeList: [
				{title:'全部',value:0},
				{title: '0~30s', value: 1},
				{title: '30~60s', value: 2},
				{title: '1min~3min', value: 3},
				{title: '3min~5min', value: 4},
				{title: '5min~10min', value: 5},
				{title: '10min以上', value: 6},
			],
			AccessSource: [
				{title:'全部',value:0},
				{title:'直接访问',value:1},
				{title:'内部跳转',value:2},
				{title:'外部跳转',value:3},
			],
			visitPage:[
				{title:'全部',value:0},
				{title:'1页',value:1},
				{title:'2页',value:2},
				{title:'3-5页',value:3},
				{title:'6-10页',value:4},
				{title:'11-20页',value:5},
				{title:'20页以上',value:6},
			],
			AccessAddress:[
				{title:'全部', value:0},
				{title:'地域组合', value:1}
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
				{title: '排名', dataIndex: 'date', key: 'date',},
				{title: '关键词', dataIndex: 'users', key: 'users',},
				{
					title: '趋势',
					dataIndex: 'keepUser',
					key: 'keepUser',
					render: val => {
						if(val === "up") {
							return <Icon type="arrow-up" style={{color:'#3f8600'}}/>;
						}else {
							return <Icon type="arrow-down" style={{color:'#cf1322'}}/>;
						}
					}
				},
				{title: '今日访问量', dataIndex: 'newUsers', key: 'newUsers',},
				{title: '最近一周', dataIndex: 'activeUser', key: 'activeUser',},
				{title: '最近一个月', dataIndex: 'bounceRate', key: 'bounceRate',},
				{
					title: '历史趋势',
					dataIndex: 'onlineTime',
					key: 'onlineTime',
					render: val => {
						if(val === "up") {
							return <Icon type="arrow-up" style={{color:'#3f8600'}}/>;
						}else {
							return <Icon type="arrow-down" style={{color:'#cf1322'}}/>;
						}
					}
				},
			],
			tableData: [
				{id:1, date:'08/02', users:'86', newUsers:'86', keepUser:'up', activeUser:86, bounceRate:'15%', onlineTime:'00:00:02'},
				{id:2, date:'08/02', users:'86', newUsers:'86', keepUser:86, activeUser:86, bounceRate:'15%', onlineTime:'00:00:02'},
				{id:3, date:'08/02', users:'86', newUsers:'86', keepUser:86, activeUser:86, bounceRate:'15%', onlineTime:'00:00:02'},
				{id:4, date:'08/02', users:'86', newUsers:'86', keepUser:'up', activeUser:86, bounceRate:'15%', onlineTime:'00:00:02'},
				{id:5, date:'08/02', users:'86', newUsers:'86', keepUser:86, activeUser:86, bounceRate:'15%', onlineTime:'00:00:02'},
			]
		}

	}
	render() {
		let state = this.state;
		return (
				<div className={style.userTrajectory}>
					<header>
						<div className={style.searchBtnBox}>
							<span className={style.title}>页面地址:</span>
							<Search
									placeholder="输入页面地址"
									enterButton="提交"
									size="default"
									onSearch={this.searchPageUrl}
									style={{width:'300px'}}
									ref={el => this.inputVal = el}
							/>
						</div>
						<div className={style.searchBtnBox}>
							<span className={style.title}>访问时长:</span>
							<Radio.Group onChange={this.RadioGroupChange1} defaultValue="0">
								{state.accessTimeList.map(e => {
									return <Radio.Button key={e.value} value={e.value}>{e.title}</Radio.Button>
								})}
							</Radio.Group>
						</div>
						<div className={style.searchBtnBox}>
							<span className={style.title}>访问来源:</span>
							<Radio.Group onChange={this.RadioGroupChange2} defaultValue="0">
								{state.AccessSource.map(e => {
									return <Radio.Button key={e.value} value={e.value}>{e.title}</Radio.Button>
								})}
							</Radio.Group>
						</div>
						<div className={style.searchBtnBox}>
							<span className={style.title}>访问页面:</span>
							<Radio.Group onChange={this.RadioGroupChange3} defaultValue="0">
								{state.visitPage.map(e => {
									return <Radio.Button key={e.value} value={e.value}>{e.title}</Radio.Button>
								})}
							</Radio.Group>
						</div>
						<div className={style.searchBtnBox}>
							<span className={style.title}>访问地址:</span>
							<Radio.Group onChange={this.RadioGroupChange4} defaultValue="0">
								{state.AccessAddress.map(e => {
									return <Radio.Button key={e.value} value={e.value}>{e.title}</Radio.Button>
								})}
							</Radio.Group>
						</div>
					</header>
					<TitleBar title="详细数据" showSide={true} />
					<div className={style.tableDetail}>
						<Table columns={state.tableColumns} dataSource={state.tableData} pagination={state.pagination} />
					</div>
				</div>
		)
	}

	searchPageUrl = () => {
		console.log(this.inputVal.input.state.value);
	};

	RadioGroupChange1 = (e) => {
		this.setState({radioGroupValue1:e.target.value})
	};

	RadioGroupChange2 = (e) => {
		this.setState({radioGroupValue2:e.target.value})
	};

	RadioGroupChange3 = (e) => {
		this.setState({radioGroupValue3:e.target.value})
	};

	RadioGroupChange4 = (e) => {
		this.setState({radioGroupValue4:e.target.value})
	};
}

export default userTrajectory;