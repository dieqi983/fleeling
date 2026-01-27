<template>
  <canvas
    ref="showCubeRef"
    class="show-cube"
    @click="onClick"
    @mousedown="handleMousedown"
  ></canvas>
</template>

<script setup>
import * as THREE from 'three'

const showCubeRef = ref(null)
const props=defineProps(
  {
    textures:{
      type:Array,
      required:true,
    },
    dragRotationSpeed:{
      type:Number,
      default:0.003,
    },
    cubeSize:{
      type:Object,
      default:{
        height:5,
        width:5,
        depth:5,
      }
    },
    cameraPositon:{
      type:Object,
      default:{
        x:0,
        y:0,
        z:10,
      }
    },
    cameraLookAt:{
      type:Object,
      default:{
        x:0,
        y:0,
        z:0,
      }
    },
    backRotationSpeed:{
      type:Number,
      default:0.15
    },
    autoRotationSpeed:{
      type:Number,
      default:0.004,
    }
  }
)
const emits=defineEmits(['opationPicture'])
let renderer, scene, camera, cube
let animationId

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

let targetRotation = null
let isAnimating = false
let autoRotate = true
let isDragging = false

let previousMousePosition = { x: 0, y: 0 }
let hasMoved = false
const DRAG_THRESHOLD = 5 
const faceRotationMap = {
  0: { x: 0, y: -Math.PI / 2 },
  1: { x: 0, y: Math.PI / 2 },
  2: { x: Math.PI / 2, y: 0 },
  3: { x: -Math.PI / 2, y: 0 },
  4: { x: 0, y: 0 },
  5: { x: 0, y: Math.PI }
}

const handleMousedown = (event) => {
  event.preventDefault()

  targetRotation = null
  isAnimating = false
  autoRotate = false

  isDragging = true
  hasMoved = false

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  }
  document.addEventListener('mousemove',handleMousemove)
  document.addEventListener('mouseup',handleMouseup)
}

const handleMousemove = (event) => {
  if (!isDragging) return

  const deltaX = event.clientX - previousMousePosition.x
  const deltaY = event.clientY - previousMousePosition.y

  if (
    Math.abs(deltaX) > DRAG_THRESHOLD ||
    Math.abs(deltaY) > DRAG_THRESHOLD
  ) {
    hasMoved = true
  }
  cube.rotation.y += deltaX * props.dragRotationSpeed
  cube.rotation.x += deltaY * props.dragRotationSpeed

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  }
}

const handleMouseup = () => {
  isDragging = false
  document.removeEventListener('mousemove',handleMousemove)
  document.removeEventListener('mouseup',handleMouseup)
  setTimeout(() => {
    if (!isDragging && !isAnimating) {
      autoRotate = true
    }
  }, 0)
}

// 角度工具函数
const normalizeAngle = (angle) => {
  angle %= Math.PI * 2
  if (angle > Math.PI) angle -= Math.PI * 2
  if (angle < -Math.PI) angle += Math.PI * 2
  return angle
}

const shortestAngleDifference = (from, to) => {
  let diff = to - from
  if (diff > Math.PI) diff -= Math.PI * 2
  if (diff < -Math.PI) diff += Math.PI * 2
  return diff
}

const getCorrectRotation = (current, target) => {
  const cx = normalizeAngle(current.x)
  const cy = normalizeAngle(current.y)
  const tx = normalizeAngle(target.x)
  const ty = normalizeAngle(target.y)

  return {
    x: current.x + shortestAngleDifference(cx, tx),
    y: current.y + shortestAngleDifference(cy, ty)
  }
}

const getExactFaceRotation = (faceIndex) => {
  return { ...faceRotationMap[faceIndex] }
}

const initShowCube = () => {
  const width = showCubeRef.value.clientWidth
  const height = showCubeRef.value.clientHeight

  renderer = new THREE.WebGLRenderer({
    canvas: showCubeRef.value,
    antialias: true,
    alpha: true
  })
  renderer.setSize(width, height,false)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000)
  camera.position.set(props.cameraPositon.x, props.cameraPositon.y, props.cameraPositon.z)
  camera.lookAt(props.cameraLookAt.x, props.cameraLookAt.y, props.cameraLookAt.z)

  const geometry = new THREE.BoxGeometry(props.cubeSize.height, props.cubeSize.width, props.cubeSize.depth)
  const loader = new THREE.TextureLoader()

  const createTexture = (url) => {
    const texture = loader.load(url)
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.anisotropy = 16
    return texture
  }

  const materials = [
    ...props.textures.map((texture)=>{
      return new THREE.MeshBasicMaterial({ map: createTexture(texture) })
    })
  ]

  cube = new THREE.Mesh(geometry, materials)
  scene.add(cube)

  animate()
}

const onClick = (event) => {

  if (hasMoved || isDragging || isAnimating) return

  const rect = renderer.domElement.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObject(cube)

  if (intersects.length) {
    const faceIndex = intersects[0].face.materialIndex
    const targetFaceRotation = getExactFaceRotation(faceIndex)

    targetRotation = getCorrectRotation(cube.rotation, targetFaceRotation)
    isAnimating = true
    autoRotate = false
    emits('opationPicture',faceIndex)
  }
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  if (targetRotation && isAnimating) {
    const cx = normalizeAngle(cube.rotation.x)
    const cy = normalizeAngle(cube.rotation.y)
    const tx = normalizeAngle(targetRotation.x)
    const ty = normalizeAngle(targetRotation.y)

    const dx = shortestAngleDifference(cx, tx)
    const dy = shortestAngleDifference(cy, ty)
    cube.rotation.x += dx * props.backRotationSpeed
    cube.rotation.y += dy * props.backRotationSpeed

    if (Math.abs(dx) + Math.abs(dy) < 0.001) {
      cube.rotation.x = targetRotation.x
      cube.rotation.y = targetRotation.y
      targetRotation = null
      isAnimating = false

      setTimeout(() => {
        if (!isDragging) autoRotate = true
      }, 500)
    }
  } else if (autoRotate && !isDragging) {
    cube.rotation.x += props.autoRotationSpeed
    cube.rotation.y += props.autoRotationSpeed
  }

  renderer.render(scene, camera)
}

const  handleResize = () => {
  const w = showCubeRef.value.clientWidth
  const h = showCubeRef.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w,h,false)
}

onMounted(async () => {
  await nextTick()
  initShowCube()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  cube.geometry.dispose()
  cube.material.forEach(m => {
    m.map?.dispose()
    m.dispose()
  })
  renderer.dispose()
})
</script>

<style scoped>
.show-cube {
  width: 100%;
  height: 100%;
  display: block;
}
</style>