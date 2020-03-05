import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Material, Mesh, PerspectiveCamera, PlaneGeometry, Scene, WebGLRenderer} from "three";

@Component({
  selector: 'app-unroll',
  templateUrl: './unroll.component.html',
  styleUrls: ['./unroll.component.scss']
})
export class UnrollComponent implements OnInit, AfterViewInit {
  @ViewChild('container', {static: false}) public containerComp: ElementRef;

  private renderer = new WebGLRenderer();
  private scene = new Scene();
  private camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  constructor() {
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.renderer.setSize(1000, 1000);
    this.containerComp.nativeElement.appendChild(this.renderer.domElement);

    this.scene.add(
      new Mesh(
        new PlaneGeometry(640, 480),
        new Material()
      )
    );
  }
}
