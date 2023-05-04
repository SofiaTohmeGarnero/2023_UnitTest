import iconList from "./iconList";

describe('Constants', ()=>{
    it("should be 'toolbar/note' and 'toolbar/select'", ()=>{
        expect(iconList).toHaveProperty('toolbar/note');
        expect(iconList).toHaveProperty('toolbar/select');
    })
})