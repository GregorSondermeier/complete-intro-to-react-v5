import React, { useState } from "react";
import { ANIMALS } from "@frontendmasters/pet";

const SearchParams = () => {
  // this is a hook (introduced in React 16.8)
  // all hooks beginn with "use"
  // hooks never go inside of if statements or for loops because the order of hooks matters and has to be constant
  // react-hooks/rules-of-hooks
  // btw: this is ES6 destructuring; useState always return an array
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, setAnimal] = useState("dog");

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
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            value={animal}
            onChange={e => setAnimal(e.target.value)}
            onBlur={e => setAnimal(e.target.value)}
          >
            <option>All</option>
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
