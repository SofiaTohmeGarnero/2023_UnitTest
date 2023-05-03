import mode from './mode'

const initialState = {
  mode: '',
  selection: [],
  noteList: [],
  historyColor: '#cbe86b',
}

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
const updatedNote = {
  nid: '45',
  text: 'Hello world',
  color: '#f1bbba',
  x: 400,
  y: 400,
  z: 1,
  w: 400,
  h: 400,
}

const addNoteState = {
  mode: '',
  selection: [],
  noteList: [firstNote],
  historyColor: '#cbe86b',
}

const toggleModeState = {
  mode: 'note',
  selection: [],
  noteList: [],
  historyColor: '#cbe86b',
}

const selectedNoteState = {
  mode: '',
  selection: ['45'],
  noteList: [firstNote],
  historyColor: '#cbe86b',
}

const updateColorState = {
  mode: '',
  selection: [],
  noteList: [],
  historyColor: '#f1bbba',
}

const updatedNoteState = {
  mode: '',
  selection: [],
  noteList: [updatedNote],
  historyColor: '#cbe86b',
}

describe('Reducer: mode', () => {
  describe('when passed an empty action', () => {
    it('should return the initial state', () => {
      expect(mode(undefined, {})).toEqual(initialState)
    })
  })
  describe('when passed note:add:state action', () => {
    it('should return new note in the noteList array', () => {
      expect(
        mode(initialState, {
          type: 'note:add:state',
          payload: {
            note: firstNote,
          },
        })
      ).toEqual(addNoteState)
    })
  })
  describe('when passed note:toggle:mode action', () => {
    it('should return updated mode in the mode field', () => {
      expect(
        mode(initialState, {
          type: 'note:toggle:mode',
          payload: {
            mode: 'note',
          },
        })
      ).toEqual(toggleModeState)
    })
  })
  describe('when passed selection:update:state action', () => {
    it("should return the id of the note selected in the selection field", () => {
      expect(
        //@ts-ignore
        mode(addNoteState, {
          type: 'selection:update:state',
          payload: {
            selection: [firstNote.nid],
          },
        })
      ).toEqual(selectedNoteState)
    })
  })
  describe('when passed history:update:color action', () => {
    it('should return updated color in the historyColor field', () => {
      expect(
        mode(initialState, {
          type: 'history:update:color',
          payload: {
            historyColor: '#f1bbba',
          },
        })
      ).toEqual(updateColorState)
    })
  })
  describe('when passed note:update:state action', () => {
    it("should return the id of the note selected in the selection field", () => {
      expect(
        //@ts-ignore
        mode(addNoteState, {
          type: 'note:update:state',
          payload: {
            noteList: [updatedNote],
          },
        })
      ).toEqual(updatedNoteState)
    })
  })
})
