import { observable, autorun, action, computed } from 'mobx';

class AuthStore {
  @observable openLogin = false;
  @observable username = null;

  constructor() {
    autorun(() => console.log('AuthStore'));
  }

  @action
  toggleForm = (set) => {
    this.openLogin = set;
  };

  @action
  setUsername = name => {
    console.log(name)
    this.username = name;
  };

  @computed
  get usersName() {
    return this.username;
  }
}

const authStore = new AuthStore();
export default authStore;
