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

const createPrezi = data => 
  `<li class='bpbp-item'>
    <div class="bpbp-item-wrapper">
      <img class='bpbp-item-image' src='${data.thumbnail}'>
      <div class='bpbp-item-created'>
        <svg class="bpbp-icon">
          <use xlink:href="#time" />
        </svg>
        <span>${data.createdAt}</span>
      </div>
      <a class='bpbp-item-creator' href='${data.creator.profileUrl}' target='blank'>
        <svg class="bpbp-icon">
          <use xlink:href="#pen" />
        </svg>
        <span>${data.creator.name}</span>
      </a>
    </div>
    <p class='bpbp-item-title'>${data.title}</p>
  </li>`

const addPrezi = (html, prezi) => (html + createPrezi(prezi))

const writeDom = prezis => ($container.innerHTML = prezis)

const fetchPrezis = url => {
  $container.classList.add('loading')
  fetch(url, fetchOpts)
    .then(res => res.json())
    .then(reduce(addPrezi, ''))
    .then(writeDom)
    .then(() => $container.classList.remove('loading'))
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
