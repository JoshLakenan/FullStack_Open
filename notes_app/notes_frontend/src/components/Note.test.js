import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />) // render the note component with the note object passed to it

  screen.debug() //print HTML to the console


  const element = screen.getByText('Component testing is done with react-testing-library')
  //check if there is an element that has the note content, and ensure it exists
  expect(element).toBeDefined()
})


test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = jest.fn() // a mock function defined with jest

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const user = userEvent.setup() //A session is started to interact with the rendered component:
  const button = screen.getByText('make not important') //The test finds the button based on the text from the rendered component and clicks the element:
  await user.click(button) //Clicking happens with the method click of the userEvent-library.

  expect(mockHandler.mock.calls).toHaveLength(1) //The expectation of the test verifies that the mock function has been called exactly once.
})