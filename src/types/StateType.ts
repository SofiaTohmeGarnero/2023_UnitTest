import {NoteProps} from "../types/NodeType"
export interface IMode{
    mode: string,
    selection: string[],
    noteList: NoteProps[],
    historyColor: string
}
export interface IState {
    mode: IMode
}