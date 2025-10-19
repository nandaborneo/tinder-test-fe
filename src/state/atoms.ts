import { atom } from 'recoil';
import type { Person } from '../types';

export const splashDoneAtom = atom<boolean>({
  key: 'splashDone',
  default: false,
});

export const likedIdsAtom = atom<Set<string>>({
  key: 'likedIds',
  default: new Set<string>(),
});

export const likedPeopleAtom = atom<Person[]>({
  key: 'likedPeople',
  default: [],
});