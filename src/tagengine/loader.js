const path = require('path');
const walkSync = require('./../../lib/utils/walkSync');

/**
 * Loads tags from the tag directory into a nice phat map
 * @returns {Map<Object>} The valid tags
 */
module.exports = () => {
	const files = walkSync(path.join(__dirname, '/tags'));

	const tags = new Map();

	for (const file of files.filter(f => !f.startsWith('-') && !f.endsWith('middleware.js'))) {
		const tag = require(file);

		tags.set(tag.info.name, {
			info: tag.info,
			execute: tag,
		});
	}

	return tags;
};
