const TagError = require('../TagError');
const randomInt = require('../../../lib/utils/randomInt');

module.exports = async (x, [min, max]) => {
	if (!min) {
		throw new TagError('No minimum value');
	}

	if (!isFinite(min)) {
		throw new TagError('Minimum must be a number.');
	}
	if (!max) {
		throw new TagError('No maximum value');
	}

	if (!isFinite(max)) {
		throw new TagError('Maximum must be a number.');
	}

	return randomInt(Number(min), Number(max));
};

module.exports.info = {
	name: 'range',
	args: '[min] [max]',
	description: 'Gets a number between [min] and [max].',
	examples: [{
		input: '{range;5;10}',
		output: '7',
	}, {
		input: '{range;0;100}',
		output: '69',
	}],
	dependencies: [],
};
