const Form = ({ data }) => {
  return (
    <>
      <form onSubmit={data.submitHandler}>
      <div>name: <input value={data.newName} onChange={data.nameHandler}/></div>
      <div>number: <input value={data.newNumber} onChange={data.numberHandler}/></div>
      <div>
        <button type="submit">
          add
        </button>
      </div>
      </form>
    </>
  )
}

export default Form