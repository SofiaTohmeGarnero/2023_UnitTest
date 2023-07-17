import Note from './index'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import { ResizerProps } from '../Resizer'

const mockOnSelect = jest.fn()
const mockOnSave = jest.fn().mockImplementation((value) => {
  return (mockProps.note.text = value.text)
})
const mockOnEdit = jest.fn()
const mockProps = {
  note: {
    nid: '45',
    text: '',
    color: '#cbe86b',
    x: 400,
    y: 400,
    z: 1,
    w: 400,
    h: 400,
  },
  isEditing: false,
  isSelected: false,
  onSelect: mockOnSelect,
  onSave: mockOnSave,
  onEdit: mockOnEdit,
}

const newNote = {
  nid: '45',
  text: 'Hi Sofi',
  color: '#cbe86b',
  x: 400,
  y: 400,
  z: 1,
  w: 400,
  h: 400,
}

//TODO: mockear el componente de resizer
const mockResizerProps = jest.fn()

jest.mock('../Resizer', () =>
  jest.fn((props: ResizerProps) => {
    // Verificamos el correcto llamado de nuestras props en el SubComponentA
    mockResizerProps(props)

    return (
      <div role="resizer" onMouseDown={props.onMouseDown}>
        {props.isSelected && <span role="span" />}
        {props.children}
      </div>
    )
  })
)

describe('Note', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
})
  describe('when rendering default', () => {
    it('should show attribute "readonly" and should not show span tag', () => {
      render(
        <Note
          key={mockProps.note.nid}
          note={mockProps.note}
          isEditing={mockProps.isEditing}
          isSelected={mockProps.isSelected}
          onSelect={mockProps.onSelect}
          onSave={mockProps.onSave}
          onEdit={mockProps.onEdit}
        />
      )
      const textArea = screen.getByPlaceholderText(/Type something.../)
      expect(textArea).toHaveAttribute('readonly', '')
      expect(textArea).not.toHaveValue()
      expect(screen.queryByRole(/span/)).not.toBeInTheDocument()
    })
  })
  describe('when rendering after selecting the note editing', () => {
    it('should not show attribute "readonly" and show span tag', () => {
      render(
        <Note
          key={mockProps.note.nid}
          note={mockProps.note}
          isEditing={true}
          isSelected={true}
          onSelect={mockProps.onSelect}
          onSave={mockProps.onSave(newNote)}
          onEdit={mockProps.onEdit}
        />
      )
      const textArea = screen.getByPlaceholderText(/Type something.../)
      expect(textArea).not.toHaveAttribute('readonly', '')
      expect(textArea).toHaveValue('Hi Sofi')
      expect(screen.getByRole(/span/)).toBeInTheDocument()
    })
  })
  describe('when clicking and moving Resizer component', () => {
    it('should call ResizerProps one time when the note is not selected', async () => {
      render(
        <Note
          key={mockProps.note.nid}
          note={mockProps.note}
          isEditing={mockProps.isEditing}
          isSelected={mockProps.isSelected}
          onSelect={mockProps.onSelect}
          onSave={mockProps.onSave}
          onEdit={mockProps.onEdit}
        />
      )
      const resizer = screen.getByRole(/resizer/)
      fireEvent.mouseDown(resizer)
      fireEvent.mouseMove(resizer, {
        clientX: 200,
        clientY: 200,
      })
      fireEvent.mouseUp(resizer)
      await waitFor(() => {
        expect(mockResizerProps).toHaveBeenCalledTimes(1)        
      })
    })
    it('should call ResizerProps one time when the note is selected and edited', async () => {
      render(
        <Note
          key={mockProps.note.nid}
          note={mockProps.note}
          isEditing={true}
          isSelected={true}
          onSelect={mockProps.onSelect}
          onSave={mockProps.onSave(newNote)}
          onEdit={mockProps.onEdit}
        />
      )
      const resizer = screen.getByRole(/resizer/)
      fireEvent.mouseDown(resizer)
      fireEvent.mouseMove(resizer, {
        clientX: 200,
        clientY: 200,
      })
      fireEvent.mouseUp(resizer)
      await waitFor(() => {
        expect(mockResizerProps).toHaveBeenCalledTimes(1)        
      })
    })
  })
})
