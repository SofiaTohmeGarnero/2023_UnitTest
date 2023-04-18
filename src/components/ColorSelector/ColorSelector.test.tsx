import ColorSelector from "./index";
import React from "react";
import { screen, render } from "@testing-library/react";
import './styles.scss';

const mockFunction = jest.fn();
describe("ColorSelector", () =>{
    it('should render the ColorSelector on screen', ()=>{
        render (<ColorSelector activeColor='#cbe86b' onSaveColor={mockFunction}/>);
        expect(screen.getAllByRole(/data-color/i)).toHaveLength(5);
    })
})