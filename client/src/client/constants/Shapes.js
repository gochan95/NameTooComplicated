const Shapes = {
  sphere: [
    'radius',
    'widthSegments',
    'heightSegments',
    'phiStart',
    'phiLength',
    'thetaStart',
    'thetaLength',
    'x',
    'y',
    'z'
  ],
  cube: [
    'width',
    'height',
    'depth',
    'widthSegments',
    'heightSegments',
    'depthSegments',
    'x',
    'y',
    'z'
  ],
  cylinder: [
    'radiusTop',
    'radiusBottom',
    'height',
    'radialSegments',
    'heightSegments',
    'openEndedBoolean',
    'thetaStart',
    'thetaLength',
    'x',
    'y',
    'z'
  ],
  cone: [
    'radius',
    'height',
    'radialSegments',
    'heightSegments',
    'openEnded',
    'thetaStart',
    'thetaLength',
    'x',
    'y',
    'z'
  ],
  octahedron: ['radius', 'detail', 'x', 'y', 'z'],
  icosahedron: ['radius', 'detail', 'x', 'y', 'z'],
  tetrahedron: ['radius', 'detail', 'x', 'y', 'z'],
  allshapes: [
    'sphere',
    'cube',
    'cone',
    'cylinder',
    'tetrahedron',
    'octahedron',
    'icosahedron'
  ],
  mapShapes: {
    SphereGeometry: 'sphere',
    BoxGeometry: 'cube',
    CylinderGeometry: 'cylinder',
    ConeGeometry: 'cone',
    OctahedronGeometry: 'octahedron',
    IcosahedronGeometry: 'icosahedron',
    TetrahedronGeometry: 'tetrahedron'
  }
};

export default Shapes;
