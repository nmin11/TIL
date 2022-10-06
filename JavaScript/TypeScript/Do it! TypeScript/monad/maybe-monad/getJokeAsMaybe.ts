import { view, lensProp } from 'ramda';
import { getRandomJoke, JokeTpe } from './getRandomJoke';
import { IMaybe, Maybe } from './classes/Maybe';

const _getJokeAsMaybe = async() => {
  const jokeItem: JokeTpe = await getRandomJoke();
  // @ts-ignore
  const joke = view(lensProp('joke'))(jokeItem)
  return joke;
}

export const getJokeAsMaybe = () => new Promise<IMaybe<string>>((resolve, reject) => {
  _getJokeAsMaybe()
    .then((joke: string) => resolve(Maybe.Just(joke)))
    .catch(e => resolve(Maybe.Nothing))
});

export { IMaybe, Maybe }