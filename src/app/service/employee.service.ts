import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private URL = "http://localhost:3000/posts"
  constructor(private http: HttpClient) { }
  getEmployeeList() {
    return this.http.get<any>(this.URL)
  }
  createEmployee(data: any) {
    return this.http.post<any>(this.URL, data)
  }
  updateEmployee(data: any, id: any) {
    return this.http.put<any>(this.URL + '/' + id, data)
  }
  deleteEmployee(id: number) {
    return this.http.delete<any>(this.URL + '/' + id)
  }
  getidEmployee(id: any) {
    return this.http.get<any>(this.URL + '/' + id)
  }

}
