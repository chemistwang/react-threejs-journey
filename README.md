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

## 4. Model Software

- C4D
- Maya
- 3DS Max
- Blender
- ZBrush
- Marmoset Toolbag
- Substance Painter
- etc.

## 5. Code Structuring for Bigger projects

### 5.1 No ideal for bigger projects

- Hard to find what you want
- Hard to re-use specific parts
- Conflict with other variables
- Conflicts with other developers
- Cramps in your fingers because you have to scroll
- Etc.

## 6. Shaders

### 6.1 What is a shader

- Program written in GLSL
- Sent to the GPU
- Position each vertex of a geometry
- Colorize each visible pixel of that geometry

We send a lot of data to the shader

- Vertices coordinates
- Mesh transformation
- Information about the camera
- Colors
- Textures
- Lights
- Fog
- Etc.

### 6.2 vertex shader

### 6.3 uniforms

Useful for

- Having the same shader but with different results
- Being able to tweak values
- Animating the value

## 7. Performance tips

We should target a 60fps experience,at least

There can be two main limitations

- The CPU
- The GPU

### 7.1 monitoring

```ts
npm i stats.js
```

### 7.2 disable fps limit

![Open Chrome without framerate limit](https://gist.github.com/brunosimon/c15e7451a802fa8e34c0678620022f7d)

### 7.3 spector.js

![spector.js](https://spector.babylonjs.com/)

### 7.4 renderer informations

```ts
console.log(renderer.info);
```

### 7.5 good javascript code

keep a performant native JavaScript code especially in the `tick` function

### 7.6 dispose of things

### 7.7 lights

avoid Three.js lights. Use baked lights or use cheap lights

- AmbientLight
- DirectionalLight
- HemisphereLight

### 7.8 avoid adding or removing lights

When adding or removing light from the scene,all the materials supporting lights will have to be recompiled

### 7.9 shadows

Avoid Three.js shadows. Use baked shadows.

### 7.10 optimize shadow maps

- make sure the shadow maps fit perfectly with the scene
- use the `CameraHelper` to see the area that will be renderer
- try to use the smallest possible resolution with a descent result for the `mapSize`

### 7.11 use castshadow and receiveshadow wisely

### 7.12 deactivate shadow auto update

shadow maps get updated before each render.We can deactivate this auto-update and alert Three.js that the shadow maps needs update only when necessary.

```ts
renderer.shadowMap.autoUpdate = false;
renderer.shadowMap.needsUpdate = true;
```

### 7.13 resize textures

Textures take a lot of space in the GPU memory especially with the mipmaps.The texture file weight has nothing to do with that, and only the resolution matters.Try to reduce the resolution to the minimum while keeping a decent result.

### 7.14 keep a power of 2 resolutions

- When resizing, remember to keep a power of 2 resolution for mipmaps.The resolution doesn't have to be a square.If you don't do this Three.js will try to fix it by resizing the image to the closet power of 2 resolution.

- Using the right format can reduce the loading time.You can use `.jpg` or `.png` according to the image and the compression but also the alpha channel.

- You can use online tools like `TinyPNG` to reduce the weight even more.

- You can try the basis format.Basis is a format just like `.jpg` and `.png` but the compression is powerful,and the fotmat can be read by the GPI more easily.Unfortunately, it can be hard to generate and it's a lossy compression.

### 7.15 use buffergeometries

use buffer geometries instead of classic geometries

### 7.16 do not update vertices

Updating the vertices of a geometry is terrible for the performances avoid doing it in the `tick` function.If you need to animate the vertices, do it with a vertex shaders.

### 7.17 mutualize geometries

If you have multiple Meshes using the same geometry shape,create only one geometry, and use it on all the meshes.

### 7.18 merge geometries

If the geometries are not supported to move,you can merge them by using the `BufferGeometryUtils`

### 7.19 use cheap materials

Some materials like `MeshStandardMaterial` or `MeshPhysicalMaterial` need more resources than materials such as `MeshBasicMaterial`, `MeshLambertMaterial` or `MeshPhongMaterial`. Try to use the cheapest materials.

### 7.20 mutualize materials

### 7.21 use instancedmesh

### 7.23 low poly

The fewer polygons, the better.If you need details, use normal maps.

### 7.24 draco compression

If the model has a lot of details with very complex geometries,use the Draco compression. The drawbacks are a potential freeze when uncompressing the geometry, and you also have to load the Draco libraries.

### 7.25 gzip

Gzip is a compression happening on the server side.Most of the servers don't gzip files such as `.glb`, `.gltf`, `.obj` ect. See if you can figure out how to fix that, depending on the server you are using.

### field of view

When objects are not in the field of view, they won't be rendered(frustum culling).That can seem like a tawdry solution, but you can just reduce the camera's field of veiw.

### near and far

Like the field of view, you can reduce the `near` and `far` properties of the camera.

### pixel ratio

### antialias

The default antialias is performant, but less performant than no antialias. Only add it if you have visible aliasing and no performance issue.

### limit passes

### specify the precision

### keep code simple

Keep your shader codes as simple as possible. Avoid `if` statements. Make good use of swizzles and built-in functions.

### use textures

Employing perlin noise functions is cool, but it can affect your performance considerably.Sometimes, you better use a texture representing the noise.

### use defines

Uniforms are beneficial because we can tweak them and animate the values in the JavaScript, but they have a performance cost. If the value isn't supposed to change, you can use defines.

### do the calculations in the vertex shader

If possible, do the calculations in the vertex shader and send the result to the fragment shader.

> Here is another big list of tips to improve how you use Three.js by [Lewy Blue](https://discoverthreejs.com/tips-and-tricks/)
