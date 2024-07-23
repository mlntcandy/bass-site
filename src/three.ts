import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  CylinderGeometry,
  SphereGeometry,
  ConeGeometry,
} from "three";

//   import { shape, speed } from "../shapeStore";

const component = document.querySelector("#cube") as HTMLElement;

const scenes = {
  cube: new Scene(),
  sphere: new Scene(),
  prisma: new Scene(),
  cylinder: new Scene(),
};

const camera = new PerspectiveCamera(
  90,
  component.clientWidth / component.clientHeight,
  0.1,
  1000
);

const renderer = new WebGLRenderer({ alpha: true });
renderer.setSize(component.clientWidth, component.clientHeight);
component.appendChild(renderer.domElement);

const material = new MeshBasicMaterial({
  map: new TextureLoader().load("vania.jpg"),
});

const shapes = {
  cube: new Mesh(new BoxGeometry(4, 4, 4), material),
  sphere: new Mesh(new SphereGeometry(3, 32, 16), material),
  prisma: new Mesh(new ConeGeometry(3, 4, 3), material),
  cylinder: new Mesh(new CylinderGeometry(2, 2, 4, 15), material),
};

Object.keys(scenes).forEach((k) => {
  // @ts-ignore
  scenes[k].add(shapes[k]);
});

camera.position.z = 5;

export function startAnimation(getF: () => number, smoothF: () => number) {
  function animate() {
    requestAnimationFrame(animate);
    let s = "cube" as keyof typeof scenes;
    let object = shapes[s];
    const f = getF() * 1.5 + 0.1;
    object.rotation.x += 0.05 * f;
    object.rotation.y += 0.025 * f;

    renderer.render(scenes[s], camera);
  }

  animate();
}
