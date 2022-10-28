import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route path="login" element={<App />} />
			</Route>
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
);
