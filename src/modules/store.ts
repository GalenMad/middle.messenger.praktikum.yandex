import defaultAvatar from '../assets/images/default-avatar.svg';
import EventBus from './event-bus';

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
  let isAuthorized = false;
  let userInfo: userInfo | null = null;
  let chatList: chat[] | null = null;

  const EVENTS = {
    UPDATE_INFO: 'update:user-info'
  }

  const RESOURCES_HOST = 'https://ya-praktikum.tech/api/v2/resources'

  const eventBusMethods = {
    on: EventBus.on,
    off: EventBus.off,
    emit: EventBus.emit,
  }

  const getters = {
    getAuthorizationStatus: () => {
      return isAuthorized
    },
    getUserAvatar: () => userInfo && userInfo.avatar ? RESOURCES_HOST + userInfo.avatar : defaultAvatar,
    getUserData: () => userInfo && Object.keys(userDataLabels).map(label => ({
      name: userDataLabels[label],
      value: userInfo[label]
    })),
    getUserChats: () => {
      return chatList?.map(item => {
        item.avatar = item.avatar || defaultAvatar;
        item.last_message = item.last_message || { time: '—', content: 'Пусто…' };
        return [item, item, item, item];
      }).flat();
    },
    getRawUserData: () => userInfo,
    getUserName: () => userInfo?.first_name
  }

  const mutations = {
    setAuthorizationStatus: (status: boolean) => {
      isAuthorized = status;
    },
    setUserInfo: (info: userInfo) => {
      userInfo = info;
      EventBus.emit(EVENTS.UPDATE_INFO);
    },
    setUserChats: (chats: chat[]) => {
      chatList = chats;
      EventBus.emit(EVENTS.UPDATE_INFO);
    },
  }

  return Object.freeze({
    EVENTS,
    mutations,
    ...eventBusMethods,
    ...mutations,
    ...getters
  })
}

export default createStore();
