import { view, lensProp } from 'ramda';
import { getRandomJoke, JokeTpe } from '../getRandomJoke';

getRandomJoke()
  .then((JokeItem: JokeTpe) => {
    // @ts-ignore
    const joke = view(lensProp('joke'))(JokeItem);
    console.log(joke);
  })
  .catch((e: Error) => console.log(e.message));