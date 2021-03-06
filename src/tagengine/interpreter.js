const TagError = require('./TagError');

const interp = async (tokens, context, functions) => {
	const output = [];
	const errors = [];

	for (const token of tokens) {
		if (token.type === 'BRACKETGROUP') {
			const thisToken = token.value.shift();

			const func = functions.get(thisToken.value);

			const parseArgs = async (args, ctx) => {
				// this fucking mess parses subtags
				const parsed = [];

				for (const arg of args) {
					if (arg.type !== 'WORD') {
						const childOutput = await interp([arg], ctx || context, functions);

						parsed.push(childOutput.output);
						errors.push(...childOutput.errors);
					} else {
						parsed.push(arg.value);
					}
				}

				return parsed;
			};

			let args = token.value.map(a => ({
				...a[0],
				value: a[0].value.trim(),
			}));

			// pseudo "log" tag. not registered like normal because it's disabled in production and shouldn't be documented.
			if (thisToken.value === 'log' && process.env.NODE_ENV === 'development') {
				console.log(args);

				output.push('logged');

				continue;
			}

			if (func) {
				if (!func.info.dontParse) {
					args = await parseArgs(args);
				}

				if (func.info.dependencies && func.info.dependencies.some(k => !context[k])) {
					output.push(`{${thisToken.value}-MISSINGDEP}`);
				} else {
					try {
						const out = await func.execute({
							...context,
							parseArgs,
						}, args, {
							output,
							errors,
						});

						output.push(out);
					} catch (e) {
						if (process.env.NODE_ENV === 'development') {
							console.warn(e);
						}

						if (e instanceof TagError) {
							errors.push(e);
						} else {
							errors.push(new TagError(e));
						}

						output.push(`{${thisToken.value}-ERROR${errors.length}}`);
					}
				}

				continue;
			}

			output.push(`{${thisToken.value}-INVALID}`);

			continue;
		}

		output.push(token.value);
	}

	return {
		output: output.join(''),
		errors,
	};
};

module.exports = interp;
