# React Threejs Journey

## 3D physics libraries

- Ammo.js
- Cannon.js
- Oimo.js
- physijs

## 2D physics libraries

- Matter.js
- P2.js
- Planck.js
- Box2D.js

## Models format

### Many 3D model formats, each one responding to a problem

- What data
- Weight
- Compression
- Compatibility
- Copyrights
- Etc.

### Different criteria

- Dedicated to one software
- Very light but might lack specific data
- Almost all data but are heavy
- Open source
- Not open source
- Binary
- ASCII
- Etc.

### Popular formats

- OBJ
- FBX
- STL
- PLY
- COLLADA
- 3DS
- **GLTF**

### GLTF formats

A GLTF file can have different formats

- glTF
- glTF-Binary
- glTF-Draco
- glTF-Embedded

### GLTF

- The default format
- Multiple files
- `Duck.gltf` is a JSON that contains cameras,lights,scenes,materials,objects transformations,but no geometries nor textures
- `Duck0.bin` is a binary that usually contains data like the geometries(vertices positions, UV coordinate,normals,colors,etc.)
- `DuckCM.png` is the texture

We load the `Duck.gltf` file and the other files should load automatically

### GLTF-Binary

- Only one file
- Contains all the data we talked about
- Binary
- Usually lighter
- Easier to load because only one file
- Hard to alter its data

### GLTF-Draco

- Like the **glTF default** format, but the buffer data is compressed using the `Draco algorithm`
- Much lighter

### GLTF-Embedded

- One file like the `glTF-Binary` format
- JSON
- Heavier
