import { observable, action, computed } from 'mobx';

class AuthStore {
  @observable openLogin = false;
  @observable username = null;

  @action
  resetAuthObservables = () => {
    this.username = null;
  };

  @action
  toggleForm = set => {
    this.openLogin = set;
  };

  @action
  setUsername = name => {
    this.username = name;
  };

  @computed
  get usersName() {
    return this.username;
  }
}

const authStore = new AuthStore();
export default authStore;
