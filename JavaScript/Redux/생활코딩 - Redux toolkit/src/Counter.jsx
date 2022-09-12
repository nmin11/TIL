import { useDispatch, useSelector } from 'react-redux';
import { asyncUpFetch, up } from './counterSlice';

export default function Counter() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.value);
  const status = useSelector(state => state.counter.status);

  return (
    <div>
      <button onClick={() => dispatch(up(2))}>+</button>
      <button onClick={() => dispatch(asyncUpFetch())}>+ async fetch</button>
      <br/>
      <div>{count} | {status}</div>
    </div>
  )
}