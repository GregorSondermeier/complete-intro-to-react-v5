import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./useDropdown";

// first, all the consts will be set
// second, the effect that calls the API will be scheduled after the render
// third, the rendering happens, so the user will already see stuff which makes for a quick application
// fourth (or later), the effect that calls the API is being run
const SearchParams = () => {
  // this is a hook (introduced in React 16.8)
  // all hooks beginn with "use"
  // hooks never go inside of if statements or for loops because the order of hooks matters and has to be constant
  // react-hooks/rules-of-hooks
  // btw: this is ES6 destructuring; useState always return an array
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []);
  }

  // useEffect is disconnected from when the render is happening
  // it is actually scheduling this function to run *after* the render happens
  // why? because you don't want to slow down the first render
  // the effect is only scheduled when animal, setBreed or setBreeds change
  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  // @todo: make the location input a select with the options 'Seattle, WA' and 'San Francisco, CA'
  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
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
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
