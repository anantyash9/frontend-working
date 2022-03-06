import { AfterViewInit, Component, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { QuarkusService } from 'src/app/services/quarkus/quarkus.service';

@Component({
  selector: 'app-registered-users-view',
  templateUrl: './registered-users-view.component.html',
  styleUrls: ['./registered-users-view.component.css']
})
export class RegisteredUsersViewComponent implements AfterViewInit {

  displayedColumns = ['Name','ID',"Date","Time", 'Active','Marked For Deletion'];
  dataSource: MatTableDataSource<UserData>;
  tempgreen="#32a852"
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  constructor(private quarkusService:QuarkusService,private changeDetectorRefs:ChangeDetectorRef,private router:Router) {}

 ngAfterViewInit() {
   const users: UserData[] = [];
    this.quarkusService.getRegisteredUsers().subscribe(data=>{
      data.forEach(element => {
        var date = new Date(Date.parse(element.createdAt));
        var date_str=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
        var time_str=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        Object.assign(element, {date: date_str});
        Object.assign(element, {time: time_str});

        users.push(element);
        console.log(element);
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    })
  }
  //  this.quarkusService.getAttendence().subscribe(data=>{
  //    data.forEach(element => {
  //      var date = new Date(Date.parse(element.createdAt));
  //      var date_str=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
  //      var time_str=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  //      Object.assign(element, {date: date_str});
  //      Object.assign(element, {time: time_str});
  //      users.push(element);
  //      console.log(element);
  //      this.dataSource = new MatTableDataSource(users);
  //      this.dataSource.paginator = this.paginator;
  //      this.dataSource.sort = this.sort;
  //    });
  //  });

   // Assign the data to the data source for the table to render
   



 applyFilter(filterValue: string) {
   filterValue = filterValue.trim(); // Remove whitespace
   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
   this.dataSource.filter = filterValue;
 }
 userDetails(row,event){
   if (event==2){
     this.router.navigate(['user-attendence'],{"state":row});
   }
   else if(event=="toggleMarked"){
   console.log(event);
   row.deletion=!row.deletion;
   var update={deletion:row.deletion,id:row.id};
    this.quarkusService.updateRegisteredUsers(update).subscribe(data=>{
      console.log(data);
    })

   }
    else if(event=="toggleActive"){
   console.log(event);
    row.enabled=!row.enabled;
    var update2={enabled:row.enabled,id:row.id};
    this.quarkusService.updateRegisteredUsers(update2).subscribe(data=>{
      console.log(data);
    })

   }
 }
}

export interface UserData {
 name: string;
 id:string;
 date: string;
 time:string;
 enabled:boolean;
 deletion:boolean;
}

