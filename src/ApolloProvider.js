import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
	uri: 'https://morning-dawn-57081.herokuapp.com/graphql',
});

const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken');
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const Provider = () => {
	return (
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	);
};

export default Provider;
