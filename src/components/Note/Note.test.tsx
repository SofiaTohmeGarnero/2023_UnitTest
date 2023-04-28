import Note from './index'
import { screen, render } from '@testing-library/react'

const mockOnSelect = jest.fn()
const mockOnSave = jest.fn()
const mockOnEdit = jest.fn()
const mockProps = {
  note: {
    nid: '45',
    text: 'Hello',
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

describe('Note', () => {
  describe('when rendering default', () => {
    it('should show attribute "readonly"', () => {
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
    })
  })
  describe('when rendering after selecting the note editing', () => {
    it('should not show attribute "readonly"', () => {
      render(
        <Note
          key={mockProps.note.nid}
          note={mockProps.note}
          isEditing={true}
          isSelected={true}
          onSelect={mockProps.onSelect}
          onSave={mockProps.onSave}
          onEdit={mockProps.onEdit}
        />
      )
      const textArea = screen.getByPlaceholderText(/Type something.../)
      expect(textArea).not.toHaveAttribute('readonly', '')
    })
  })
})
