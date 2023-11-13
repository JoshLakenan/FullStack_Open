const Filter = ({ data }) => {
  return (
    <div>
    filter shown with <input value={data.search} onChange={data.searchHandler}></input>
    </div>
  )
}

export default Filter