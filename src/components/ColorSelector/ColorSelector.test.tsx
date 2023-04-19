import ColorSelector from './index'
import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import './styles.scss'

const mockFunction = jest.fn()
describe('ColorSelector', () => {
  describe('when rendering default', () => {
    it('should render the ColorSelector on screen', () => {
      render(<ColorSelector activeColor="#cbe86b" onSaveColor={mockFunction} />)
      expect(screen.getAllByRole(/data-color/i)).toHaveLength(5)
    })
  })
  describe('when clicking on a colour', () => {
    it('shoud call onSaveColor function', async () => {
      render(<ColorSelector activeColor="#cbe86b" onSaveColor={mockFunction} />)
      // @ts-ignore
      const colorBlue: HTMLBodyElement = document.querySelector(
        'span[data-color="#80d4f6"]'
      )
      await userEvent.click(colorBlue);
      await waitFor(() => {
        expect(mockFunction).toHaveBeenCalledTimes(1)
        expect(mockFunction).toHaveBeenNthCalledWith(1, '#80d4f6')
      })
    })
  })
})
