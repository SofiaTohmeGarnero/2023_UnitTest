import ToolBar from './ToolBar'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockDispatch = jest.fn()

describe('ToolBar', () => {
  describe('when rendering default', () => {
    it('should show 2 icon buttons', () => {
      render(<ToolBar />)
      expect(screen.getAllByRole(/note-icon/i)).toHaveLength(2)
    })
    it('should show the first icon button active', () => {
      render(<ToolBar />)
      expect(screen.getAllByRole(/bar-icon/i)[0]).toHaveAttribute(
        'class',
        'bar-icon active'
      )
    })
  })
  describe("when rendering with 'note' mode", () => {
    it('should show the second icon button active and 5 data-color to chose the note color', () => {
      render(<ToolBar mode="note" />)
      expect(screen.getAllByRole(/bar-icon/i)[1]).toHaveAttribute(
        'class',
        'bar-icon active'
      )
      expect(screen.getAllByRole(/data-color/i)).toHaveLength(5)
    })
  })
  describe('when clicking the second icon button (note)', () => {
    it('should hit the dispatch: entry:toggle:mode ', async () => {
      render(<ToolBar dispatch={mockDispatch} />)
      const noteButton = screen.getAllByRole(/note-icon/i)[1]
      await userEvent.click(noteButton)
      await waitFor(() => {
        expect(mockDispatch).toBeCalledWith({
          type: 'entry:toggle:mode',
          payload: { mode: 'note' },
        })
      })
    })
  })
  describe('when clicking the first icon button (select)', () => {
    it('should hit the dispatch: note:toggle:mode', async () => {
      render(<ToolBar dispatch={mockDispatch} mode="note" />)
      const selectButton = screen.getAllByRole(/note-icon/i)[0]
      await userEvent.click(selectButton)
      await waitFor(() => {
        expect(mockDispatch).toBeCalledWith({
          type: 'note:toggle:mode',
          payload: { mode: '' },
        })
      })
    })
  })
  
})
