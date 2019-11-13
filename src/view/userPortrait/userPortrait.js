import React from 'react'
import style from './userPortrait.module.scss'
import { DatePicker, Radio} from 'antd';
import TitleBar from '../../components/titleBar'
import locale from 'antd/es/date-picker/locale/zh_CN';
import newUserImg from '../../asset/img/newUserImg.png';
import moment from "moment";

// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入统计图模块
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pictorialBar");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/scatter");
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

const { RangePicker } = DatePicker;

class userPortrait extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			title: '用户画像',
			startTime:moment().subtract(6, 'days').format('YYYY-MM-DD'),
			endTime:moment().format('YYYY-MM-DD'),
			timeValue: '7',
			dateValue: [],
			userRatioInfo:{},
			sexRatioInfo:{},
			timeList: [
				{title: '今天', value: '0'},
				{title: '7天', value: '7'},
				{title: '14天', value: '14'},
				{title: '30天', value: '30'},
			],
			dataValueList: [{
				name: '电子网络',
				value: '5.05'
			}, {
				name: '科研教育',
				value: '4.71'
			}, {
				name: '官员翻译',
				value: '1.01'
			}, {
				name: '医疗卫生',
				value: '1.68'
			}, {
				name: '销售客服',
				value: '3.03'
			}, {
				name: '物流采购',
				value: '1.01'
			}, {
				name: '行政高管',
				value: '2.36'
			}, {
				name: '金融保险',
				value: '4.38'
			}, {
				name: '媒体艺术',
				value: '3.70'
			}, {
				name: '服务页',
				value: '1.01'
			}],
		}

	}

	componentDidMount() {
		// this.initSexRatioChart();
		this.initUserRatioChart();
		this.initAgeDistributionChart();
		this.initDegreeDistributionChart();
		this.initProfessionalDistributionChat();
		this.getData()
	}

	render() {
		let state = this.state;
		return (
				<div className={style.userPortrait}>
					<header>
						<h2>{this.state.title}</h2>
						<div className={style.searchBtnBox}>
							<span className={style.title}>时间:</span>
							<Radio.Group onChange={this.RadioGroupChange} value={state.timeValue}>
								{state.timeList.map(e => {
									return <Radio.Button key={e.value} value={e.value}>{e.title}</Radio.Button>
								})}
							</Radio.Group>
							<RangePicker
									locale={locale}
									onChange={this.onRangePickerChange}
									style={{marginLeft:'20px'}}
									value={state.dateValue}
									disabledDate={this.disabledDate}
							/>
						</div>
					</header>
					<TitleBar title="关键指标" showSide={true} />
					<div className={style.chartList}>
						<div className={style.charts}>
							<div ref={el => this.sexRatio = el} style={{width:'40%'}}> </div>
							<div ref={el => this.userRatio = el} style={{width:'60%'}}> </div>
						</div>
						<div className={style.charts}>
							<div ref={el => this.ageDistribution  = el} style={{width:'60%'}}> </div>
							<div ref={el => this.degreeDistribution = el} style={{width:'40%'}}> </div>
						</div>
						<div className={style.charts} style={{border:'none'}}>
							<div ref={el => this.professionalDistribution = el} style={{border:'none',width:'100%',height:'400px'}}> </div>
						</div>
					</div>
				</div>
		)
	}

	initSexRatioChart = () => {
		let sexRatioChart = echarts.init(this.sexRatio);
		sexRatioChart.setOption({
			title: {
				text: '性别比例',
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				bottom:10,
				left:'34.5%',
				data:['未知','男','女']
			},
			series: [
				{
					name:'访问来源',
					type:'pie',
					radius: ['40%', '70%'],
					center: ['45%', '50%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '30',
								fontWeight: 'bold'
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data:[
						{value:this.state.sexRatioInfo.unknownSexTotal, name:'未知'},
						{value:this.state.sexRatioInfo.manSexTotal, name:'男'},
						{value:this.state.sexRatioInfo.femaleSexTotal, name:'女'},
					]
				}
			]
		})
	};

	initUserRatioChart = () => {
		let symbols = [
			'path://M18.2629891,11.7131596 L6.8091608,11.7131596 C1.6685112,11.7131596 0,13.032145 0,18.6237673 L0,34.9928467 C0,38.1719847 4.28388932,38.1719847 4.28388932,34.9928467 L4.65591984,20.0216948 L5.74941883,20.0216948 L5.74941883,61.000787 C5.74941883,65.2508314 11.5891201,65.1268798 11.5891201,61.000787 L11.9611506,37.2137775 L13.1110872,37.2137775 L13.4831177,61.000787 C13.4831177,65.1268798 19.3114787,65.2508314 19.3114787,61.000787 L19.3114787,20.0216948 L20.4162301,20.0216948 L20.7882606,34.9928467 C20.7882606,38.1719847 25.0721499,38.1719847 25.0721499,34.9928467 L25.0721499,18.6237673 C25.0721499,13.032145 23.4038145,11.7131596 18.2629891,11.7131596 M12.5361629,1.11022302e-13 C15.4784742,1.11022302e-13 17.8684539,2.38997966 17.8684539,5.33237894 C17.8684539,8.27469031 15.4784742,10.66467 12.5361629,10.66467 C9.59376358,10.66467 7.20378392,8.27469031 7.20378392,5.33237894 C7.20378392,2.38997966 9.59376358,1.11022302e-13 12.5361629,1.11022302e-13',
			'path://M28.9624207,31.5315864 L24.4142575,16.4793596 C23.5227152,13.8063773 20.8817445,11.7111088 17.0107398,11.7111088 L12.112691,11.7111088 C8.24168636,11.7111088 5.60080331,13.8064652 4.70917331,16.4793596 L0.149791395,31.5315864 C-0.786976655,34.7595013 2.9373074,35.9147532 3.9192135,32.890727 L8.72689855,19.1296485 L9.2799493,19.1296485 C9.2799493,19.1296485 2.95992025,43.7750224 2.70031069,44.6924335 C2.56498417,45.1567684 2.74553639,45.4852068 3.24205501,45.4852068 L8.704461,45.4852068 L8.704461,61.6700801 C8.704461,64.9659872 13.625035,64.9659872 13.625035,61.6700801 L13.625035,45.360657 L15.5097899,45.360657 L15.4984835,61.6700801 C15.4984835,64.9659872 20.4191451,64.9659872 20.4191451,61.6700801 L20.4191451,45.4852068 L25.8814635,45.4852068 C26.3667633,45.4852068 26.5586219,45.1567684 26.4345142,44.6924335 C26.1636859,43.7750224 19.8436568,19.1296485 19.8436568,19.1296485 L20.3966199,19.1296485 L25.2043926,32.890727 C26.1862111,35.9147532 29.9105828,34.7595013 28.9625083,31.5315864 L28.9624207,31.5315864 Z M14.5617154,0 C17.4960397,0 19.8773132,2.3898427 19.8773132,5.33453001 C19.8773132,8.27930527 17.4960397,10.66906 14.5617154,10.66906 C11.6274788,10.66906 9.24611767,8.27930527 9.24611767,5.33453001 C9.24611767,2.3898427 11.6274788,0 14.5617154,0 L14.5617154,0 Z',
			'path://M512 292.205897c80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 65.503248 592.855572 0 512 0 431.144428 0 365.641179 65.503248 365.641179 146.358821 365.641179 227.214393 431.144428 292.205897 512 292.205897zM512 731.282359c-80.855572 0-146.358821 65.503248-146.358821 146.358821 0 80.855572 65.503248 146.358821 146.358821 146.358821 80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 796.273863 592.855572 731.282359 512 731.282359z'
		];
		let bodyMax = 100; //指定图形界限的值
		let userRatioChart = echarts.init(this.userRatio);
		userRatioChart.setOption({
			tooltip: {
				show: true, //鼠标放上去显示悬浮数据
				formatter: (value) => {
					if(value.name === 'a') {
						return `新用户 (${this.state.userRatioInfo.newTotal}) ${this.state.userRatioInfo.newPer}%`
					}else if(value.name === 'b'){
						return `老用户 (${this.state.userRatioInfo.oldTotal}) ${this.state.userRatioInfo.oldPer}%`
					}
				}
			},
			legend: {
				show:false,
			},
			grid: {
				left:'20%',
				width:'50%',
				top: '10%',
				bottom: '10%',
				containLabel: true
			},
			xAxis: {
				data: ['a', 'x', 'b'],
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					show: false
				}
			},
			yAxis: {
				max: bodyMax,
				splitLine: {
					show: false
				},
				axisTick: {
					// 刻度线
					show: false
				},
				axisLine: {
					// 轴线
					show: false
				},
				axisLabel: {
					// 轴坐标文字
					show: false
				}
			},
			series: [{
				name: 'typeA',
				type: 'pictorialBar',
				symbolClip: true,
				symbolBoundingData: bodyMax,
				data: [{
					value: this.state.userRatioInfo.newPer,
					symbol: symbols[0],
					itemStyle: {
						normal: {
							color: 'rgba(105,204,230)' //单独控制颜色
						}
					},
				},
					{

					},
					{
						value: this.state.userRatioInfo.oldPer,
						// value: 70,
						symbol: symbols[0],
						itemStyle: {
							normal: {
								color: 'rgba(255,130,130)' //单独控制颜色
							}
						},
					}
				],
				z: 10
			},
				{
					// 设置背景底色，不同的情况用这个
					name: 'full',
					type: 'pictorialBar', //异型柱状图 图片、SVG PathData
					symbolBoundingData: bodyMax,
					animationDuration: 0,
					itemStyle: {
						normal: {
							color: '#ccc' //设置全部颜色，统一设置
						}
					},
					z: 10,
					data: [{
						itemStyle: {
							normal: {
								color: 'rgba(105,204,230,0.40)' //单独控制颜色
							}
						},
						value: 100,
						symbol: symbols[0],
					},
						{
							// 设置中间冒号
							itemStyle: {
								normal: {
									color: '#1DA1F2' //单独控制颜色
								}
							},
							value: 100,
							symbol: symbols[2],
							symbolSize: [10, '18%'],
							symbolOffset: [0, '-200%']
						},
						{
							itemStyle: {
								normal: {
									color: 'rgba(255,130,130,0.40)' //单独控制颜色
								}
							},
							value: 100,
							symbol: symbols[0],
						}
					]
				}
			]
		});
	};

	initAgeDistributionChart = () => {
		let ageDistributionChart = echarts.init(this.ageDistribution);
		ageDistributionChart.setOption({
			title: {
				text: '年龄分布'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['City Alpha', 'City Beta', 'City Gamma']
			},
			grid: {
				left: '9%',
				width:'70%'
				// right:'-10%',
			},
			toolbox: {
				show: true,
				feature: {
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				name: '',
				data: ['Sunny', 'Cloudy', 'Showers', 'Showers1', 'Showers2', 'Showers3'],
				inverse: true,
				axisLabel: {
					formatter: function (value) {
						return '{' + value + '| }\n{value|' + value + '}';
					},
					margin: 0,
					rich: {
						value: {
							lineHeight: 30,
							align: 'center'
						},
						Sunny: {
							height: 40,
							align: 'center',
							backgroundColor: {
								image: newUserImg
							}
						},
						Cloudy: {
							height: 40,
							align: 'center',
							backgroundColor: {
								image: newUserImg
							}
						},
						Showers: {
							height: 40,
							align: 'center',
							backgroundColor: {
								image: newUserImg
							}
						},
						Showers1: {
							height: 40,
							align: 'center',
							backgroundColor: {
								image: newUserImg
							}
						},
						Showers2: {
							height: 40,
							align: 'center',
							backgroundColor: {
								image: newUserImg
							}
						},
						Showers3: {
							height: 40,
							align: 'center',
							backgroundColor: {
								image: newUserImg
							}
						},
					}
				}
			},
			yAxis: {
				show: false,
				type: 'value',
			},
			series: [
				{
					name: '人数',
					type: 'bar',
					center:['40%','50%'],
					data: [165, 170, 30, 120, 111, 136],
					itemStyle: {
						color:'#3ad2dc'
					},
				},
			]
		})
	};

	initDegreeDistributionChart = () => {
		let barWidth_edit = 80;
		let DegreeDistributionChart = echarts.init(this.degreeDistribution);
		DegreeDistributionChart.setOption({
			title:{
				text:'学历占比',
				textStyle:{
					color:'#000'
				},
				left:'15',
				top: '0'

			},
			tooltip: {
				show: true,
				formatter: "{a}<br>{c}%",
			},
			grid: {
				left: '18%',
				width:'60%'
			},
			legend: {
				bottom: '20%',
				left:'center',
				itemWidth: 15,
				itemHeight: 10,
				itemGap: 40,
				textStyle:{
					color:'#89A7AF',
				},
				data:[{
					name :'未知'
				},
					{
						name :'初中'
					},
					{
						name :'高中'
					},
					{
						name :'本科'
					},
					{
						name :'硕士'
					},
					{
						name :'博士'
					},
				]
			},
			xAxis: [{
				type :'value',
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					show: false
				},
				splitLine: {
					show: false,
				}
			}],
			yAxis: [{
				//type: 'category',
				data: [''],
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					textStyle: {
						color: '#fff',
					}
				}

			}],
			series: [
				{
					name:'未知',
					type:'bar',
					barWidth:barWidth_edit,
					stack: '学历类型占比',
					itemStyle: {
						color: '#0ea4ae'
					},
					data:[{
						value:16.6,
					}]
				},
				{
					name:'初中',
					type:'bar',
					barWidth:barWidth_edit,
					stack: '学历类型占比',
					itemStyle: {
						color: '#96e9ee'
					},
					data:[{
						value:16.6,
					}]
				},
				{
					name:'高中',
					type:'bar',
					barWidth:barWidth_edit,
					stack: '学历类型占比',
					itemStyle: {
						color: '#65dde5'
					},
					data:[{
						value:16.6,
					}]
				},
				{
					name:'本科',
					type:'bar',
					barWidth:barWidth_edit,
					stack: '学历类型占比',
					itemStyle: {
						color: '#8cc151'
					},
					data:[{
						value:16.6,
					}]
				},
				{
					name:'硕士',
					type:'bar',
					barWidth:barWidth_edit,
					stack: '学历类型占比',
					itemStyle: {
						color: '#3ad2dc'
					},
					data:[{
						value:16.6,
					}]
				},
				{
					name:'博士',
					type:'bar',
					barWidth:barWidth_edit,
					stack: '学历类型占比',
					itemStyle: {
						color: '#1cbec9'
					},
					data:[{
						value:16.6,
					}]
				}
			]
		})
	};

	initProfessionalDistributionChat = () => {
		let datalist = [
			{offset: [14, 44], color: '#5d9cec'},
			{offset: [30.5, 27], color: '#62c87f'},
			{offset: [31.3, 66], color: '#f57bc1'},
			{offset: [47.4, 35], color: '#6ed5e6'},
			{offset: [51.4, 73], color: '#7053b6'},
			{offset: [58.8, 44], color: '#dcb186'},
			{offset: [64.7, 75], color: '#ffce55'},
			{offset: [74.1, 17], color: '#f15755'},
			{offset: [81, 72], color: '#fc863f'},
			{offset: [86.8, 32], color: '#647c9d'}
		];
		let datas = [];
		for (let i = 0; i < this.state.dataValueList.length; i++) {
			let item = this.state.dataValueList[i];
			let itemToStyle = datalist[i];
			datas.push({
				name: item.name + '\n\n' + item.value + '%',
				value: itemToStyle.offset,
				symbolSize: parseInt(item.value) * 25 + 40 ,
				label: {
					normal: {
						textStyle: {
							fontSize: 11
						}
					}
				},
				itemStyle: {
					normal: {
						color: itemToStyle.color,
						opacity: 1
					}
				},
			})
		}
		let professionalDistributionChat = echarts.init(this.professionalDistribution);
		professionalDistributionChat.setOption({
			title:{
				text:'Top10职业分布',
				textStyle:{
					color:'#000'
				},
				left:'15',
				top: '0'

			},
			grid: {
				show: false,
				top: 10,
				bottom: 10,
				left:-10
			},
			xAxis: [{
				gridIndex: 0,
				type: 'value',
				show: false,
				min: 0,
				max: 100,
				nameLocation: 'middle',
				nameGap: 5
			}],
			yAxis: [{
				gridIndex: 0,
				min: 0,
				show: false,
				max: 100,
				nameLocation: 'middle',
				nameGap: 30
			}],
			series: [{
				type: 'scatter',
				symbol: 'circle',
				symbolSize: 120,
				label: {
					normal: {
						show: true,
						formatter: '{b}',
						color: '#fff',
						textStyle: {
							fontSize: '20'
						}
					},
				},
				itemStyle: {
					normal: {
						color: '#00acea'
					}
				},
				data: datas
			}]
		})
	};

	//点击时间按钮组切换
	RadioGroupChange = (val) => {
		this.setState({
			dateValue:'',
			timeValue:val.target.value
		},() => {
			this.getData()
		})
	};

	//点击时间弹出框时间
	onRangePickerChange = (date,time) => {
		this.setState({
			startTime:time[0],
			endTime:time[1],
			timeValue:'',
			dateValue:[moment(time[0]),moment(time[1])]
		},() => {
			this.getData()
		})
	};

	//获取统计数据
	getData = () => {
		React.$axiosGet('datamontior.user-portrait.the-user-scales', {
			// startTime:this.state.startTime,
			startTime:moment(this.state.startTime).format('X'),
			// endTime:this.state.endTime,
			endTime:moment(this.state.endTime).format('X'),
			numberDays:this.state.timeValue,
		}).then(result => {
			this.setState({
				userRatioInfo: result.data.userRatio,
				sexRatioInfo: result.data.sexRatio
			},() => {
				this.initUserRatioChart();
				this.initSexRatioChart();
				console.log(this.state.sexRatioInfo);
			})
		})
	};

	//阻止用户选择未来的时间
	disabledDate = (current) => {
		return current && current > moment().endOf('day');
	}
}

export default userPortrait;