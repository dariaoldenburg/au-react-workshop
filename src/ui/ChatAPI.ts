import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  name: string;
  color?: string;
  senior?: boolean;
}
export interface Message {
  id: number;
  createdAt: string;
  content: string;
}

let uuid = 1;
let currentUser: User | undefined = undefined;

const users$ = new BehaviorSubject<User[]>([]);
const messages$ = new BehaviorSubject<Message[]>([]);

function _addMessage(message: { content: string }) {
  messages$.next([
    ...messages$.value,
    {
      id: ++uuid,
      content: message.content,
      createdAt: new Date().toString()
    }
  ]);
}

function _addUser(user: User) {
  users$.next([...users$.value, user]);
}

function _removeUser(user: User) {
  users$.next(users$.value.filter(u => u.id !== user.id));
}

function _init() {
  setTimeout(() => {
    _addUser({ id: ++uuid, name: 'geron' });
    _addUser({ id: ++uuid, name: 'hit_fm', color: 'pink', senior: true });
    _addUser({ id: ++uuid, name: 'kasienka2' });
    _addUser({ id: ++uuid, name: 'Lady_Ann_' });
    _addUser({ id: ++uuid, name: 'MalWINKaaa', color: 'orange', senior: true });

    login({ name: '~sylwusia', color: 'red' });
  }, 1000);
}

_init();

export function fetchMessages() {
  return messages$.asObservable();
}

export function fetchOnlineUsers() {
  return users$.asObservable();
}

export function createMessage(message: { content: string }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      _addMessage(message);
      resolve();
    }, 500);
  });
}

export function login(user: {
  name: string;
  color?: string;
  senior?: boolean;
}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      currentUser = { id: ++uuid, ...user };

      _addUser(currentUser);
      _addMessage({
        content: `** przychodzi ${currentUser.name}...`
      });

      resolve();
    }, 500);
  });
}

export function logout() {
  if (!currentUser) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (currentUser) {
        _removeUser(currentUser);
        _addMessage({
          content: `** odchodzi ${currentUser.name}...`
        });
      }
      resolve();
    }, 500);
  });
}
