import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import {Geometry, PerspectiveCamera, Scene, WebGLRenderer} from "three";

// @ts-ignore
import * as THREE from 'three';

import loadFont from "load-bmfont";

import createGeometry from "three-bmfont-text"

import MSDFShader from "three-bmfont-text/shaders/msdf"

// @ts-ignore
import colors from "nice-color-palettes";

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {shaders} from "./shaders/shader";

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})

export class TextComponent implements OnInit, AfterViewInit {
  @ViewChild('container') public containerComp: ElementRef;

  private renderer = new THREE.WebGLRenderer({antialias: true});
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  private geometry: THREE.Geometry = new THREE.Geometry();

  private loader = new THREE.TextureLoader();

  private clock = new THREE.Clock();


  private material;

  private controls = new OrbitControls(this.camera, this.renderer.domElement);

  private mesh: THREE.Mesh;

  constructor() { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    const palette = colors[4];
    const background = palette[4];

    this.camera.position.z = 100;

    this.renderer.setSize(1000, 1000);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(background);
    this.containerComp.nativeElement.appendChild(this.renderer.domElement);

    this.renderer.render(this.scene, this.camera);

    loadFont('assets/font.fnt', (err, font) => {
      this.geometry = createGeometry({
        font,
        text: 'Test'
      });
    });

    this.loader.load('assets/fontt.png', texture => {
      setTimeout(() => {
        this.init(this.geometry, texture);
        this.animate();
      }, 1500);
    });
  }

  init(geometry, texture) {
    this.createMesh(geometry, texture);
    // this.onResize();
    // window.addEventListener("resize", () => this.onResize(), false);
    this.render();
  }

  createMesh(geometry, texture) {
    // Material
    this.material = new THREE.RawShaderMaterial(
      MSDFShader({
        vertexShader: shaders[0].vertex,
        fragmentShade: shaders[0].fragment,
        map: texture,
        color: 0x00000,
        side: THREE.DoubleSide,
        transparent: true,
        negate: false
      })
    );

    this.material.uniforms.time = {type: "f", value: 0};

    console.log(this.material);

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.set(-40, 0, 0); // Move according to text size
    this.mesh.rotation.set(Math.PI, 0, 0); // Spin to face correctly
    this.scene.add(this.mesh)
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    this.mesh.material['uniforms'].time.value = this.clock.getElapsedTime();
    this.mesh.material['uniformsNeedUpdate'] = true;

    this.renderer.render(this.scene, this.camera);
  }
}
