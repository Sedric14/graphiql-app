import React, { Component, ReactNode } from 'react';
import SystemErrorPage from '../../routes/ErrorPage/SystemErrorPage';

interface ErrorBoundaryState {
  hasError: boolean;
  msg: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      msg: '',
    };
  }

  static getDerivedStateFromError(err: Error): ErrorBoundaryState {
    return { hasError: true, msg: err.message };
  }

  componentDidCatch(error: Error): void {
    this.setState({
      msg: error.message,
    });
  }

  render(): ReactNode {
    const { children } = this.props;
    const { hasError, msg } = this.state;

    if (hasError) {
      return <SystemErrorPage msg={msg} />;
    }

    return children;
  }
}
