import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from 'components/Error/ErrorBoundary';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppThemeProvider from 'setup/AppThemeProvider';
import './index.css';
import Router from './setup/router/router';
import AppTranslationsProvider from 'setup/AppTranslationsProvider';

const init = async () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnReconnect: false,
				refetchOnWindowFocus: false,
				refetchInterval: false,
				refetchOnMount: false,
				retry: 3
			}
		}
	});
	ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		<React.StrictMode>
			<AppTranslationsProvider>
				<QueryClientProvider client={queryClient}>
					<AppThemeProvider>
						<ErrorBoundary>
							<Router />
						</ErrorBoundary>

						<ReactQueryDevtools initialIsOpen={false} />
						<ToastContainer position="bottom-right" />
					</AppThemeProvider>
				</QueryClientProvider>
			</AppTranslationsProvider>
		</React.StrictMode>
	);
};

init();
