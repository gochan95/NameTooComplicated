import { observable, action, autorun } from 'mobx';

class ControlPanelStore {
  @observable selectedObject = null;
  @observable controlPanel = false;
  @observable browseObjects = false;
  @observable objectaddGroup = false;
  @observable objectProperties = false;
  @observable layerProperties = false;

  @action closeControlPanel = () => {
    this.selectedObject = null;
    this.controlPanel = false;
  }

  @action switchSelectObject = (object) => {
    this.selectedObject = object;
  }

  @action openControlPanel = (object) => {
    this.selectedObject = object;
    this.controlPanel = true;
  }

  @action toggleBrowseObjects = () => {
    this.browseObjects = !this.browseObjects;
  }

  @action toggleObjectaddGroup = () => {
    this.objectaddGroup = !this.objectaddGroup;
  }

  @action toggleObjectProperties = () => {
    this.objectProperties = !this.objectProperties;
  }

  @action toggleLayerProperties = () => {
    this.layerProperties = !this.layerProperties;
  }

}

const controlpanelStore = new ControlPanelStore();
export default controlpanelStore;
