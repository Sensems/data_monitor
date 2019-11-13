import React from 'react'
import style from "./regionalAnalysis.module.scss";
import { DatePicker, Radio, Table, Button} from 'antd';
import locale from "antd/es/date-picker/locale/zh_CN";
import TitleBar from '../../components/titleBar'
import chinaJson from '../../asset/js/china'

// let echarts = require('echarts');
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入统计图模块
require("echarts/lib/chart/map");
require("echarts/lib/chart/pictorialBar");
require("echarts/lib/chart/effectScatter");
require("echarts/lib/chart/scatter");
require("echarts/lib/component/geo");
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/visualMap');

const { RangePicker } = DatePicker;

class regionalAnalysis extends  React.Component{
	constructor(props) {
		super(props);
		this.state = {
			title: '区域分析',
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
				{title: '省市', dataIndex: 'date', key: 'date',},
				{title: '总用户数', dataIndex: 'users', key: 'users',},
				{title: '连续活跃用户', dataIndex: 'newUsers', key: 'newUsers',},
				{title: '忠诚用户', dataIndex: 'keepUser', key: 'keepUser',},
				{title: '近期流失用户', dataIndex: 'activeUser', key: 'activeUser',},
				{
					title: '历史趋势', dataIndex: 'bounceRate', key: 'bounceRate',
					render: () => {
						return <Button type="link">查看</Button>
					}
				},
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
		this.initMapCharts();
	}

	render() {
		let state = this.state;
		return (
				<div className={style.regionalAnalysis}>
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
					<TitleBar title='地理趋势图' showSide={true} />
					<div className={style.mapCharts} ref={el => this.mapCharts = el}> </div>
					<TitleBar title='详细数据' showSide={true} />
					<div className={style.tableDataDetail}>
						<Table columns={state.tableColumns} dataSource={state.tableData} pagination={state.pagination} />
					</div>
				</div>
		)
	}

	onRangePickerChange = () => {};

	initMapCharts = () => {
		let name_title = "用户地域分布";
		let mapName = 'china';
		let data = [
			{name:"北京",value:177},
			{name:"天津",value:42},
			{name:"河北",value:102},
			{name:"山西",value:81},
			{name:"内蒙古",value:47},
			{name:"辽宁",value:67},
			{name:"吉林",value:82},
			{name:"黑龙江",value:66},
			{name:"上海",value:24},
			{name:"江苏",value:92},
			{name:"浙江",value:114},
			{name:"安徽",value:109},
			{name:"福建",value:116},
			{name:"江西",value:91},
			{name:"山东",value:119},
			{name:"河南",value:137},
			{name:"湖北",value:116},
			{name:"湖南",value:114},
			{name:"重庆",value:91},
			{name:"四川",value:125},
			{name:"贵州",value:62},
			{name:"云南",value:83},
			{name:"西藏",value:9},
			{name:"陕西",value:80},
			{name:"甘肃",value:56},
			{name:"青海",value:10},
			{name:"宁夏",value:18},
			{name:"新疆",value:67},
			{name:"广东",value:123},
			{name:"广西",value:59},
			{name:"海南",value:14},
		];

		let geoCoordMap = {};
		let toolTipData = [
			{name:"北京",value:[{name:"文科",value:95},{name:"理科",value:82}]},
			{name:"天津",value:[{name:"文科",value:22},{name:"理科",value:20}]},
			{name:"河北",value:[{name:"文科",value:60},{name:"理科",value:42}]},
			{name:"山西",value:[{name:"文科",value:40},{name:"理科",value:41}]},
			{name:"内蒙古",value:[{name:"文科",value:23},{name:"理科",value:24}]},
			{name:"辽宁",value:[{name:"文科",value:39},{name:"理科",value:28}]},
			{name:"吉林",value:[{name:"文科",value:41},{name:"理科",value:41}]},
			{name:"黑龙江",value:[{name:"文科",value:35},{name:"理科",value:31}]},
			{name:"上海",value:[{name:"文科",value:12},{name:"理科",value:12}]},
			{name:"江苏",value:[{name:"文科",value:47},{name:"理科",value:45}]},
			{name:"浙江",value:[{name:"文科",value:57},{name:"理科",value:57}]},
			{name:"安徽",value:[{name:"文科",value:57},{name:"理科",value:52}]},
			{name:"福建",value:[{name:"文科",value:59},{name:"理科",value:57}]},
			{name:"江西",value:[{name:"文科",value:49},{name:"理科",value:42}]},
			{name:"山东",value:[{name:"文科",value:67},{name:"理科",value:52}]},
			{name:"河南",value:[{name:"文科",value:69},{name:"理科",value:68}]},
			{name:"湖北",value:[{name:"文科",value:60},{name:"理科",value:56}]},
			{name:"湖南",value:[{name:"文科",value:62},{name:"理科",value:52}]},
			{name:"重庆",value:[{name:"文科",value:47},{name:"理科",value:44}]},
			{name:"四川",value:[{name:"文科",value:65},{name:"理科",value:60}]},
			{name:"贵州",value:[{name:"文科",value:32},{name:"理科",value:30}]},
			{name:"云南",value:[{name:"文科",value:42},{name:"理科",value:41}]},
			{name:"西藏",value:[{name:"文科",value:5},{name:"理科",value:4}]},
			{name:"陕西",value:[{name:"文科",value:38},{name:"理科",value:42}]},
			{name:"甘肃",value:[{name:"文科",value:28},{name:"理科",value:28}]},
			{name:"青海",value:[{name:"文科",value:5},{name:"理科",value:5}]},
			{name:"宁夏",value:[{name:"文科",value:10},{name:"理科",value:8}]},
			{name:"新疆",value:[{name:"文科",value:36},{name:"理科",value:31}]},
			{name:"广东",value:[{name:"文科",value:63},{name:"理科",value:60}]},
			{name:"广西",value:[{name:"文科",value:29},{name:"理科",value:30}]},
			{name:"海南",value:[{name:"文科",value:8},{name:"理科",value:6}]},
		];

		echarts.registerMap('china',chinaJson);
		let mapCharts = echarts.init(this.mapCharts);
		/*获取地图数据*/
		mapCharts.showLoading();
		let mapFeatures = echarts.getMap(mapName).geoJson.features;
		mapCharts.hideLoading();
		console.log(mapFeatures);
		mapFeatures.forEach(function(v) {
			// 地区名称
			let name = v.properties.name;
			// 地区经纬度
			geoCoordMap[name] = v.properties.cp;
			// geoCoordMap[name] = v.properties.center;

		});

		console.log(geoCoordMap);

		let max = 480,
				min = 9; // todo
		let maxSize4Pin = 100,
				minSize4Pin = 20;

		let convertData = function(data) {
			let res = [];
			for (let i = 0; i < data.length; i++) {
				let geoCoord = geoCoordMap[data[i].name];
				if (geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value),
					});
				}
			}
			return res;
		};
		console.log(convertData(data));
		mapCharts.setOption({
			title: {
				text: name_title,
				x: '0',
			},
			tooltip: {
				trigger: 'item',
				formatter: function(params) {
					if (typeof(params.value)[2] == "undefined") {
						let toolTiphtml = '';
						for(let i = 0;i<toolTipData.length;i++){
							if(params.name===toolTipData[i].name){
								toolTiphtml += toolTipData[i].name+':<br>'
								for(let j = 0;j<toolTipData[i].value.length;j++){
									toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
								}
							}
						}
						console.log(toolTiphtml)
						// console.log(convertData(data))
						return toolTiphtml;
					} else {
						let toolTiphtml = ''
						for(let i = 0;i<toolTipData.length;i++){
							if(params.name===toolTipData[i].name){
								toolTiphtml += toolTipData[i].name+':<br>'
								for(let j = 0;j<toolTipData[i].value.length;j++){
									toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
								}
							}
						}
						console.log(toolTiphtml);
						// console.log(convertData(data))
						return toolTiphtml;
					}
				}
			},
			visualMap: {
				show: true,
				min: 0,
				max: 200,
				left: 'left',
				top: 'bottom',
				text: ['高', '低'], // 文本，默认为数值文本
				calculable: true,
				seriesIndex: [1],
				inRange: {
					color: ['#00467F', '#A5CC82'] // 蓝绿
				}
			},
			geo: {
				show: true,
				map: mapName,
				left:'25%',
				zoom:1.2,
				label: {
					normal: {
						show: false
					},
					emphasis: {
						show: false,
					}
				},
				roam: false,
				itemStyle: {
					normal: {
						areaColor: '#031525',
						borderColor: '#3B5077',
					},
					emphasis: {
						areaColor: '#2B91B7',
					}
				}
			},
			series: [{
				name: '散点',
				type: 'scatter',
				coordinateSystem: 'geo',
				data: convertData(data),
				symbolSize: function(val) {
					return val[2] / 10;
				},
				label: {
					normal: {
						formatter: '{b}',
						position: 'right',
						show: true
					},
					emphasis: {
						show: true
					}
				},
				itemStyle: {
					normal: {
						color: '#05C3F9'
					}
				}
			},
				{
					type: 'map',
					map: mapName,
					geoIndex: 0,
					aspectScale: 0.75, //长宽比
					showLegendSymbol: false, // 存在legend时显示
					label: {
						normal: {
							show: true
						},
						emphasis: {
							show: false,
							textStyle: {
								color: '#fff'
							}
						}
					},
					roam: true,
					itemStyle: {
						normal: {
							areaColor: '#031525',
							borderColor: '#3B5077',
						},
						emphasis: {
							areaColor: '#2B91B7'
						}
					},
					animation: false,
					data: data
				},
				{
					name: '点',
					type: 'scatter',
					coordinateSystem: 'geo',
					symbol: 'pin', //气泡
					symbolSize: function(val) {

						let a = (maxSize4Pin - minSize4Pin) / (max - min);
						let b = minSize4Pin - a * min;
						b = maxSize4Pin - a * max;
						console.log(a * val[2] + b);
						return a * val[2] + b;
					},
					label: {
						normal: {
							formatter: function (val) {
								return val.value[2]
							},
							show: true,
							textStyle: {
								color: '#fff',
								fontSize: 9,
							}
						}
					},
					itemStyle: {
						normal: {
							color: '#F62157', //标志颜色
						}
					},
					zlevel: 6,
					data: convertData(data),
				},
				{
					name: 'Top 5',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					data: convertData(data.sort(function(a, b) {
						return b.value - a.value;
					}).slice(0, 5)),
					symbolSize: function(val) {
						return val[2] / 10;
					},
					showEffectOn: 'render',
					rippleEffect: {
						brushType: 'stroke'
					},
					hoverAnimation: true,
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						}
					},
					itemStyle: {
						normal: {
							color: 'yellow',
							shadowBlur: 10,
							shadowColor: 'yellow'
						}
					},
					zlevel: 1
				},

			]
		})

	}

}

export default regionalAnalysis;