import { current } from '@reduxjs/toolkit'
import GridCanvas from './index'
import { screen, render, renderHook } from '@testing-library/react'
import React, { useRef } from 'react'

jest.mock('react', () => {
  return {
    ...jest.requireActual<typeof React>('react'),
    useRef: jest.fn(),
  }
})

//@ts-ignore
useRef.mockImplementation(() => ({
  current: { width: 1036, height: 937 },
}))

describe('GridCanvas', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('when rendering default', () => {
    it('should show canvas tag', () => {
      render(<GridCanvas />)
      const canvas = screen.getByRole(/canvas-tag/i)
      expect(canvas).toBeInTheDocument()
    })
    it('should call useRef one time', () => {
      render(<GridCanvas />)
      expect(useRef).toBeCalledTimes(1)
    })
  })
})
