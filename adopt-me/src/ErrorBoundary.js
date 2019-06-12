// mostly code from reactjs.org/docs/error-boundaries.html
//
// error boundaries are one of the few things that hooks cannot do;
// we cannot do error boundaries without doing classes.
//
// if we're working with an API, some of these responses could potentially have errors inside of them.
// we don't control the API, it's coming from a third party.
// so we would want to be extra careful with handling errors and handling malformed data.
// so error boundaries will allow us to capture some of these errors without crashing our application.

import React, { Component } from "react";
import { Link } from "@reach/router";

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  /**
   * if we would have something here like Azure Monitor, Sentry or TrackJS,
   * we would send something to that logging service.
   */
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing.
          <Link to="/">Click here</Link> to go back to the home page or wait
          five seconds.
        </h1>
      );
    } else {
      // otherwise pass through all the components that are coming through.
      // this.props.children is going to be everything that is inside of this component
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
