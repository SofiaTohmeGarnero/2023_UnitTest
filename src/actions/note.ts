import { getCurrentMode, getNoteList, getSelection } from './selectors'

const noteEntry = {
  //@ts-ignore
  'entry:toggle:mode': ({ getState, dispatch }, { payload: { mode } }) => {
    const state = getState()
    const currentMode = getCurrentMode(state)
    const targetMode = currentMode === mode ? '' : mode
    dispatch({ type: 'note:toggle:mode', payload: { mode: targetMode } })
  },
  //@ts-ignore
  'entry:update:note': ({ getState, dispatch }, { payload: { note } }) => {
    const state = getState()
    const currentList = getNoteList(state)
    //@ts-ignore
    const indexToUpdate = currentList.findIndex((obj) => obj.nid === note.nid)
    if (indexToUpdate === -1) return

    currentList[indexToUpdate] = note
    dispatch({
      type: 'note:update:state',
      payload: { noteList: [...currentList] },
    })
  },
  //@ts-ignore
  'entry:update:color': ({ getState, dispatch }, { payload: { color } }) => {
    const state = getState()
    const currentList = getNoteList(state)
    const selection = getSelection(state)

    dispatch({ type: 'history:update:color', payload: { historyColor: color } })

    if (selection.length === 0) return
    const indexToUpdate = currentList.findIndex(
      //@ts-ignore
      (obj) => obj.nid === selection[0]
    )
    if (indexToUpdate === -1) return

    currentList[indexToUpdate] = { ...currentList[indexToUpdate], color }
    dispatch({
      type: 'note:update:state',
      payload: { noteList: [...currentList] },
    })
  },
  //@ts-ignore
  'entry:delete:note': ({ getState, dispatch }) => {
    const state = getState()
    const currentList = getNoteList(state)
    const selection = getSelection(state)

    const indexToUpdate = currentList.findIndex(
      //@ts-ignore
      (obj) => obj.nid === selection[0]
    )
    if (indexToUpdate === -1) return

    currentList.splice(indexToUpdate, 1)
    dispatch({
      type: 'note:update:state',
      payload: { noteList: [...currentList] },
    })
  },
  //@ts-ignore
  'entry:update:selection': ({ getState, dispatch }, { payload: { id } }) => {
    const state = getState()
    const selection = getSelection(state)

    if (selection.includes(id)) return
    dispatch({ type: 'selection:update:state', payload: { selection: [id] } })
  },
}

export default noteEntry;