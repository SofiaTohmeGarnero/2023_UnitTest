import {getCreatingDirection} from './utils'

describe('getCreatingDirection', ()=>{
    describe('when X>O and Y>0', ()=>{
        it('should return startX and startY', () =>{
            expect(getCreatingDirection({x:1,y:1,startX:2,startY:2,clientX:3,clientY:3})).toStrictEqual({ x: 2, y: 2 })
        })
    })
    describe('when X>O and Y<0', ()=>{
        it('should return startX and clientY', () =>{
            expect(getCreatingDirection({x:1,y:-1,startX:2,startY:2,clientX:3,clientY:3})).toStrictEqual({ x: 2, y: 3 })
        })
    })
    describe('when X<O and Y>0', ()=>{
        it('should return clientX and startY', () =>{
            expect(getCreatingDirection({x:-1,y:1,startX:2,startY:2,clientX:3,clientY:3})).toStrictEqual({ x: 3, y: 2 })
        })
    })
    describe('when X<O and Y<0', ()=>{
        it('should return clientX and clientY', () =>{
            expect(getCreatingDirection({x:-1,y:-1,startX:2,startY:2,clientX:3,clientY:3})).toStrictEqual({ x: 3, y: 3 })
        })
    })
})