# API

Spent a bit more then the recommended 4-5 hours on this, I usually find it difficult to drop coding if I'm not happy with the end result. 
I guess this way it has become a better excersise. I grabbed the opportunity and used TypeScript for the first time, I wanted to try it for a while now. The other somewhat selfish reason of mine was to produce a sort of boilerplate server for potencial future projects, which I managed to pull off.

While I was coding, countless times I had the feeling that my abstractions are just leading to a crazy maze of achieving the following:

```
app = restify()
app.use([restify.CORS(), ...restify.bodyParser()])
app.get('/prezis', (res, req) => {
  res.send(200, JSON.parse(fs.readFileSync('../data/prezis.json', 'utf8')))
})
```

### Architecture

The api basically has two main parts: the server and the services.
The server's responsability is to configure and spin up an http listener. Probably adding an adapter for the server is just too much, but I just thought I'll do it anyway for a proper separation. The server has two types of handlers: middlewares (for processing every incoming request), and route handlers (for specific paths). 
The services are input dependent, so they can be used in the server's handlers, this is why they are injected into that context. There's currently only one service, which handles the data retrieveal with some caching.
There's also a lib/utils folder, which nicely represents the recurring dilemma of any developer, namely the "Where should I put this function? Oh, I'll just dump it in there somewhere" problem :)

### Usage

There is a `/prezis` endpoint which currently returns all the provided data. It takes to optional url queries: search and sort. 

Search: `/prezis?search=Lorem+ipsum` - search takes an arbitrary string, and it will try to match it against data fields. Currently it supports only *title* search.

Sort: `/prezis?sort=createdAt` - sort takes a field name which data should be sorted by. Currently it has support only for the *createdAt* field.


### Test

Separate unit test for testing code in isolation, which assembles quite well with the functional style and well defined dependency injection points.
Integration tests - using a fake config but the real api, main criteria is to communicate through HTTP in these (okay, there's only one integration test in there).

### CI

The app is set up to deploy to [Heroku](https://pacific-harbor-98514.herokuapp.com/) after succeeding test in the gitlab CI pipeline.

### POSSIBLE FUTURE TODOS:
  * Fix issue: searched items are not being sorted
  * Change CORS to accept requests only from the client, when implemented
  * Review and generalize typescript naming conventions
  * Add logging
  * Streamify async data transform flows?
  * Update to use http2?
