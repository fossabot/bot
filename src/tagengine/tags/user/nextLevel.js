const middleware = require('./middleware');
const xputil = require('../../../../lib/xputil');

module.exports = middleware(async ({ user, guild, Atlas }) => {
	if (user.bot) {
		throw new Error('Bots cannot have XP profiles.');
	}

	const profile = await Atlas.DB.getProfile(user.id);

	const guildProfile = profile.guilds.find(({ id }) => id === guild.id);
	const xp = guildProfile ? guildProfile.xp : 0;

	const xpProfile = xputil.getUserXPProfile(xp);

	return xpProfile.next.level;
});

module.exports.info = {
	name: 'user.nextLevel',
	description: 'Gets the user\'s next level.',
	args: '<user>',
	examples: [{
		input: '{user.level}',
		output: '2',
	}],
	dependencies: ['user', 'guild'],
};
