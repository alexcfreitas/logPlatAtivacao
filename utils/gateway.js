'use strict';

const _ = require('lodash');
const axios = require('axios');

const exec = async (url, data) => {
	const axiosInstance = await getAxiosBarramento();
	const result = await axiosInstance.post(url, data);
	return result.data;
};

const getAxiosBarramento = async () => {
	return axios.create({
		headers: {
			'x-api-key': 'i8cDZsix5D99b077dKEW44HZbekmUGOW9O8p1yYJ',
			'Content-Type': 'application/json'
		}
	});
};

module.exports = {
	exec
};
