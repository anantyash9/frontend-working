import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from 'src/app/models/device.model';
import { QuarkusService } from 'src/app/services/quarkus/quarkus.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device,
    private quarkusService: QuarkusService
  ) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
  }

  ngOnInit(): void {
  }
  registerDevice() {
    console.log(this.data);
    this.quarkusService.registerDevice(this.data).subscribe(data => {
      console.log(data);
    })
  }
}