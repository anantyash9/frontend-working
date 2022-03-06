import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from 'src/app/models/device.model';

@Component({
  selector: 'edit-add-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device,
  ) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
  }

  ngOnInit(): void {
  }
  registerDevice() {
    console.log(this.data);
  }
}