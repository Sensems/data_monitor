import React from 'react'
import style from "./pageRanking.module.scss";
import {DatePicker, Icon, Radio, Table} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import TitleBar from '../../components/titleBar'

const { RangePicker } = DatePicker;

class pageRanking extends  React.Component{
	constructor(props) {
		super(props);
		this.state = {
			title: '页面排行',
			timeList: [
				{title: '今天', value: '0'},
				{title: '7天', value: '7'},
				{title: '14天', value: '14'},
				{title: '30天', value: '30'},
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
				<div className={style.pageRanking}>
					<header>
						<h2>{this.state.title}</h2>
						<div className={style.searchBtnBox}>
							<span className={style.title}>时间:</span>
							<Radio.Group onChange={this.RadioGroupChange1}>
								{state.timeList.map(e => {
									return <Radio.Button key={e.value} value={e.value}>{e.title}</Radio.Button>
								})}
							</Radio.Group>
							<RangePicker
									locale={locale}
									onChange={this.onRangePickerChange}
									style={{marginLeft:'20px'}}
							/>
						</div>
					</header>
					<TitleBar title="详细数据" showSide={true} />
					<div className={style.tableDetail}>
						<Table columns={state.tableColumns} dataSource={state.tableData} pagination={state.pagination} />
					</div>
				</div>

		)
	}

	//点击时间
	onRangePickerChange = () => {

	}

}

export default pageRanking;