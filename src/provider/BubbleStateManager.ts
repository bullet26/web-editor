type StateListenerType<T> = (state: T, eventMeta?: any) => void

// This state manager has to implement the Observer pattern and, therefore, should have a list of observers (listeners)
// that will be notified when the state is changed
// Observer позволяет пасивно ожидать когда наступит событие, а не активно “опрашивать” произошло событие или нет

export class BubbleStateManager<T = any> {
  private state: T

  constructor(initState: T) {
    this.state = initState
  }

  getState() {
    return this.state
  }

  private listeners: Array<StateListenerType<T>> = []

  subscribe(listener: StateListenerType<T>) {
    this.listeners = [...this.listeners, listener]
  }

  unsubscribe(listener: StateListenerType<T>) {
    this.listeners = this.listeners.filter((l) => l !== listener)
  }

  updateState(newState: Partial<T>, eventMeta?: any) {
    this.state = { ...this.state, ...newState }
    // notify all listenres that state is changed
    this.listeners.forEach((l) => l(this.state, eventMeta))
  }
}
