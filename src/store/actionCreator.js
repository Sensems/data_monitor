import actionTypes from './ActionTypes'

const actionCreator = {
	storeToken: (value) => ({
		type: actionTypes.STORE_TOKEN,
		value: value
	}),
	getCode: (value) => ({
		type: actionTypes.GET_CODE,
		value: value
	}),
};

export default actionCreator;