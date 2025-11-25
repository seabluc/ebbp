// Component Test
import { render, screen } from '@testing-library/react'
import Home from '@/app/delete/page'

// There is a pattern for writing tests. Triple A pattern (AAA) example:
// it('should have Ye text', () => {
//   render(<Home />) // ARRANGE - arrange everything for the test

//   const myElem = screen.getByText('Ye') // ACTION - take an action

//   expect(myElem).toBeInTheDocument() // ASSERTION - check if everything is expected
// })

// So what does this AAA pattern test do?
// It first ARRANGES the test by rendering the Home component and checking to see if the text 'testing for' exists
// We then ACT to actually test this by using screen.getByText('testing for')
// Lastly, we check our ASSERTION to see if our test is correct by checking if the text is in the document as expected

// To test multiple tests for the same components, wrap everything in describe()
describe('Home', () => {
  // Test if Home component has the text 'Ye'
  it('should have the text "Ye"', () => {
    render(<Home />)

    const myElem = screen.getByText('Ye')

    expect(myElem).toBeInTheDocument()
  })

  // Test if Home contains the text 'wawaweewa', case-insensitive via reg exp
  it('should contain the text "wawaweewa"', () => {
    render(<Home />)

    const myElem = screen.getByText(/wawaweewa/i)

    expect(myElem).toBeInTheDocument()
  })

  // Test if Home has a heading element that specifically has the text 'testing'
  it('should have a heading', () => {
    render(<Home />)

    const myElem = screen.getByRole('heading', {
      name: 'testing'
    })

    expect(myElem).toBeInTheDocument()
  })

  // Test if Home has a heading element that is specifically a h2 tag
  it('should have a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', { level: 2 })

    expect(heading).toBeInTheDocument()
  })
})
