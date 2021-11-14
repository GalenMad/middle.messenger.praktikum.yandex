function createStore() {
  let isAuthorized = false;
  let userInfo: {} | null = null;

  const getters = {
    getAuthorizationStatus: () => isAuthorized,
  }

  const mutations = {
    setAuthorizationStatus: (status: boolean) => {
      isAuthorized = status;
    },
    setUserInfo: (info: {}) => {
      userInfo = info;
    }
  }

  return Object.freeze({
    ...mutations,
    ...getters
  })
}

export default createStore();
