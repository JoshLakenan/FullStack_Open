const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (

    <li className='note'>
      <span>{note.content}</span>
      <button className='importance' onClick={toggleImportance}>{label}</button>
      <button className='delete' onClick={deleteNote}>Delete</button>
    </li>
  )
}

export default Note