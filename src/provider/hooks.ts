/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import { BubbleContext } from './Provider'
import { BubbleStateManager } from './BubbleStateManager'

// for extracting the instance of the Bubble State Manager from the context.
export const useBubbleStateManager = <T>(): BubbleStateManager<T> => useContext(BubbleContext)

// hook that can access the state through the instance of the Bubble State Manager
// and attach a listener to track any changes in the component state.
export const useBubbleState = <T = any>() => {
  const stateManager = useBubbleStateManager<T>()
  const [state, setState] = useState(stateManager.getState())
  useEffect(() => {
    const listener = (newState: T) => {
      setState(newState)
    }
    stateManager.subscribe(listener)
    return () => {
      stateManager.unsubscribe(listener)
    }
  }, [])

  return state
}
