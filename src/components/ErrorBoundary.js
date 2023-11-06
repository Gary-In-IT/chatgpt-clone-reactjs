import React from 'react'

class ErrorBoundary extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  //called whenever an error is thrown in a child component
  static getDerivedStateFromError(error) {
    // console.log("getDerivedStateFromError")
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something is wonky, boss.</h1>;
    }
    
    return this.props.children;
  }
   
} 

export default ErrorBoundary 