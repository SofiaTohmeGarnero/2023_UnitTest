import noteEntry from './note'
import { getCurrentMode, getNoteList, getSelection } from './selectors'

jest.mock('./selectors', () => {
  {
    getCurrentMode: jest.fn()
    getNoteList: jest.fn()
    getSelection: jest.fn()
  }
})

describe('Actions: noteEntry', () => {
  it('should have 5 actions', () => {
    expect(noteEntry).toHaveProperty('entry:toggle:mode')
    expect(noteEntry).toHaveProperty('entry:update:note')
    expect(noteEntry).toHaveProperty('entry:update:color')
    expect(noteEntry).toHaveProperty('entry:delete:note')
    expect(noteEntry).toHaveProperty('entry:update:selection')
  })
})
