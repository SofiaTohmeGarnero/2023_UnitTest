import mode from './mode'

const initialState = {
  mode: '',
  selection: [],
  noteList: [],
  historyColor: '#cbe86b',
}

const firstNote = {
  nid: '45',
  text: 'Hola mundo',
  color: '#cbe86b',
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
})
