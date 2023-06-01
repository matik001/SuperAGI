import ErrorPage from 'pages/ErrorPage';
import React from 'react';

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true, error: error };
	}
	override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.log(error);
		console.log(errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <ErrorPage error={this.state.error!} />;
		}

		return this.props.children;
	}
}
export default ErrorBoundary;
