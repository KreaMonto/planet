# THREE.js Earth and Moon Simulation

This project uses THREE.js to create a 3D simulation of the Earth and the Moon. The scene includes a model of the Earth, a model of the Moon, and a starry texture as the background. Additionally, there are controls to adjust the intensity of sunlight and ambient light.

## Requirements

- Node.js
- npm

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/KreaMonto/planet.git
```

2. **Navigate to the project directory**

```bash
cd your-directory-name
```

3. **Install dependencies**

```bash
npm install
```

## Running the Project
To start the development server, use the following command:

```bash
npm run start
```
This will start the development server and open the simulation in your default web browser.

## Project Structure

- `index.js`: Main file that sets up and renders the 3D scene.
- `static/`: Directory containing the textures used in the project.
    - `WorldMap.png`: Texture for the Earth.
    - `Moonmap.png`: Texture for the Moon.
    - `stars.jpg`: Starry background.

## Code Description

### Main Configuration
1. Renderer: Configures the THREE.js renderer and adds it to the DOM.
2. Scene: Creates a new scene to which objects and lights are added.
3. Camera: Configures the camera to view the scene.
4. Controls: Commented out, but you can use OrbitControls to manage the camera view.

### Lighting
- Ambient Light: Soft light that affects all objects.
- Directional Light: Simulates sunlight.

### Textures
- Earth Texture: Loaded and applied to the 3D model of the Earth.
- Moon Texture: Loaded and applied to the 3D model of the Moon.
- Starry Background: Applied as the scene's background.

### 3D Objects
- Earth: A spherical model with texture.
- Moon: A spherical model with texture that orbits around the Earth.

### Movement
- Earth Rotation: The Earth rotates around its axis.
- Moon Orbit: The Moon orbits the Earth with an elliptical orbit.

### Animation
The `animate()` method updates the positions of the Earth and Moon and renders the scene in an animation loop.

## License
This project is licensed under the [MIT License](LICENSE).