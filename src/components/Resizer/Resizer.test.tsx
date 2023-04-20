import Resizer from './index'
import React from 'react'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import './styles.scss'

const mockOnSave = jest.fn()
const mockOnMouseDown = jest.fn()

const mockProps = {
  className: 'note',
  style: {
    top: '306px',
    left: '264px',
    zIndex: 1,
    width: '291px',
    height: '200px',
    backgroundColor: 'rgb(251, 209, 75)',
  },
  note: {
    nid: '45',
    text: 'Hola mundo',
    color: '#cbe86b',
    x: 400,
    y: 400,
    z: 1,
    w: 400,
    h: 400,
  },
  isSelected: true,
  onSave: mockOnSave,
  onMouseDown: mockOnMouseDown,
}

describe('Resizer', () => {
  describe('when rendering with isSelected atributte set to true', () => {
    it('should render 8 direction elements with span tag', () => {
      render(
        <Resizer
          className={mockProps.className}
          style={mockProps.style}
          note={mockProps.note}
          isSelected={mockProps.isSelected}
          onSave={mockProps.onSave}
          onMouseDown={mockProps.onMouseDown}
        >
          <textarea placeholder="Type something..."></textarea>
        </Resizer>
      )
      expect(screen.getAllByRole(/data-direction/i)).toHaveLength(8)
    })
  })
  describe('when rendering with isSelected atributte set to false', () => {
    it('should not render any direction elements', () => {
      render(
        <Resizer
          className={mockProps.className}
          style={mockProps.style}
          note={mockProps.note}
          isSelected={false}
          onSave={mockProps.onSave}
          onMouseDown={mockProps.onMouseDown}
        >
          <textarea placeholder="Type something..."></textarea>
        </Resizer>
      )
      expect(screen.queryByRole(/data-direction/i)).not.toBeInTheDocument()
    })
  })
  describe('when clicking on a resizer-box', () => {
    it('shoud call onMouseDown function', async () => {
      render(
        <Resizer
          className={mockProps.className}
          style={mockProps.style}
          note={mockProps.note}
          isSelected={false}
          onSave={mockProps.onSave}
          onMouseDown={mockProps.onMouseDown}
        >
          <textarea placeholder="Type something..."></textarea>
        </Resizer>
      )
      // @ts-ignore
      const divTag: HTMLBodyElement = document.querySelector(
        'div[class="resizer-box note"]'
      )
      await userEvent.click(divTag)
      await waitFor(() => {
        expect(mockProps.onMouseDown).toHaveBeenCalledTimes(1)
      })
    })
  })
  describe('when using the mousedown event ', () => {
    describe('to the top direction', () => {
      it('should change the width to the required width', async () => {
        render(
          <Resizer
            className={mockProps.className}
            style={mockProps.style}
            note={mockProps.note}
            isSelected={mockProps.isSelected}
            onSave={mockProps.onSave}
            onMouseDown={mockProps.onMouseDown}
          >
            <textarea placeholder="Type something..."></textarea>
          </Resizer>
        )
        const topDirection = screen.getByTestId(/0-t/i)
        // @ts-ignore
        const divTag: HTMLBodyElement = document.querySelector(
          'div[class="resizer-box note"]'
        )
        await fireEvent.mouseDown(topDirection)
        await fireEvent.mouseMove(topDirection, {
          clientX: 200,
          clientY: 200,
        })
        await fireEvent.mouseUp(topDirection)
        const styles = getComputedStyle(divTag)
        await waitFor(() => {
          expect(styles.width).toBe('400px')
        })
      })
    })
    describe('to the right direction', () => {
      it('should change the width to the required width', async () => {
        render(
          <Resizer
            className={mockProps.className}
            style={mockProps.style}
            note={mockProps.note}
            isSelected={mockProps.isSelected}
            onSave={mockProps.onSave}
            onMouseDown={mockProps.onMouseDown}
          >
            <textarea placeholder="Type something..."></textarea>
          </Resizer>
        )
        const rightDirection = screen.getByTestId(/1-r/i)
        // @ts-ignore
        const divTag: HTMLBodyElement = document.querySelector(
          'div[class="resizer-box note"]'
        )
        await fireEvent.mouseDown(rightDirection)
        await fireEvent.mouseMove(rightDirection, {
          clientX: 200,
          clientY: 200,
        })
        await fireEvent.mouseUp(rightDirection)
        const styles = getComputedStyle(divTag)
        await waitFor(() => {
          expect(styles.width).toBe('600px')
        })
      })
    })
    describe('to the bottom direction', () => {
      it('should change the width to the required width', async () => {
        render(
          <Resizer
            className={mockProps.className}
            style={mockProps.style}
            note={mockProps.note}
            isSelected={mockProps.isSelected}
            onSave={mockProps.onSave}
            onMouseDown={mockProps.onMouseDown}
          >
            <textarea placeholder="Type something..."></textarea>
          </Resizer>
        )
        const bottomDirection = screen.getByTestId(/2-b/i)
        // @ts-ignore
        const divTag: HTMLBodyElement = document.querySelector(
          'div[class="resizer-box note"]'
        )
        await fireEvent.mouseDown(bottomDirection)
        await fireEvent.mouseMove(bottomDirection, {
          clientX: 200,
          clientY: 200,
        })
        await fireEvent.mouseUp(bottomDirection)
        const styles = getComputedStyle(divTag)
        await waitFor(() => {
          expect(styles.width).toBe('400px')
        })
      })
    })
    describe('to the left direction', () => {
      it('should change the width to the required width', async () => {
        render(
          <Resizer
            className={mockProps.className}
            style={mockProps.style}
            note={mockProps.note}
            isSelected={mockProps.isSelected}
            onSave={mockProps.onSave}
            onMouseDown={mockProps.onMouseDown}
          >
            <textarea placeholder="Type something..."></textarea>
          </Resizer>
        )
        const leftDirection = screen.getByTestId(/3-l/i)
        // @ts-ignore
        const divTag: HTMLBodyElement = document.querySelector(
          'div[class="resizer-box note"]'
        )
        await fireEvent.mouseDown(leftDirection)
        await fireEvent.mouseMove(leftDirection, {
          clientX: 200,
          clientY: 200,
        })
        await fireEvent.mouseUp(leftDirection)
        const styles = getComputedStyle(divTag)
        await waitFor(() => {
          expect(styles.width).toBe('200px')
        })
      })
    })
    describe('to the top-left direction', () => {
      it('should change the width to the required width', async () => {
        render(
          <Resizer
            className={mockProps.className}
            style={mockProps.style}
            note={mockProps.note}
            isSelected={mockProps.isSelected}
            onSave={mockProps.onSave}
            onMouseDown={mockProps.onMouseDown}
          >
            <textarea placeholder="Type something..."></textarea>
          </Resizer>
        )
        const topLeftDirection = screen.getByTestId(/4-tl/i)
        // @ts-ignore
        const divTag: HTMLBodyElement = document.querySelector(
          'div[class="resizer-box note"]'
        )
        await fireEvent.mouseDown(topLeftDirection)
        await fireEvent.mouseMove(topLeftDirection, {
          clientX: 200,
          clientY: 200,
        })
        await fireEvent.mouseUp(topLeftDirection)
        const styles = getComputedStyle(divTag)
        await waitFor(() => {
          expect(styles.width).toBe('200px')
        })
      })
    })
    describe('to the top-right direction', () => {
      it('should change the width to the required width', async () => {
        render(
          <Resizer
            className={mockProps.className}
            style={mockProps.style}
            note={mockProps.note}
            isSelected={mockProps.isSelected}
            onSave={mockProps.onSave}
            onMouseDown={mockProps.onMouseDown}
          >
            <textarea placeholder="Type something..."></textarea>
          </Resizer>
        )
        const topRightDirection = screen.getByTestId(/5-tr/i)
        // @ts-ignore
        const divTag: HTMLBodyElement = document.querySelector(
          'div[class="resizer-box note"]'
        )
        await fireEvent.mouseDown(topRightDirection)
        await fireEvent.mouseMove(topRightDirection, {
          clientX: 200,
          clientY: 200,
        })
        await fireEvent.mouseUp(topRightDirection)
        const styles = getComputedStyle(divTag)
        await waitFor(() => {
          expect(styles.width).toBe('600px')
        })
      })
    })
    describe('to the bottom-right direction', () => {
      it('should change the width to the required width', async () => {
        render(
          <Resizer
            className={mockProps.className}
            style={mockProps.style}
            note={mockProps.note}
            isSelected={mockProps.isSelected}
            onSave={mockProps.onSave}
            onMouseDown={mockProps.onMouseDown}
          >
            <textarea placeholder="Type something..."></textarea>
          </Resizer>
        )
        const bottomRightDirection = screen.getByTestId(/6-br/i)
        // @ts-ignore
        const divTag: HTMLBodyElement = document.querySelector(
          'div[class="resizer-box note"]'
        )
        await fireEvent.mouseDown(bottomRightDirection)
        await fireEvent.mouseMove(bottomRightDirection, {
          clientX: 200,
          clientY: 200,
        })
        await fireEvent.mouseUp(bottomRightDirection)
        const styles = getComputedStyle(divTag)
        await waitFor(() => {
          expect(styles.width).toBe('600px')
        })
      })
    })
    describe('to the bottom-left direction', () => {
      it('should change the width to the required width', async () => {
        render(
          <Resizer
            className={mockProps.className}
            style={mockProps.style}
            note={mockProps.note}
            isSelected={mockProps.isSelected}
            onSave={mockProps.onSave}
            onMouseDown={mockProps.onMouseDown}
          >
            <textarea placeholder="Type something..."></textarea>
          </Resizer>
        )
        const bottomLeftDirection = screen.getByTestId(/7-bl/i)
        // @ts-ignore
        const divTag: HTMLBodyElement = document.querySelector(
          'div[class="resizer-box note"]'
        )
        await fireEvent.mouseDown(bottomLeftDirection)
        await fireEvent.mouseMove(bottomLeftDirection, {
          clientX: 200,
          clientY: 200,
        })
        await fireEvent.mouseUp(bottomLeftDirection)
        const styles = getComputedStyle(divTag)
        await waitFor(() => {
          expect(styles.width).toBe('200px')
        })
      })
    })
  })
})
