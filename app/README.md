# APP

Unfortunately ran out of time with doing the client stuff, the most fun part. Regardless, I'll try to get it done in the next couple of weeks as a fun excercise of trying out things I wanted to for a while.
For now, I've added only a few things from a previous project to help to get this started.

### Architecture

The app has / will have somewhat similar architecture to the API. The core folder has the logic. 
The services are created for interacting with things outside the redux app. 
The routes are like mini redux apps attached to their container component, they are self contained with their own set of actions, reducer and state management, but they are all attached to the main redux app. The container component is responsible for assembling the React components and passing them the props they need to render.
Components are just dumb, pure React components, not attached to the state management directly, they can make use only of dispatch handlers passed down to them. 

### TODOS
  * Build basics
  * Add unit tests
  * Implement http2
  * Add integration tests
  * Add some performance tests
  * Add end-to-end tests (I need more experience on this anyway)
  * Add service worker
  * Try to add the React app into a web worker thread, and make the main one only handle the renders?