import { getNoteList, getCurrentMode, getSelection, getHistoryColor } from './selectors'

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
const noteState = {
  mode: {
    mode: '',
    selection: ['45'],
    noteList: [firstNote],
    historyColor: '#cbe86b',
  },
}
describe('Selectors', () => {
  describe('when use getNoteList', () => {
    it('should return the note list', () => {
      expect(getNoteList(noteState)).toEqual([firstNote])
    })
  })
  describe('when use getCurrentMode', () => {
    it('should return the current mode', () => {
      expect(getCurrentMode(noteState)).toEqual('')
    })
  })
  describe('when use getSelection', () => {
    it('should return the current selection', () => {
      expect(getSelection(noteState)).toEqual(['45'])
    })
  })
  describe('when use getHistoryColor', () => {
    it('should return the current color', () => {
      expect(getHistoryColor(noteState)).toEqual('#cbe86b')
    })
  })
})
