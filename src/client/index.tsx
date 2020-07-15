import App from './App/App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './App/ConfigureStore';

const store = configureStore();

export const Root: React.FC = () =>
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>
;

ReactDOM.render(<Root />, document.getElementById('root'));
