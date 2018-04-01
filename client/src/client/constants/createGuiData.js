import dat from 'dat.gui';
import OBJECTS from './Objects.js';
import * as THREE from 'three';
import '../styles/App2.css';
var gui = new dat.GUI();
gui.domElement.id = 'gui';

function updateGroupGeometry(mesh, geometry) {
  mesh.geometry.dispose();
  mesh.geometry = geometry;
}

function removeFolder(folderName) {
  var f = gui.__folders[folderName];
  if (!f) return;
  f.close();
  gui.__ul.removeChild(f.domElement.parentNode);
  delete gui.__folders[folderName];
}

function create_sphere_gui(object) {
  var data = OBJECTS.sphere_data;
  var folder = gui.addFolder(object.name);
  folder
    .add(data, 'radius', 1, 30)
    .step(1)
    .onChange(generateGeometry);
  folder
    .add(data, 'widthSegments', 3, 32)
    .step(1)
    .onChange(generateGeometry);
  folder
    .add(data, 'heightSegments', 2, 32)
    .step(1)
    .onChange(generateGeometry);
  folder.add(data, 'phiStart', 0, 8).onChange(generateGeometry);
  folder.add(data, 'phiLength', 0, 6.3).onChange(generateGeometry);
  folder.add(data, 'thetaStart', 0, 8).onChange(generateGeometry);
  folder.add(data, 'thetaLength', 0, 6.3).onChange(generateGeometry);

  function generateGeometry() {
    updateGroupGeometry(
      object,
      new THREE.SphereGeometry(
        data.radius,
        data.widthSegments,
        data.heightSegments,
        data.phiStart,
        data.phiLength,
        data.thetaStart,
        data.thetaLength
      )
    );
  }
}

function create_cube_gui(object) {
  var data = OBJECTS.cube_data;
  var folder = gui.addFolder(object.name);
  folder
    .add(data, 'width', 1, 30)
    .step(1)
    .onChange(generateGeometry);
  folder
    .add(data, 'height', 3, 32)
    .step(1)
    .onChange(generateGeometry);
  folder
    .add(data, 'depth', 2, 32)
    .step(1)
    .onChange(generateGeometry);
  folder.add(data, 'widthSegments', 0, 8).onChange(generateGeometry);
  folder.add(data, 'heightSegments', 0, 6.3).onChange(generateGeometry);
  folder.add(data, 'depthSegments', 0, 8).onChange(generateGeometry);

  function generateGeometry() {
    updateGroupGeometry(
      object,
      new THREE.CubeGeometry(
        data.width,
        data.height,
        data.depth,
        data.widthSegments,
        data.heightSegments,
        data.depthSegments
      )
    );
  }
}

function create_cone_gui(object) {
  var data = OBJECTS.cone_data;
  var folder = gui.addFolder(object.name);
  folder
    .add(data, 'radius', 1, 30)
    .step(1)
    .onChange(generateGeometry);
  folder
    .add(data, 'height', 3, 32)
    .step(1)
    .onChange(generateGeometry);
  folder
    .add(data, 'radialSegments', 2, 32)
    .step(1)
    .onChange(generateGeometry);
  folder.add(data, 'heightSegments', 0, 8).onChange(generateGeometry);
  folder.add(data, 'openEnded').onChange(generateGeometry);
  folder.add(data, 'thetaStart', 0, 8).onChange(generateGeometry);
  folder.add(data, 'thetaLength', 0, 8).onChange(generateGeometry);

  function generateGeometry() {
    updateGroupGeometry(
      object,
      new THREE.ConeGeometry(
        data.radius,
        data.height,
        data.radialSegments,
        data.heightSegments,
        data.openEnded,
        data.thetaStart,
        data.thetaLength
      )
    );
  }
}

