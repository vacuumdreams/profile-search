require('whatwg-fetch')
const serialize = require('form-serialize')
const {map, reduce} = require('ramda')

const fetchOpts = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

let $container

const createPrezi = data => `<li>${data.title}</li>`

const addPrezi = (html, prezi) => (html + createPrezi(prezi))

const writeDom = prezis => {
  $container.innerHTML = prezis
  $container.classList.remove('loading')
}

const fetchPrezis = url => {
  $container.classList.add('loading')
  fetch(url, fetchOpts)
    .then(res => res.json())
    .then(reduce(addPrezi, ''))
    .then(writeDom)
}

const formHandler = event => {
  event.preventDefault()
  fetchPrezis(`/prezis?${serialize(event.target)}`)
}

window.onload = () => {
  $container = document.getElementById('bpbp-prezis-list')

  document.getElementById('bpbp-prezis-sort')
    .addEventListener('submit', formHandler)

  document.getElementById('bpbp-prezis-search')
    .addEventListener('submit', formHandler)

  fetchPrezis('/prezis')
}
