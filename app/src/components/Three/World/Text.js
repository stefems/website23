import * as THREE from 'three'
import Experience from '../Experience.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


export default class Text{
  constructor(){
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    this.text = null
    this.set()
  }

  set() {
    const fontLoader = new FontLoader()
    fontLoader.load(
      '/fonts/helvetiker_regular.typeface.json',
      (font) =>
      {
          // Text
          const textGeometry = new TextGeometry(
              `STEFAN'S WEBSITE`,
              {
                  font: font,
                  size: 0.5,
                  height: 0.2,
                  curveSegments: 12,
                  bevelEnabled: true,
                  bevelThickness: 0.03,
                  bevelSize: 0.02,
                  bevelOffset: 0,
                  bevelSegments: 5
              }
          )
          textGeometry.center()
  
          this.text = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({ color: 'lime' }))
          this.scene.add(this.text)
      }
  )
  }
  update() {
    if (this.text) {
      // this.text.rotation.y = Math.sin(this.time.elapsed * 0.001)
      // this.text.scale.x = Math.sin(this.time.elapsed * 0.001)
      this.text.scale.y = this.time.elapsed * 0.0001 * 10
      // this.text.position.z = Math.sin(this.time.elapsed * 0.001) - 5
    }
  }
}