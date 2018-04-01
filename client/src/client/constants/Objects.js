const sphere_data = {
  radius: 5,
  widthSegments: 32,
  heightSegments: 32,
  phiStart: 0,
  phiLength: 6.3,
  thetaStart: 0,
  thetaLength: 6.3
};

const cube_data = {
  width: 5,
  height: 5,
  depth: 5,
  widthSegments: 20,
  heightSegments: 20,
  depthSegments: 20
};

const cylinder_data = {
  radiusTop: 5,
  radiusBottom: 5,
  height: 10,
  radialSegments: 20,
  heightSegments: 20,
  openEndedBoolean: false,
  thetaStart: 0,
  thetaLength: 6.3
};

const cone_data = {
  radius: 5,
  height: 10,
  radialSegments: 20,
  heightSegments: 20,
  openEnded: false,
  thetaStart: 0,
  thetaLength: 6.3
};

const octahedron_data = {
  radius: 5,
  detail: 0
};

const icosahedron_data = {
  radius: 5,
  detail: 0
};

const tetrahedron_data = {
  radius: 5,
  detail: 0
};

export default {
  sphere_data,
  cube_data,
  cylinder_data,
  cone_data,
  octahedron_data,
  icosahedron_data,
  tetrahedron_data
};
