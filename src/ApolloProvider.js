import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';

const httpLink = createHttpLink({
	uri: 'http://localhost:5000/graphql',
});

const client = new ApolloClient({
	link: httpLink,
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
