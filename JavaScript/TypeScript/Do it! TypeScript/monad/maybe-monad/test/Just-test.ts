import { identity } from 'ramda';
import { Just } from '../classes/Just';

console.log(
  Just.of(100).isJust(),                                // true
  Just.of(100).isNothing(),                             // false
  Just.of(100).getOrElse(1),                 // 100
  Just.of(100).map(identity).getOrElse(1),   // 100
  Just.of(identity).ap(100).getOrElse(1),       // 100
  Just.of(100).chain(Just.of).getOrElse(1)   // 100
);