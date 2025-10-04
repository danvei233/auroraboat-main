<template>
  <div class="cloud-banner" ref="wrap">
    <!-- 可在这里覆盖一层标题/按钮 -->
    <div class="overlay">
      <h1 class="title">AuroraBoat Cloud</h1>
      <p class="subtitle">Next-gen VPS Panel</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader }   from 'three/examples/jsm/loaders/FBXLoader.js'
import { MTLLoader }   from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader }   from 'three/examples/jsm/loaders/OBJLoader.js'
import { RGBELoader }  from 'three/examples/jsm/loaders/RGBELoader.js'

const wrap = ref<HTMLDivElement|null>(null)

let renderer:THREE.WebGLRenderer
let scene:THREE.Scene
let camera:THREE.PerspectiveCamera
let controls:OrbitControls
let raf = 0
let cloud:THREE.Object3D|null = null
let hover = { x:0, y:0 } // 视差

function fitCameraToObject(obj:THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(obj)
  const size = box.getSize(new THREE.Vector3()).length()
  const center = box.getCenter(new THREE.Vector3())
  // 相机拉远一点
  const distance = size * 0.9
  camera.near = Math.max(0.01, distance/1000)
  camera.far  = distance * 100
  camera.updateProjectionMatrix()
  camera.position.copy(center.clone().add(new THREE.Vector3(distance, distance*0.25, distance)))
  controls.target.copy(center)
  controls.update()
}

async function loadEnvMap() {
  try {
    const hdr = await new RGBELoader().loadAsync('/textures/env.hdr')
    hdr.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = hdr
  } catch { /* 可选，无 hdr 时跳过 */ }
}

async function loadModel() {
  // 优先 glb
  try {
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
    const gltf = await new GLTFLoader().loadAsync('/models/cloud/cloud.glb')
    cloud = gltf.scene
  } catch {
    // 其次 fbx
    try {
      const fbx = await new FBXLoader().loadAsync('/models/cloud/cloud.fbx')
      cloud = fbx
    } catch {
      // 最后 obj+mtl
      const mtl = await new MTLLoader().loadAsync('/models/cloud/cloud.mtl')
      mtl.preload()
      const objLoader = new OBJLoader()
      objLoader.setMaterials(mtl)
      cloud = await objLoader.loadAsync('/models/cloud/cloud.obj')
    }
  }

  if (!cloud) return
  cloud.traverse((n:any)=>{
    if (n.isMesh) {
      n.castShadow = false
      n.receiveShadow = false
      // 输出空间和色彩
      if (n.material) {
        n.material.transparent = true
        n.material.side = THREE.FrontSide
        if ('toneMapped' in n.material) n.material.toneMapped = true
      }
    }
  })
  scene.add(cloud)
  fitCameraToObject(cloud)
}

function init() {
  if (!wrap.value) return

  // 基础
  scene = new THREE.Scene()
  // 背景透明，方便做渐变/叠字
  scene.background = null

  const w = wrap.value.clientWidth
  const h = wrap.value.clientHeight

  camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 2000)

  renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // 限制 DPR
  renderer.setSize(w, h, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1
  wrap.value.appendChild(renderer.domElement)

  // 柔和光照（Hemisphere + Directional）
  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0)
  hemi.position.set(0, 1, 0)
  scene.add(hemi)

  const dir = new THREE.DirectionalLight(0xffffff, 1.0)
  dir.position.set(2, 3, 4)
  scene.add(dir)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.enablePan = false
  controls.enableDamping = true
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.6

  // 轻微视差
  const onPointer = (e:PointerEvent)=>{
    const r = renderer.domElement.getBoundingClientRect()
    const x = (e.clientX - r.left)/r.width  - 0.5
    const y = (e.clientY - r.top)/r.height - 0.5
    hover.x = x
    hover.y = y
  }
  renderer.domElement.addEventListener('pointermove', onPointer)

  // 自适应
  const onResize = ()=>{
    if (!wrap.value) return
    const W = wrap.value.clientWidth
    const H = wrap.value.clientHeight
    renderer.setSize(W, H, false)
    camera.aspect = W/H
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)

  // 记录解绑
  ;(renderer.domElement as any)._cleanup = ()=>{
    window.removeEventListener('resize', onResize)
    renderer.domElement.removeEventListener('pointermove', onPointer)
  }
}

function animate() {
  raf = requestAnimationFrame(animate)
  // 视差：轻微偏转相机
  camera.position.x += (hover.x*0.8 - camera.position.x)*0.02
  camera.position.y += (-hover.y*0.4 - camera.position.y)*0.02
  controls.update()
  renderer.render(scene, camera)
}

onMounted(async ()=>{
  init()
  await loadEnvMap()
  await loadModel()
  animate()
})

onBeforeUnmount(()=>{
  cancelAnimationFrame(raf)
  controls?.dispose()
  ;(renderer?.domElement as any)?._cleanup?.()
  renderer?.dispose()
  scene?.traverse(obj=>{
    if ((obj as any).geometry) (obj as any).geometry.dispose?.()
    if ((obj as any).material) {
      const m = (obj as any).material
      if (Array.isArray(m)) m.forEach(mm=>mm.dispose?.())
      else m.dispose?.()
    }
  })
})
</script>

<style scoped>
.cloud-banner{
  position: relative;
  width: 100%;
  height: 58vh;         /* Banner 高度，可按需改 */
  min-height: 360px;
  max-height: 760px;
  overflow: hidden;
  background: radial-gradient(120% 120% at 80% 10%, #f2ecff 0%, #ffffff 40%, #f7f7ff 100%);
  border-radius: 24px;  /* 若需要卡片式 */
}
.cloud-banner canvas{ display:block; width:100%; height:100%; }

.overlay{
  position:absolute; inset:0;
  display:flex; flex-direction:column; justify-content:center; align-items:flex-start;
  pointer-events:none; padding: clamp(16px, 6vw, 64px);
}
.title{
  margin:0; font-size: clamp(28px, 6vw, 56px); line-height:1.1; font-weight:800;
  letter-spacing: .3px;
  color: #27005f;
  text-shadow: 0 2px 18px rgba(109,106,252,.25);
}
.subtitle{
  margin:.6rem 0 0;
  font-size: clamp(14px, 2.5vw, 18px);
  color:#5a5a85;
}
</style>
