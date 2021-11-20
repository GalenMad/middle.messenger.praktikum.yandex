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

interface GlobalStore {
  [index: string]: boolean | UserInfo | UserProfileItem[] | ChatItem[] | FormField[];
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
  userData: {},
  userProfile: {},
  chatList: {},
  changeInfoFields: null,
  ...data,
});

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
  setUserChats: (chats: ChatItem[]) => {
    store.chatList = chats.map((chat) => {
      chat.avatar = chat.avatar ? RESOURCES_HOST + chat.avatar : defaultAvatar;
      return chat;
    });
  },
};
