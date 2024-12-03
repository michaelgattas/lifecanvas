<template>
  <v-app>
    <NuxtRouteAnnouncer />
    <v-main>
      <canvas style="height: 100%; width: 100%" ref="canvasRef">

      </canvas>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { VApp, VAppBar, VMain, VBtn, VChip } from 'vuetify/components'
import * as THREE from 'three'

import { ref, onMounted } from "vue"

const canvasRef = ref(null)
let scene, camera, renderer, orbs = []

const colors = [
    '#264653',
    '#2A9D8F',
    '#E9C46A',
    '#F4A261',
    '#E76F51'
]

const deleteRandomOrb = () => {
  if (orbs.length > 0) {
    const index = Math.floor(Math.random() * orbs.length);
    const { orb } = orbs[index];
    scene.remove(orb);
    orbs.splice(index, 1);
  }
};

const spawnNewOrb = () => {
  createOrb();
};

const createFloor = () => {
  const geometry = new THREE.PlaneGeometry(400, 400)
  const material = new THREE.MeshStandardMaterial({ color: 0x808080 })
  const floor = new THREE.Mesh(geometry, material)
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -150
  scene.add(floor)
}

const createOrb = () => {
  const geometry = new THREE.SphereGeometry(Math.random()* 3, 32, 32)
  const material = new THREE.MeshStandardMaterial({ emissive: colors[Math.floor(Math.random() * 5)], emissiveIntensity: 1 })
  const orb = new THREE.Mesh(geometry, material);
  orb.position.set(Math.random() * 200 - 100, 200, Math.random() * 200 - 100);
  const velocity = { x: 0, y: -Math.random(), z: 0 };
  orbs.push({ orb, velocity })
  scene.add(orb);
}

const animate = () => {
  requestAnimationFrame(animate);
  orbs.forEach(({ orb, velocity }) => {
    orb.position.y += velocity.y;
    if (orb.position.y < -100) { // Adjusted for the floor height
      orb.position.y = -100;
      velocity.y = -velocity.y * 0.7; // Reverse and reduce the velocity to simulate a bounce
    }
    velocity.y -= 0.01; // Apply gravity
  });

  // Randomly delete and spawn orbs
  if (Math.random() < 0.5) { // Adjust the probability as needed
    spawnNewOrb();
  }

  if (Math.random() < 0.1) { // Adjust the probability as needed
    deleteRandomOrb();
  }

  renderer.render(scene, camera);
};

const init = () => {
  const canvas = canvasRef.value
  const width = window.innerWidth
  const height = window.innerHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 100

  renderer = new THREE.WebGLRenderer({ canvas })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)

  const light = new THREE.PointLight(0xffffff, 200, 1)
  light.position.set(50, 50, 50)
  scene.add(light)

  animate()
}
onMounted(() => {
  init()
  window.addEventListener("resize", () => {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {})
});
</script>