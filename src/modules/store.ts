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

  const EVENTS = {
    UPDATE_INFO: 'update:user-info'
  }

  const eventBusMethods = {
    on: EventBus.on,
    off: EventBus.off,
    emit: EventBus.emit,
  }

  const getters = {
    getAuthorizationStatus: () => {
      return isAuthorized
    },
    getUserAvatar: () => userInfo && userInfo.avatar ? userInfo.avatar : defaultAvatar,
    getUserData: () => userInfo && Object.keys(userDataLabels).map(label => ({
      name: userDataLabels[label],
      value: userInfo[label]
    })),
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
    }
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
