import RealTimeData from '../view/realTimeData/realTimeData'
import UserTrajectory from '../view/userTrajectory/userTrajectory'
import UserData from '../view/userData/userData'
import UserPortrait from '../view/userPortrait/userPortrait'
import RegionalAnalysis from '../view/regionalAnalysis/regionalAnalysis'
import TerminalInformation from '../view/terminalInformation/terminalInformation'
import PageRanking from '../view/pageRanking/pageRanking'
import HeatMapAnalysis from '../view/heatMapAnalysis/heatMapAnalysis'
import PageDepth from '../view/pageDepth/pageDepth'

const routes = [
	{
		path: '/',
		component: RealTimeData,
		exact: true
	},
	{
		path: '/userTrajectory',
		component: UserTrajectory,
		exact: true
	},
	{
		path: '/userData',
		component: UserData,
		exact: true
	},
	{
		path: '/userPortrait',
		component: UserPortrait,
		exact: true
	},
	{
		path: '/regionalAnalysis',
		component: RegionalAnalysis,
		exact: true
	},
	{
		path: '/terminalInformation',
		component: TerminalInformation,
		exact: true
	},
	{
		path: '/pageRanking',
		component: PageRanking,
		exact: true
	},
	{
		path: '/heatMapAnalysis',
		component: HeatMapAnalysis,
		exact: true
	},
	{
		path: '/pageDepth',
		component: PageDepth,
		exact: true
	},
];

export default routes;