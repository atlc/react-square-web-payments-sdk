import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Checkout from './views/Checkout';


const App = () => {
	return (
		<BrowserRouter>
			<main className="container my-5">
				<Routes>
					<Route path="/" element={<Checkout />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
};


export default App;
