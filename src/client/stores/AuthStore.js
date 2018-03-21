import {
  observable, autorun, action
} from 'mobx';

class AuthStore {

  @observable closeForm = false;
  @observable username = null;

  constructor() {
    autorun(() => console.log('AuthStore'));
  }

  @action toggleForm = (set) => {
    // console.log(value);
    this.closeForm = set;
  }

  @action setUsername = (name) => {
    this.username = name;
  }
};

const authStore = new AuthStore();
export default authStore;
