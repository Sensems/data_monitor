const defaultState = {
	token: '',
	code: 200
};

export default (state = defaultState, action) => {
	if(action.type === 'store_token') {
		let newState = JSON.parse(JSON.stringify(state));
		newState.token = action.value;
		return newState;
	}
	if(action.type === 'get_code') {
		let newState = JSON.parse(JSON.stringify(state));
		newState.code = action.value;
		return newState;
	}
	return state;
}