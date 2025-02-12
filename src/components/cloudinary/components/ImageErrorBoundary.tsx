import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback: React.ComponentType<{ error?: Error }>;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ImageErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ImageErrorBoundary] Error:', error);
    console.error('[ImageErrorBoundary] Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback;
      return <FallbackComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}


