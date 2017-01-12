import adapter from "./adapters"

const serviceStorage = adapter(localStorage)

export {
  serviceStorage,
}