function create_cylinder_gui(object) {
  var data = OBJECTS.cylinder_data;
  var folder = gui.addFolder(object.name);
  folder
    .add(data, 'radiusTop', 1, 30)
    .step(1)
    .onChange(generateGeometry);
  folder
    .add(data, 'radiusBottom', 3, 32)
    .step(1)
    .onChange(generateGeometry);
  folder
    .add(data, 'height', 2, 32)
    .step(1)
    .onChange(generateGeometry);
  folder.add(data, 'radialSegments', 0, 8).onChange(generateGeometry);
  folder.add(data, 'heightSegments', 0, 8).onChange(generateGeometry);
  folder.add(data, 'openEndedBoolean').onChange(generateGeometry);
  folder.add(data, 'thetaStart', 0, 6.3).onChange(generateGeometry);
  folder.add(data, 'thetaLength', 0, 6.3).onChange(generateGeometry);

  function generateGeometry() {
    updateGroupGeometry(
      object,
      new THREE.CylinderGeometry(
        data.radiusTop,
        data.radiusBottom,
        data.height,
        data.radialSegments,
        data.heightSegments,
        data.openEndedBoolean,
        data.thetaStart,
        data.thetaLength
      )
    );
  }
}

function create_cylinder_gui(object) {
  var data = OBJECTS.cylinder_data;
  var folder = gui.addFolder(object.name);
  folder
    .add(data, 'radiusTop', 1, 30)
    .step(1)
    .onChange(generateGeometry);
  folder
    .add(data, 'radiusBottom', 3, 32)
    .step(1)
    .onChange(generateGeometry);
  folder
    .add(data, 'height', 2, 32)
    .step(1)
    .onChange(generateGeometry);
  folder.add(data, 'radialSegments', 5, 30).onChange(generateGeometry);
  folder.add(data, 'heightSegments', 5, 30).onChange(generateGeometry);
  folder.add(data, 'openEndedBoolean').onChange(generateGeometry);
  folder.add(data, 'thetaStart', 0, 6.3).onChange(generateGeometry);
  folder.add(data, 'thetaLength', 0, 6.3).onChange(generateGeometry);

  function generateGeometry() {
    updateGroupGeometry(
      object,
      new THREE.CylinderGeometry(
        data.radiusTop,
        data.radiusBottom,
        data.height,
        data.radialSegments,
        data.heightSegments,
        data.openEndedBoolean,
        data.thetaStart,
        data.thetaLength
      )
    );
  }
}

function create_oct_gui(object) {
  var data = OBJECTS.octahedron_data;
  var folder = gui.addFolder(object.name);
  folder
    .add(data, 'radius', 1, 30)
    .step(1)
    .onChange(generateGeometry);
  folder
    .add(data, 'detail', 0, 6)
    .step(1)
    .onChange(generateGeometry);

  function generateGeometry() {
    updateGroupGeometry(
      object,
      new THREE.OctahedronGeometry(data.radius, data.detail)
    );
  }
}

function create_ico_gui(object) {
  var data = OBJECTS.icosahedron_data;
  var folder = gui.addFolder(object.name);
  folder
    .add(data, 'radius', 1, 30)
    .step(1)
    .onChange(generateGeometry);
  folder
    .add(data, 'detail', 0, 6)
    .step(1)
    .onChange(generateGeometry);

  function generateGeometry() {
    updateGroupGeometry(
      object,
      new THREE.IcosahedronGeometry(data.radius, data.detail)
    );
  }
}

function create_tet_gui(object) {
  var data = OBJECTS.tetrahedron_data;
  var folder = gui.addFolder(object.name);
  folder
    .add(data, 'radius', 1, 30)
    .step(1)
    .onChange(generateGeometry);
  folder
    .add(data, 'detail', 0, 6)
    .step(1)
    .onChange(generateGeometry);

  function generateGeometry() {
    updateGroupGeometry(
      object,
      new THREE.TetrahedronGeometry(data.radius, data.detail)
    );
  }
}
export default {
  create_sphere_gui,
  create_cube_gui,
  create_cone_gui,
  create_cylinder_gui,
  create_tet_gui,
  create_ico_gui,
  create_oct_gui,
  gui,
  removeFolder
};
