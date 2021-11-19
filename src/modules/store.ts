import defaultAvatar from '../assets/images/default-avatar.svg';
import EventBus from './event-bus';

const RESOURCES_HOST = 'https://ya-praktikum.tech/api/v2/resources';

function makeProxy(props: {}) {
  const handler = {
    get: (target: any, prop: string) => {
      const value = target[prop];
      return typeof value === 'function' ? value.bind(target) : value;
    },
    set: (target: any, prop: string, value: any) => {
      target[prop] = value;
      EventBus.emit(`store-update:${prop}`, value)
      return true;
    },
  };
  return new Proxy(props, handler);
}

interface userInfo {
  id: number
  email: string
  login: string
  phone: string
  first_name: string
  second_name: string
  avatar: null | string,
  display_name: null | string,
}

interface chat {
  "id": 123,
  "title": "my-chat",
  "avatar": "/123/avatar1.jpg",
  "unread_count": 15,
  "last_message": {
    "user": {
      "first_name": "Petya",
      "second_name": "Pupkin",
      "avatar": "/path/to/avatar.jpg",
      "email": "my@email.com",
      "login": "userLogin",
      "phone": "8(911)-222-33-22"
    },
    "time": "2020-01-02T14:22:22.000Z",
    "content": "this is message content"
  }
}

const userDataLabels = {
  first_name: 'Имя',
  second_name: 'Фамилия',
  login: 'Логин',
  display_name: 'Имя в чате',
  email: 'Электронная почта',
  phone: 'Телефон'
}

function createStore() {

  const store = makeProxy({
    isAuthorized: false,
    userData: {},
    userProfile: {},
    chatList: {},
  });


  const eventBusMethods = {
    on: EventBus.on,
    off: EventBus.off,
    emit: EventBus.emit,
  }

  const get = (path: string) => {
    const arr = path.split('.');
    let exist = store;
    if (!arr.length) return undefined;

    for (let i = 0; i < arr.length; i++) {
      const propertyName = arr[i];
      if (exist.hasOwnProperty(propertyName)) {
        exist = exist[propertyName];
      } else {
        return null;
      }
    }

    return exist;
  }

  const updateUserProfile = (info) => {
    return Object.keys(userDataLabels).map(label => ({
      name: userDataLabels[label],
      value: info[label]
    }))
  }

  const mutations = {
    setAuthorizationStatus: (status: boolean) => {
      store.isAuthorized = status;
    },
    setUserInfo: (info: userInfo) => {
      info.avatar = info.avatar ? RESOURCES_HOST + info.avatar : defaultAvatar;
      store.userInfo = info;
      store.userProfile = updateUserProfile(info);
    },
    setUserChats: (chats: chat[]) => {
      store.chatList = chats.map(chat => {
        chat.avatar = chat.avatar ? RESOURCES_HOST + chat.avatar : defaultAvatar;
        return chat;
      });
    },
  }

  return Object.freeze({
    mutations,
    get,
    ...eventBusMethods,
  })
}

export default createStore();
