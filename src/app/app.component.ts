import {AfterViewInit, Component, ComponentRef, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

import {
  BoxGeometry, BufferGeometry, DirectionalLight, Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial, MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from "three";
import {animate} from "@angular/animations";
import {fromEvent, interval} from "rxjs";
import {pairwise, switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private renderer = new WebGLRenderer();
  private scene = new Scene();
  private camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  private geometry = new BoxGeometry();
  private material = new MeshPhongMaterial({color: 0x00ff00});

  private cube = new Mesh(this.geometry, this.material);

  constructor(
  ){}

  public ngAfterViewInit(): void {

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( this.renderer.domElement );

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);

    this.scene.add(this.cube);

    this.camera.position.z = 4;

    // this.animateCube();

    // this.renderer.render(this.scene, this.camera);

    fromEvent(this.renderer.domElement, 'wheel').subscribe((x: WheelEvent ) => {
      if (x.deltaY > 0) {
        this.camera.position.z += 1;
      } else {
        this.camera.position.z -= 1;
      }

      this.renderer.render(this.scene, this.camera);
    });

    this.handleMouseAction();
  }

  private animateCube(time?: number): void {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame( (time1 => this.animateCube(time1)) );
  }

  private runAnimation(): void {
    requestAnimationFrame( this.animateCube );

    this.animateCube();
  }

  private handleMouseAction(): void {
    fromEvent(this.renderer.domElement, 'mousedown')
      .pipe(
        switchMap(() => fromEvent(this.renderer.domElement, 'mousemove')),
        pairwise(),
        takeUntil(fromEvent(this.renderer.domElement, 'mouseup')),
      )
      .subscribe(
        ([first, second]: [ MouseEvent,  MouseEvent ]) => {
          console.log(first);

        if (first.screenX - second.screenX > 0) {
          this.cube.rotation.x -= 0.01;
        } else {
          this.cube.rotation.x += 0.01;
        }

          if (first.screenY - second.screenY > 0) {
            this.cube.rotation.y -= 0.01;
          } else {
            this.cube.rotation.y += 0.01;
          }

          this.renderer.render(this.scene, this.camera);
      },
        null,
        () => this.handleMouseAction()
      );
  }
}
