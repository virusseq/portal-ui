// TODO would love to use "node:url" but nextjs 12 is a massive blocker for that
import * as URI from 'uri-js';

// should ideally not validate `http` unless explicitly given as a possible protocol
const validateStringAsUrl = (candidate: string, protocols: string[] = ['https']) => {
	try {
		const urlToValidate = URI.parse(candidate);

		return protocols
			.map((proto: string) => proto.toLowerCase().replace(':', ''))
			.includes(urlToValidate?.scheme || '');
	} catch (err) {
		// TODO: should this do something more/else?
		return false;
	}
};

export default validateStringAsUrl;
