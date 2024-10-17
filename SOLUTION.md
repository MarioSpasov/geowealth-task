# Solution Docs

<!-- You can include documentation, additional setup instructions, notes etc. here -->

Project Structure
The main directory for the codebase is /src, which is organized into the following subdirectories:

/components
Contains all reusable components used throughout the project.

/features
Currently includes only one component, the Dashboard, which has its own route defined in App.js.

/hooks
Contains custom hooks created for the project. Currently, two hooks are defined:
One for fetching data related to US states.
Another for fetching GitHub user data.

/store
Contains the state management store. At the moment, it manages user preferences, which are stored locally in the browser's local storage. For better scalability and persistence, storing these preferences on a server would be a preferable option.

/types
Includes all of the TypeScript interfaces and enums used across the project to ensure type safety and better development experience.

/utils
Houses custom utility functions that are designed to be reusable across different parts of the project.
