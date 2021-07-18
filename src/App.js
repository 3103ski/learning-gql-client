import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { Home, Login, Register, SinglePostPage } from './pages';
import { Nav } from './components';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute.jsx';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<Nav />
					<Route exact path='/' component={Home} />
					<AuthRoute exact path='/login' component={Login} />
					<AuthRoute exact path='/register' component={Register} />
					<Route exact path='/posts/:postId' component={SinglePostPage} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
