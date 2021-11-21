/* eslint-disable no-param-reassign */
import defaultAvatar from '../assets/images/default-avatar.svg';
import EventBus from './event-bus';
import { data, changeInfoFields } from '../data/fields';
import userProfileLabels from '../data/user-profile-labels';

interface UserInfo {
  [key: string]: string;
}

interface UserProfileItem {
  name: string;
  value: string | number;
}

interface ChatItem {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: {
    user: {
      first_name: string,
      second_name: string,
      avatar: string,
      emai: string,
      login: string,
      phone: string
    },
    time: string,
    content: string
  }
}

interface FormField {
  label: string;
  id: string | number;
  name: string;
  type: string;
  value: string | number;
  validators: Function[];
}

// TODO: Расширить форматирование дат
function formatDate(date) {
  const diff = new Date() - date;

  if (diff < 1000) {
    return 'прямо сейчас';
  }

  const sec = Math.floor(diff / 1000);

  if (sec < 60) {
    return `${sec} сек. назад`;
  }

  const min = Math.floor(diff / 60000);
  if (min < 60) {
    return `${min} мин. назад`;
  }

  let d = date;
  d = [
    `0${d.getDate()}`,
    `0${d.getMonth() + 1}`,
    `${d.getFullYear()}`,
    `0${d.getHours()}`,
    `0${d.getMinutes()}`,
  ].map((component) => component.slice(-2));

  return `${d.slice(0, 3).join('.')} ${d.slice(3).join(':')}`;
}

interface GlobalStore {
  messages: { [index: number]: {}[] };
  activeSocket: WebSocket;
  sockets: { [index: number]: WebSocket };
  isAuthorized: boolean;
  activeChat: ChatItem;
  chatList: ChatItem[];
  userInfo: UserInfo;
  chatsUsers: { [index: number]: string[] }
  userProfile: UserProfileItem[];
  changeInfoFields: FormField[];
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

window.store = store;

function updateUserProfile(info: UserInfo) {
  return Object.keys(userProfileLabels).map((label: string) => ({
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
  setUserInfo: (info: UserInfo) => {
    info.avatar = info.avatar ? RESOURCES_HOST + info.avatar : defaultAvatar;
    store.userInfo = info;
    store.changeInfoFields = changeInfoFields(info);
    store.userProfile = updateUserProfile(info);
  },
  // TODO: При создании нового чата выводить сообщение о создании
  setUserChats: (chats: ChatItem[]) => {
    store.chatList = chats.map((chat) => {
      chat.avatar = chat.avatar ? RESOURCES_HOST + chat.avatar : defaultAvatar;
      if (chat.last_message) {
        const { time } = chat.last_message;
        chat.last_message.time = formatDate(new Date(time));
      }
      return chat;
    });

    if (store.activeChat) {
      const { id } = store.activeChat;
      mutations.setActiveChat(id);
    }
  },
  setActiveChat: (id: number) => {
    const newActiveChat = store.chatList.find((chat) => chat.id === Number(id));
    if (newActiveChat) {
      store.activeChat = newActiveChat;
      store.activeSocket = store.sockets[id];
    }
  },
  addSocket: (id: number, socket: WebSocket) => {
    store.sockets[id] = socket;
  },
  removeSocket: (id: number) => {
    delete store.sockets[id];
  },
  setChatUsers: (id: number, users: UserInfo[]) => {
    const userNames = {};
    users.forEach((user: UserInfo) => {
      userNames[user.id] = user.display_name || user.login;
    });
    store.chatsUsers[id] = userNames;
    store.chatsUsers = { ...store.chatsUsers };
  },
  setMessages: (id: number, list: []) => {
    list.forEach(item => {
      item.time = formatDate(new Date(item.time));
    });
    store.messages[id] = list;
    // TODO: Можно ли обойтись без реструктуризации?
    store.messages = { ...store.messages };
  },
  addMessage: (id: number, message: {}) => {
    message.time = formatDate(new Date(message.time));
    store.messages[id].unshift(message);
    store.messages = { ...store.messages };
  },
};

// TODO: Может обозвать не геттерами?
export const getters = {
  checkSocket: (id: number) => store.sockets[id] && store.sockets[id]?.readyState === 1,
  getActiveSocket: () => store.activeSocket,
  isAuthorized: () => store.isAuthorized,
  userId: () => store.userInfo.id,
};
