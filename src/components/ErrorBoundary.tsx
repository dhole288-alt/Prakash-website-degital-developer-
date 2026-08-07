import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Unhandled error in app render tree:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-6">
          <div className="max-w-md text-center space-y-3">
            <h1 className="text-xl font-bold text-amber-400">Something went wrong</h1>
            <p className="text-sm text-slate-400">
              The page hit an unexpected error and couldn't render. Try refreshing the page.
            </p>
            <p className="text-xs text-slate-600 font-mono break-words">{this.state.error.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
