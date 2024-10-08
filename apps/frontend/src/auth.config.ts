import { login } from './lib/db/queries';
import { isError } from './lib/utils';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const response = await login({
					email: credentials.email as string,
					password: credentials.password as string,
				});

				if (isError(response)) {
					throw new Error(response.error);
				}

				return {
					id: response.success.token,
					email: response.success.email,
				};
			},
		}),
	],
} satisfies NextAuthConfig;
