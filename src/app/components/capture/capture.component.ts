import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuarkusService } from 'src/app/services/quarkus/quarkus.service';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.css']
})
export class CaptureComponent implements OnInit,AfterViewInit {
  WIDTH = 640;
  HEIGHT = 480;
  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;
  
  captures: string[] = [];
  error: any;
  isCaptured: boolean;
  isRegistered:boolean=false;
  stream: MediaStream;

  constructor(private quarkusService:QuarkusService) { }
  async ngAfterViewInit():Promise<void> {
   await this.setupDevices();

  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
         this.stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (this.stream) {
          this.video.nativeElement.srcObject = this.stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }
  stopBothVideoAndAudio() {
    this.stream.getTracks().forEach(function(track) {
        if (track.readyState == 'live') {
            track.stop();
        }
    });
}


  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    this.isCaptured = true;
    this.stopBothVideoAndAudio()

    fetch(this.canvas.nativeElement.toDataURL("image/png"))
    .then(res => res.blob())
    .then(blob => {
    this.quarkusService.register(blob).subscribe( data => {
      console.log(data);
      this.isRegistered=true;
      });})

  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  ngOnInit(): void {
  }

}
