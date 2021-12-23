/* eslint-disable no-param-reassign */
import defaultAvatar from '../assets/images/default-avatar.svg';
import EventBus from './event-bus';
import { data, changeInfoFields } from '../data/fields';
import userProfileLabels from '../data/user-profile-labels';

// TODO: Расширить форматирование дат
function formatDate(date: Date) {
  const d = [
    `0${date.getDate()}`,
    `0${date.getMonth() + 1}`,
    `${date.getFullYear()}`,
    `0${date.getHours()}`,
    `0${date.getMinutes()}`,
  ].map((component) => component.slice(-2));

  return `${d.slice(0, 3).join('.')} ${d.slice(3).join(':')}`;
}

export const storeEvents = new EventBus();

const makeProxy = (props: {}) => {
  const handler = {
    get: (target: any, prop: string) => {
      const value = target[prop];
      return typeof value === 'function' ? value.bind(target) : value;
    },
    set: (target: any, prop: string, value: any) => {
      target[prop] = value;
      storeEvents.emit(`store-update:${prop}`, value);
      return true;
    },
  };
  return new Proxy(props, handler);
};

const RESOURCES_HOST = 'https://ya-praktikum.tech/api/v2/resources';

const store: GlobalStore = makeProxy({
  // TODO: Придумать другой способ проверки селектора
  mockData: 'data',
  isAuthorized: false,
  userInfo: {},
  userProfile: {},
  chatList: {},
  activeChat: null,
  chatsUsers: {},
  sockets: {},
  messages: {},
  activeSocket: null,
  changeInfoFields: null,
  ...data,
});

// TODO: Сохранять значения инпутов в чате
function updateUserProfile(info: UserInfo) {
  return Object.keys(userProfileLabels).map((label: keyof UserInfo) => ({
    name: userProfileLabels[label],
    value: info[label],
  }));
}

export const get = (path: string) => {
  const arr = path.split('.');
  let exist: { [index: string]: any } | any = store;
  if (!arr.length) return undefined;

  for (let i = 0; i < arr.length; i += 1) {
    const propertyName = arr[i];
    if (exist[propertyName]) {
      exist = exist[propertyName];
    } else {
      return null;
    }
  }

  return exist;
};

export const mutations = {
  setAuthorizationStatus: (status: boolean) => {
    store.isAuthorized = status;
  },
  // TODO: Обновлять имя юзера также и в чатах других пользователей
  setUserInfo: (info: UserInfo) => {
    info.avatar = info.avatar ? RESOURCES_HOST + info.avatar : defaultAvatar;
    store.userInfo = info;
    store.changeInfoFields = changeInfoFields(info);
    store.userProfile = updateUserProfile(info);
  },
  // TODO: При создании нового чата выводить сообщение о создании
  // TODO: Сортировка чатов по дате последнего сообщения
  setUserChats: (chats: ChatItem[]) => {
    store.chatList = chats.map((chat) => {
      chat.avatar = chat.avatar ? RESOURCES_HOST + chat.avatar : defaultAvatar;
      if (chat.last_message) {
        const { time } = chat.last_message;
        chat.last_message.time = formatDate(new Date(time));
      }
      return chat;
    });

    // TODO: Нормальная проверка на существование в активном чате
    if (store.activeChat) {
      const { id } = store.activeChat;
      if (chats.every((chat) => chat.id !== id)) {
        store.activeChat = null;
        // TODO: Закрывать сокет и выводить сообщение, мол, вас удалили
        store.activeSocket = null;
      }
    }
  },
  setActiveChat: (id: number) => {
    const newActiveChat = store.chatList.find((chat) => chat.id === Number(id));
    if (newActiveChat) {
      store.activeChat = newActiveChat;
    }
  },
  setActiveSocket: (id: number) => {
    store.activeSocket = store.sockets[id];
  },
  addSocket: (id: number, socket: WebSocket) => {
    store.sockets[id] = socket;
  },
  removeSocket: (id: number) => {
    delete store.sockets[id];
  },
  setChatUsers: (id: number, users: UserInfo[]) => {
    const userNames: { [index: string]: string } = {};
    users.forEach((user: UserInfo) => {
      userNames[user.id] = user.display_name || user.login;
    });
    store.chatsUsers[id] = userNames;
    store.chatsUsers = { ...store.chatsUsers };
  },
  setMessages: (id: number, list: SocketMessage[]) => {
    list.forEach((item) => {
      item.time = formatDate(new Date(item.time));
    });
    store.messages[id] = list;
    // TODO: Можно ли обойтись без реструктуризации?
    store.messages = { ...store.messages };
  },
  addMessage: (id: number, message: SocketMessage) => {
    message.time = formatDate(new Date(message.time));
    store.messages[id].unshift(message);
    store.messages = { ...store.messages };
  },
  resetStore: () => {
    // TODO: Сделать нормальный ресет
    store.activeChat = null;
    store.chatsUsers = {};
    Object.values(store.sockets).forEach((socket) => socket.close());
    store.sockets = {};
    store.messages = {};
    store.activeSocket?.close();
    store.activeSocket = null;
  },
};

export const getters = {
  checkSocket: (id: number) => store.sockets[id] && store.sockets[id]?.readyState === 1,
  getActiveSocket: () => store.activeSocket,
  isAuthorized: () => store.isAuthorized,
  userId: () => store.userInfo.id,
};
