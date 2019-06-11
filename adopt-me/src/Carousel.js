import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  // this is a special react method that must be static.
  // it takes in a set of props and gives back a new set of state
  static getDerivedStateFromProps({ media }) {
    const photos = media.length
      ? media.map(({ large }) => large)
      : ["http://placecorgi.com/600/600"];

    return { photos };
  }

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, idx) => (
            // don't do this on production: add click handlers onto buttons and stuff, *not* onto images.
            // eslint-a11y will mourn this, so we disable it for this time)
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={idx}
              src={photo}
              className={idx === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
