// Context is stable since React v16.
// Sometimes you have a global application state, for instance user login information or a skin.
// We could do "prop drilling" where we would need to pass props from parent the child, then again to its child and so
// on and so on, which might be useful to see the flow, but it is annoying.
// Historically, Redux could solve this by having a data store on the side and feed all the information into the data
// store, and then every part of our application would read from the Redux store. But Redux is hard and often an
// overkill for this sort of things.
// Context is a new alternative where you can load data into a store that our whole application can use and update.
// However we introduce implicit dependencies as apposed to explicit ones.

import { createContext } from "react";

// stick a hook inside here.
// the empty arrow function is actually just a placeholder. The app will use this function if it has no provider above
// it, but this should never happen.
const ThemeContext = createContext(["green"], () => {});

export default ThemeContext;
