import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialogue',
  templateUrl: './confirm-dialogue.component.html',
  styleUrls: ['./confirm-dialogue.component.css']
})
export class ConfirmDialogueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogueComponent>) {}

  public confirmMessage:string;

  ngOnInit(): void {
  }

}
