import DesignView from './DesignView'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'

jest.mock('../../components/GirdCanvas', () => () => {
  return <canvas>GridCanvas</canvas>
})
jest.mock('../ToolBar', () => () => {
  return <div>ToolBar</div>
})
const firstNote = {
  nid: '45',
  text: '',
  color: '#cbe86b',
  x: 400,
  y: 400,
  z: 1,
  w: 400,
  h: 400,
}

const mockDispatch = jest.fn()

describe('DesignView', () => {
  describe('when rendering default', () => {
    it('should show GridCanvas and ToolBar components', () => {
      render(<DesignView noteList={[]} />)
      expect(screen.getByText(/GridCanvas/i)).toBeInTheDocument()
      expect(screen.getByText(/ToolBar/i)).toBeInTheDocument()
    })
  })
  describe('when rendering with note mode', () => {
    it('should show active class in the father container', () => {
      render(<DesignView noteList={[]} mode={'note'} />)
      expect(screen.getByTestId(/container/i)).toHaveAttribute(
        'class',
        'design-view active'
      )
    })
  })
  describe('when rendering with a note list', () => {
    it('should show Note component', () => {
      render(<DesignView noteList={[firstNote]} selection={['45']} />)
      expect(screen.getAllByRole(/data-direction/i)).toHaveLength(8)
      expect(
        screen.getByPlaceholderText(/Type something.../i)
      ).toBeInTheDocument()
    })
  })
  describe('when rendering with a note list that we want to delete', () => {
    it('should hit the dispatch: entry:delete:note', async () => {
      render(
        <DesignView
          noteList={[firstNote]}
          selection={['45']}
          dispatch={mockDispatch}
        />
      )
      const note = screen.getByRole(/note-container/i)
      await fireEvent.keyDown(note, {
        key: 'Delete',
        code: 'delete',
        keyCode: 46,
        charCode: 46,
      })
      await waitFor(() => {
        expect(mockDispatch).toBeCalledWith({
          type: 'entry:delete:note',
        })
      })
    })
  })
  describe('when clicking on the screen', () => {
    it('should hit the dispatch: selection:update:state', async () => {
      render(
        <DesignView
          noteList={[firstNote]}
          selection={['45']}
          dispatch={mockDispatch}
        />
      )
      const container = screen.getByTestId(/container/i)
      await fireEvent.mouseDown(container)
      await waitFor(() => {
        expect(mockDispatch).toBeCalledWith({
          type: 'selection:update:state',
          payload: { selection: [] },
        })
      })
    })
  })
  describe('when clicking on the screen with note mode', () => {
    it('should create a new note ', async () => {
      render(
        <DesignView
          mode={'note'}
          noteList={[firstNote]}
          selection={['45']}
          dispatch={mockDispatch}
        />
      )
      const container = screen.getByTestId(/container/i)
      await fireEvent.mouseDown(container)
      await waitFor(() => {
        expect(document.querySelector('div[id="createIn"]')).toBeInTheDocument()
      })
    })
  })
})
