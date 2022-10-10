import { IApplicative } from './IApplicative';
import { IChain } from './IChain';

export interface IMonad<T> extends IChain<T>, IApplicative<T> {}