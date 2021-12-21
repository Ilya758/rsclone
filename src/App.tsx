import { RootState } from './stores/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './stores/reducers/mock'

export function App() {
  const count = useSelector((state: RootState) => state.mock.value)
  const dispatch = useDispatch()
  
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default App;
