import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In real apps, send to monitoring here
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ padding: '2rem' }}>
          <div className="card">
            <h2>Something went wrong</h2>
            <p>Please try again. If the problem persists, refresh the page.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}


