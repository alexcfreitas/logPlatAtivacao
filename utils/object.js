const _ = require('lodash');

const renameKeys = (obj, map) => {
	return _.reduce(
		map,
		(result, value, key) => {
			result[key] = _.isFunction(map[key])
				? map[key].call()
				: _.isObject(map[key])
				? renameKeys(obj, value)
				: _.get(obj, value);
			return result;
		},
		{}
	);
};

module.exports = {
	renameKeys
};
