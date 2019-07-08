import { ReplaySubject } from 'rxjs';

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
  user?: User;
  submessages?: Message[];
}

let uuid = 100;
let currentUser: User | undefined = undefined;

let users: User[] = [];
const users$ = new ReplaySubject<User[]>(1);
let messages: Message[] = [];
const messages$ = new ReplaySubject<Message[]>(1);

function _setUsers(_users: User[]) {
  users = _users;
  users$.next(_users);
}

function _setMessages(_messages: Message[]) {
  messages = _messages;
  messages$.next(_messages);
}

function _addMessage(message: { content: string; parentMessageId?: number }) {
  const nextMessages = [...messages];
  const parentMessage = message.parentMessageId
    ? nextMessages.find(m => m.id === message.parentMessageId)
    : undefined;

  if (parentMessage) {
    const index = nextMessages.indexOf(parentMessage);
    nextMessages[index] = {
      ...parentMessage,
      submessages: [
        ...(parentMessage.submessages || []),
        {
          id: ++uuid,
          content: message.content,
          createdAt: new Date().toString(),
          user: currentUser
        }
      ]
    };
  } else {
    nextMessages.push({
      id: ++uuid,
      content: message.content,
      createdAt: new Date().toString(),
      user: currentUser,
      submessages: []
    });
  }

  _setMessages(nextMessages);
}

function _addUser(user: User) {
  _setUsers([...users, user]);
}

function _removeUser(user: User) {
  _setUsers(users.filter(u => u.id !== user.id));
}

function _init() {
  setTimeout(() => {
    _setUsers([
      { id: ++uuid, name: 'geron' },
      { id: ++uuid, name: 'hit_fm', color: 'pink', senior: true },
      { id: ++uuid, name: 'kasienka2' },
      { id: ++uuid, name: 'Lady_Ann_' },
      { id: ++uuid, name: 'MalWINKaaa', color: 'orange', senior: true }
    ]);

    _setMessages([
      {
        id: ++uuid,
        createdAt: new Date().toString(),
        content: '@here ślimak',
        user: users[1],
        submessages: []
      },
      {
        id: ++uuid,
        createdAt: new Date().toString(),
        content: 'mingwok ktoś?',
        user: users[4],
        submessages: [
          {
            id: ++uuid,
            createdAt: new Date().toString(),
            content: ':+1:',
            user: users[2]
          },
          {
            id: ++uuid,
            createdAt: new Date().toString(),
            content: '1x makaron smażony z kurczakiem',
            user: users[3]
          },
          {
            id: ++uuid,
            createdAt: new Date().toString(),
            content: '@kasienka2 a jaki makaron?',
            user: users[4]
          }
        ]
      }
    ]);
  }, 1000);
}

_init();

export function fetchMessages() {
  return messages$.asObservable();
}

export function fetchOnlineUsers() {
  return users$.asObservable();
}

export function createMessage(message: {
  content: string;
  parentMessageId?: number;
}) {
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
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      currentUser = { id: ++uuid, ...user };

      _addUser(currentUser);
      _addMessage({
        content: `** przychodzi ${currentUser.name}...`
      });

      resolve(currentUser);
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
