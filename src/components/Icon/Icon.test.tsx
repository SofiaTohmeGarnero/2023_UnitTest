import Icon from "./index";
import React from "react";
import { screen, render } from "@testing-library/react";

describe("Icon", () =>{
    it('should render the icon on screen', ()=>{
        render (<Icon iconName="toolbar/note" className="note-icon"/>);
        expect(screen.getByRole(/note-icon/i)).toBeInTheDocument();
    })
})