import { ReplaySubject } from 'rxjs';

export interface User {
  id?: string;
  name: string;
  color?: string;
  senior?: boolean;
}

const users$ = new ReplaySubject<User[]>(1);

export function fetchOnlineUsers() {
  setTimeout(() => {
    users$.next([
      { name: 'geron' },
      { name: 'hit_fm', color: 'pink', senior: true },
      { name: 'kasienka2' },
      { name: 'Lady_Ann_' },
      { name: 'MalWINKaaa', color: 'orange', senior: true }
    ]);
  }, 1000);

  return users$.asObservable();
}
