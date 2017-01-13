const wrap = data => (data || {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data),
})

module.exports = (url, data) => 
  fetch(url, wrap(data))
