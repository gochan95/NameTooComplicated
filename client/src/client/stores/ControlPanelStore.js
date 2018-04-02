import { observable, action, computed } from 'mobx';
import { gui_container } from '../constants/createGuiData';

class ControlPanelStore {
  @observable selectedObject = null;
  @observable controlPanel = false;
  @observable browseObjects = false;
  @observable browseObjectsDropdown = false;
  @observable objectaddGroup = false;
  @observable objectProperties = false;
  @observable layerProperties = false;

  @action
  resetControlPanelObservables = () => {
    this.selectedObject = null;
    this.controlPanel = false;
    this.browseObjects = false;
    this.browseObjectsDropdown = false;
    this.objectaddGroup = false;
    this.objectProperties = false;
    this.layerProperties = false;
  };

  @computed
  get getSelectedObject() {
    return this.selectedObject;
  }

  @action
  closeControlPanel = () => {
    this.selectedObject = null;
    this.controlPanel = false;
    this.layerProperties = false;
    this.objectProperties = false;
    gui_container.style.visibility = 'hidden';
  };

  @action
  openControlPanel = object => {
    this.closeControlPanel();
    this.selectedObject = object;
    this.controlPanel = true;
    gui_container.style.visibility = 'visible';
  };

  @action
  toggleBrowseObjects = () => {
    this.browseObjects = !this.browseObjects;
  };

  @action
  toggleObjectaddGroup = () => {
    this.objectaddGroup = !this.objectaddGroup;
  };

  @action
  toggleObjectProperties = () => {
    this.objectProperties = !this.objectProperties;
  };

  @action
  toggleLayerProperties = () => {
    this.layerProperties = !this.layerProperties;
  };

  @action
  openControlPanelWithObjects = () => {
    this.browseObjects = true;
    this.browseObjectsDropdown = true;
  };

  @action
  toggleBrowseObjectsDropdown = () => {
    this.browseObjectsDropdown = !this.browseObjectsDropdown;
  };
}

const controlpanelStore = new ControlPanelStore();
export default controlpanelStore;
