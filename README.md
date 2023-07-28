# React Threejs Journey

## 1. Physics libraries

### 1.1 3D physics libraries

- Ammo.js
- Cannon.js
- Oimo.js
- physijs

### 1.2 2D physics libraries

- Matter.js
- P2.js
- Planck.js
- Box2D.js

## 2. Models format

### 2.1 Many 3D model formats, each one responding to a problem

- What data
- Weight
- Compression
- Compatibility
- Copyrights
- Etc.

### 2.2 Different criteria

- Dedicated to one software
- Very light but might lack specific data
- Almost all data but are heavy
- Open source
- Not open source
- Binary
- ASCII
- Etc.

### 2.3 Popular formats

- OBJ
- FBX
- STL
- PLY
- COLLADA
- 3DS
- **GLTF**

### 2.4 GLTF formats

A GLTF file can have different formats

- glTF
- glTF-Binary
- glTF-Draco
- glTF-Embedded

### 2.5 GLTF

- The default format
- Multiple files
- `Duck.gltf` is a JSON that contains cameras,lights,scenes,materials,objects transformations,but no geometries nor textures
- `Duck0.bin` is a binary that usually contains data like the geometries(vertices positions, UV coordinate,normals,colors,etc.)
- `DuckCM.png` is the texture

We load the `Duck.gltf` file and the other files should load automatically

### 2.6 GLTF-Binary

- Only one file
- Contains all the data we talked about
- Binary
- Usually lighter
- Easier to load because only one file
- Hard to alter its data

### 2.7 GLTF-Draco

- Like the **glTF default** format, but the buffer data is compressed using the `Draco algorithm`
- Much lighter

### 2.8 GLTF-Embedded

- One file like the `glTF-Binary` format
- JSON
- Heavier

## 3. Rayster

```ts
const intersects = raycaster.intersectObjects([object1, object2, object3]);
console.log(intersects);
```

Each item contains useful information

- `distance` - distance between the origin of the ray and the collision point
- `face` - what face of the geometry was hit by the ray
- `faceIndex` - the index of that face
- `object` - what object is concerned by the collision
- `point` - a Vector3 of the exact position of the collision
- `uv` - the UV coordinates in that geometry
