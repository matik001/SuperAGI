import LogsPage from 'pages/LogsPage';
import NotFoundPage from 'pages/NotFoundPage';
import TestPage from 'pages/TestPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<TestPage />} />
				<Route path="/logs/:logKey" element={<LogsPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
