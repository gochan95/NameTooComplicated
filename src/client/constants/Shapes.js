const Shapes = {
  sphere: [
    'radius',
    'widthSegments',
    'heightSegments',
    'phiStart',
    'phiLength',
    'thetaStart',
    'thetaLength'
  ],
  cube: [
    'width',
    'height',
    'depth',
    'widthSegments',
    'heightSegments',
    'depthSegments'
  ],
  cylinder: [
    'radiusTop',
    'radiusBottom',
    'height',
    'radialSegments',
    'heightSegments',
    'openEndedBoolean',
    'thetaStart',
    'thetaLength'
  ],
  cone: [
    'radius',
    'height',
    'radialSegments',
    'heightSegments',
    'openEnded',
    'thetaStart',
    'thetaLength'
  ],
  octahedron: ['radius', 'detail'],
  icosahedron: ['radius', 'detail'],
  tetrahedron: ['radius', 'detail'],
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
    "SphereGeometry": "sphere",
    "BoxGeometry": "cube",
    "CylinderGeometry": "cylinder",
    "ConeGeometry": "cone",
    "OctahedronGeometry": "octahedron",
    "IcosahedronGeometry": "icosahedron",
    "TetrahedronGeometry": "tetrahedron"
  }
};

export default Shapes;
