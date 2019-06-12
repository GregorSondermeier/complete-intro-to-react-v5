import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import DebugJson from "./DebugJson";
import ErrorBoundary from "./ErrorBoundary";

// on class components, there is one hard requirement: to implement the render() method.
// also we can't use hooks (i.e. useState()) with class components (yet?),
// so we need to implement the lifecycle methods instead
class Details extends React.Component {
  // experimental feature:
  // public class properties (proposed for ES2019)
  state = {
    loading: true
  };

  constructor(props) {
    super(props);

    // because this is the first time the state is set, it is set directly instead of using this.setState()
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    // the props are immutable, because the child receives them from the parent
    pet.animal(this.props.id).then(({ animal }) => {
      // shallow merge: setState() basically does Object.assign (oldState, newState)
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false
      });
    }, console.error);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="details">
          <h1>loading ...</h1>

          <DebugJson title="props" obj={this.props} />
          <DebugJson title="state" obj={this.state} />
        </div>
      );
    } else {
      const { animal, breed, location, description, name, media } = this.state;

      return (
        <div className="details">
          <Carousel media={media} />

          <div>
            <h1>{name}</h1>
            <h2>{`${animal} - ${breed} - ${location}`}</h2>
            <button>Adopt {name}</button>
            <p>{description}</p>
          </div>

          <DebugJson title="props" obj={this.props} />
          <DebugJson title="state" obj={this.state} />
        </div>
      );
    }
  }
}

// wrap the Details component in an Error Boundary.
// use the Array spread syntax to avoid this.props.props inside the Details component.
export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
