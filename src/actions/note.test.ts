import noteEntry from './note'
import { getCurrentMode, getNoteList, getSelection } from './selectors'

const initialState = {
  mode: '',
  selection: [],
  noteList: [],
  historyColor: '#cbe86b',
}

const note = {
  nid: '45',
  text: 'Hello',
  color: '#cbe86b',
  x: 400,
  y: 400,
  z: 1,
  w: 400,
  h: 400,
}

const initialStateWithNote = {
  mode: 'note',
  selection: [],
  noteList: [note],
  historyColor: '#cbe86b',
}
const initialStateWithSelection = {
  mode: 'note',
  selection: ['45'],
  noteList: [note],
  historyColor: '#cbe86b',
}
const initialStateWithSelectionDiffToNoteId = {
  mode: 'note',
  selection: ['87'],
  noteList: [note],
  historyColor: '#cbe86b',
}

jest.mock('./selectors', () => {
  return {
    getCurrentMode: jest.fn((initialState) => initialState.mode),
    getNoteList: jest.fn((initialState) => initialState.noteList),
    getSelection: jest.fn((initialState) => initialState.selection),
  }
})

const getState = jest.fn()
const dispatch = jest.fn()

describe('Actions: noteEntry', () => {
  beforeEach(()=>{
    getState.mockClear()
    dispatch.mockClear()
  })
  it('should have 5 actions', () => {
    expect(noteEntry).toHaveProperty('entry:toggle:mode')
    expect(noteEntry).toHaveProperty('entry:update:note')
    expect(noteEntry).toHaveProperty('entry:update:color')
    expect(noteEntry).toHaveProperty('entry:delete:note')
    expect(noteEntry).toHaveProperty('entry:update:selection')
  })
  describe('when calling entry:toggle:mode', () => {
    it("should hit the dispatch: note:toggle:mode with mode: 'note' ", () => {
      getState.mockReturnValue(initialState)
      noteEntry['entry:toggle:mode'](
        { getState, dispatch },
        { payload: { mode: 'note' } }
      )
      expect(dispatch).toBeCalledWith({
        type: 'note:toggle:mode',
        payload: { mode: 'note' },
      })
    })
    it("should hit the dispatch: note:toggle:mode with mode: '' ", () => {
      getState.mockReturnValue(initialStateWithNote)
      noteEntry['entry:toggle:mode'](
        { getState, dispatch },
        { payload: { mode: 'note' } }
      )
      expect(dispatch).toBeCalledWith({
        type: 'note:toggle:mode',
        payload: { mode: '' },
      })
    })
  })
  describe('when calling entry:update:note', () => {
    it('should hit the dispatch: note:update:state', () => {
      getState.mockReturnValue(initialStateWithNote)
      noteEntry['entry:update:note'](
        { getState, dispatch },
        { payload: { note: note } }
      )
      expect(dispatch).toBeCalledWith({
        type: 'note:update:state',
        payload: { noteList: [note] },
      })
    })
    it('shouldn´t hit any dispatch', () => {
      getState.mockReturnValue(initialState)
      noteEntry['entry:update:note'](
        { getState, dispatch },
        { payload: { note: note } }
      )
      expect(dispatch).not.toBeCalled()
    })
  })
  describe('when calling entry:update:color', () => {
    it('should hit the dispatch: history:update:color but shouldn´t hit the second dispatch because there isn´t selection', () => {
      getState.mockReturnValue(initialState)
      noteEntry['entry:update:color'](
        { getState, dispatch },
        { payload: { color: '#cbe86b' } }
      )
      expect(dispatch).toBeCalledWith({
        type: 'history:update:color',
        payload: { historyColor: '#cbe86b' },
      })
      /** No se ejecuta el 2° dispatch porque selection.length === 0 */
      expect(dispatch).toBeCalledTimes(1)
    })
    it('should hit the dispatch: history:update:color but shouldn´t hit the second dispatch because note id is different to the selection', () => {
      getState.mockReturnValue(initialStateWithSelectionDiffToNoteId)
      noteEntry['entry:update:color'](
        { getState, dispatch },
        { payload: { color: '#cbe86b' } }
      )
      expect(dispatch).toBeCalledWith({
        type: 'history:update:color',
        payload: { historyColor: '#cbe86b' },
      })
      /** No se ejecuta el 2° dispatch porque obj.nid !== selection[0] => 45 !== 87 => indexToUpdate === -1*/
      expect(dispatch).toBeCalledTimes(1)
    })
    it('should hit the dispatch: history:update:color and the dispatch: note:update:state', () => {
      getState.mockReturnValue(initialStateWithSelection)
      noteEntry['entry:update:color'](
        { getState, dispatch },
        { payload: { color: '#cbe86b' } }
      )
      expect(dispatch).toBeCalledWith({
        type: 'note:update:state',
        payload: { noteList: [...initialStateWithSelection.noteList] },
      })
    })
  })
  describe('when calling entry:delete:note', () => {
    it('should hit the dispatch: note:update:state', () => {
      getState.mockReturnValue(initialStateWithSelection)
      noteEntry['entry:delete:note'](
        { getState, dispatch }
      )
      expect(dispatch).toBeCalledWith({
        type: 'note:update:state',
        payload: { noteList: [...initialStateWithSelection.noteList] },
      })
    })
    it('shouldn´t hit any dispatch', () => {
      getState.mockReturnValue(initialState)
      noteEntry['entry:delete:note'](
        { getState, dispatch }
      )
      expect(dispatch).not.toBeCalled()
    })
  })
  describe('when calling entry:update:selection', () => {
    it('should hit the dispatch: selection:update:state', () => {
      getState.mockReturnValue(initialStateWithSelection)
      noteEntry['entry:update:selection'](
        { getState, dispatch },
        { payload: { id: '136' } }
      )
      expect(dispatch).toBeCalledWith({
        type: 'selection:update:state',
        payload: { selection: ['136'] },
      })
    })
    it('shouldn´t hit any dispatch', () => {
      getState.mockReturnValue(initialStateWithSelection)
      noteEntry['entry:update:selection'](
        { getState, dispatch },
        { payload: { id: '45' } }
      )
      expect(dispatch).not.toBeCalled()
    })
  })
})
