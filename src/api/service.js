import axios from 'axios'
import store from '../store'
import { Modal } from 'antd';
const { confirm } = Modal;

/*let CancelToken = axios.CancelToken;*/
axios.create({
	timeout: 15000 ,// 请求超时时间
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	}
});


//开始请求设置，发起拦截处理
axios.interceptors.request.use(config => {
	let token = window.localStorage.getItem('token');
	if (token) {
		config.headers.token = token;
	}
	if (store.getState().code === 401) {
		window.localStorage.removeItem('token');
		confirm({
			title: '提示!',
			content: '你没有权限操作',
			centered: true,
			onOk() {
				window.location.href="https://test.xuanwovip.com/admin/shop?route=survey.survey.index&uniacid=2"
			},
			onCancel() {
				window.location.href="https://test.xuanwovip.com/admin/shop?route=survey.survey.index&uniacid=2"
			},
		});
		return false
	}

	if(config.method === 'post') {
		// let data = JSON.parse(config.data);
		let data = config.data;
		config.data = {
			i:2,
			type: 5,
			...data
		}
	} else if(config.method === 'get') {
		config.params = {
			i:2,
			type: 5,
			...config.data
		}
	}
	return config;
}, error => {
	return Promise.reject(error);
});

axios.interceptors.response.use(
		response => {
			if (response.data.data.code === 401) {
				window.localStorage.removeItem('token');
				confirm({
					title: '提示!',
					content: '你没有权限操作',
					centered: true,
					onOk() {
						window.location.href="https://test.xuanwovip.com/admin/shop?route=survey.survey.index&uniacid=2"
					},
					onCancel() {
						window.location.href="https://test.xuanwovip.com/admin/shop?route=survey.survey.index&uniacid=2"
					},
				});
				return {data:{code:401}}
			}
			return response.data
		},
		error => {
			return Promise.reject(error)
		}
);

export default axios