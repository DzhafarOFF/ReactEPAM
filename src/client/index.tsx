import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './App/ConfigureStore';

const store = configureStore();

export const Root: React.FC = () =>
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
;

ReactDOM.render(<Root />, document.getElementById('root'));
