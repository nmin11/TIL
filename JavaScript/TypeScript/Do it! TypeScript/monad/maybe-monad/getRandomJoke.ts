import { fetchJokes } from './fetchJokes';
const random = (max: number) => Math.floor(Math.random() * max);

export type FetchResult = { type: string, value: JokeTpe[] };
export type JokeTpe = { id: number, joke: string, category: string[] };

export const getRandomJoke = () => new Promise<JokeTpe>((resolve, reject) => {
  fetchJokes<FetchResult>()
    .then((result: FetchResult) => {
      let array: JokeTpe[] = result.value;
      resolve(array[random(array.length)])
    })
    .catch((e: Error) => reject(e))
});