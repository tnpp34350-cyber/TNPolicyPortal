import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  // Post a new best practice record to backend API
  addRecord(record: any): Observable<any> {
    // Replace with your real API endpoint
    return this.http.post('/api/best-practices', record);
  }
}
