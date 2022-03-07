import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from 'src/app/models/device.model';
import { QuarkusService } from 'src/app/services/quarkus/quarkus.service';

@Component({
  selector: 'edit-add-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device,
    private quarkusService: QuarkusService
  ) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
  }

  ngOnInit(): void {
  }
  editDevice() {
    delete this.data.createdAt;
    delete this.data.updatedAt;
    this.quarkusService.editDevice(this.data).subscribe(data => {
      console.log(data);
      this.data=<Device>data;
      this.dialogRef.close();
    })
      
  }
}