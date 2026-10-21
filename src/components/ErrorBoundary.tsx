import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen bg-slate-50 flex items-center justify-center p-6"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-md w-full bg-white rounded-card border border-slate-200 shadow-card p-8 text-center">
            <div className="w-14 h-14 rounded-card bg-danger-50 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-danger-500" aria-hidden />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-2">Something went wrong</h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              The app hit an unexpected error. You can try continuing or reload to reset the UI state.
              Your study progress is saved in this browser.
            </p>
            {this.state.error?.message && (
              <pre className="text-left text-xs text-slate-500 bg-slate-50 rounded-btn p-3 mb-5 overflow-x-auto max-h-28">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                onClick={this.handleReset}
                className="px-4 py-2 rounded-btn text-sm font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 min-h-touch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={this.handleReload}
                className="px-4 py-2 rounded-btn text-sm font-medium bg-brand-500 text-white hover:bg-brand-600 min-h-touch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Reload app
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
