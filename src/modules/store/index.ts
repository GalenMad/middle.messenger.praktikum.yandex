import './types.d';
import defaultAvatar from '../../assets/images/default-avatar.svg';
import EventBus from '../event-bus';
import { data, changeInfoFields } from '../../data/fields';
import userProfileLabels from '../../data/user-profile-labels';

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

const store = makeProxy({
  isAuthorized: false,
  userData: {},
  userProfile: {},
  chatList: {},
  changeInfoFields: null,
  ...data,
});

const updateUserProfile = (info: userInfo) => Object.keys(userProfileLabels).map((label: string) => ({
  name: userProfileLabels[label],
  value: info[label],
}));

export const storeEvents = new EventBus();

export const get = (path: string) => {
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
};

export const mutations = {
  setAuthorizationStatus: (status: boolean) => {
    store.isAuthorized = status;
  },
  setUserInfo: (info: userInfo) => {
    info.avatar = info.avatar ? RESOURCES_HOST + info.avatar : defaultAvatar;
    store.userInfo = info;
    store.changeInfoFields = changeInfoFields(info);
    store.userProfile = updateUserProfile(info);
  },
  setUserChats: (chats: chat[]) => {
    store.chatList = chats.map((chat) => {
      chat.avatar = chat.avatar ? RESOURCES_HOST + chat.avatar : defaultAvatar;
      return chat;
    });
  },
};
