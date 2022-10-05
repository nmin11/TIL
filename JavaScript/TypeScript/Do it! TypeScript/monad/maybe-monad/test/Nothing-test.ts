import { Nothing } from '../classes/Nothing';

console.log(
  Nothing.of().isJust(),
  Nothing.of().isNothing()
)