import React, { useState } from "react";

const SearchParams = () => {
  // this is a hook (introduced in React 16.8)
  // all hooks beginn with "use"
  // hooks never go inside of if statements or for loops because the order of hooks matters and has to be constant
  // btw: this is ES6 destructuring; useState always return an array
  const [location, setLocation] = useState("Seattle, WA");

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form>
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
