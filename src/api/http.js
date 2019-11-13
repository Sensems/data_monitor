import axios from './service';
// const base = 'http://127.0.0.1:3030';
// const base = 'https://test.xuanwovip.com/addons/yun_shop/api.php';
// const base = 'http://192.168.99.20/addons/yun_shop/api.php';
const base = '/addons/yun_shop/api.php';

export function axiosPost(url,params) {
	params.route = url;
	return axios({
		method: 'post',
		// url: `${base}${url}`,
		url: `${base}`,
		data: params || {},
	})
}

export function axiosGet(url,params) {
	params.route = url;
	return axios({
		method: 'get',
		// url: `${base}${url}`,
		url: `${base}`,
		data: params || {},
	})
}