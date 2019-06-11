import React from "react";

/**
 * debug component to render an object stringified in a <pre>
 */
class DebugJson extends React.Component {
  state = {
    title: null,
    obj: null
  };

  componentDidMount() {
    this.setState({
      title: this.props.title,
      obj: this.props.obj
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        title: this.props.title,
        obj: this.props.obj
      });
    }
  }

  render() {
    const { title, obj } = this.state;

    if (obj) {
      return (
        <div className="debug-json">
          <h3>{title}</h3>
          <pre>
            <code>{JSON.stringify(obj, null, 2)}</code>
          </pre>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default DebugJson;
