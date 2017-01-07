export const get = ({storage}) => {
  console.log(storage)

  return (err, req, res) => {
    console.log('/prezis GET handler')
  }
}