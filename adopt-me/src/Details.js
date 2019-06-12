import React from "react";
import { navigate } from "@reach/router";
import pet from "@frontendmasters/pet";
import Modal from "./Modal";
import Carousel from "./Carousel";
import DebugJson from "./DebugJson";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

// on class components, there is one hard requirement: to implement the render() method.
// also we can't use hooks (i.e. useState()) with class components (yet?),
// so we need to implement the lifecycle methods instead
class Details extends React.Component {
  // experimental feature:
  // public class properties (proposed for ES2019)
  state = {
    loading: true,
    showModal: false
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
        url: animal.url,
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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => navigate(this.state.url);

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
      const {
        animal,
        breed,
        location,
        description,
        name,
        media,
        showModal
      } = this.state;

      return (
        <div className="details">
          <Carousel media={media} />

          {/* eslint-disable-next-line */}
          <div onClick={e => console.log("it still logs!", e)}>
            <h1>{name}</h1>
            <h2>{`${animal} - ${breed} - ${location}`}</h2>
            {/* Context is weirder to use in class components */}
            <ThemeContext.Consumer>
              {([theme]) => (
                <button
                  onClick={this.toggleModal}
                  style={{ backgroundColor: theme.buttonColor }}
                >
                  Adopt {name}
                </button>
              )}
            </ThemeContext.Consumer>
            <p>{description}</p>
            {showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>
                      No, I am a monster
                    </button>
                  </div>
                </div>
              </Modal>
            ) : null}
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
