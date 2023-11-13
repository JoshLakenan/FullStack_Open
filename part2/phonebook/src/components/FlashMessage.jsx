const FlashMessage = ({ message }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (!message) {
    return (
      <>
      </>
    )
  } else {
    return (
      <div style={message.status === 'success'? successStyle : errorStyle}>
        {message.text}
      </div>
    )
  }
}


export default FlashMessage