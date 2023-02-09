import { Component,OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'mobile', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  employeelist:any
  constructor(private service:EmployeeService) {}
  ngOnInit(): void {
    this.getAllemployeeList()

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllemployeeList() {
    this.service.getEmployeeList().subscribe(res => {
      console.log(res);
      this.employeelist = res;
      this.dataSource = new MatTableDataSource(this.employeelist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  deleteEmployee(id: any) {
    this.service.deleteEmployee(id).subscribe((res) => {
    this.getAllemployeeList()
    })
  }
}
