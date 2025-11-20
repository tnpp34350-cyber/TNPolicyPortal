import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface BestPractice {
  id?: string;
  bestpractice: string;
  sector: string;
  district: string;
  policies?: string[];
  files?: any[];
}

const MOCK_RECORDS: BestPractice[] = [
  {
    id: '1',
    bestpractice: 'Water Conservation Initiative',
    sector: 'Water & WASH',
    district: 'Coimbatore',
    policies: ['Water Resources Management', 'Environmental Protection'],
    files: []
  },
  {
    id: '2',
    bestpractice: 'Renewable Energy Adoption',
    sector: 'Energy',
    district: 'Tiruppur',
    policies: ['Clean Energy Policy', 'Sustainability Framework'],
    files: []
  },
  {
    id: '3',
    bestpractice: 'Health Awareness Program',
    sector: 'Health',
    district: 'Salem',
    policies: ['Public Health Act', 'Disease Prevention'],
    files: []
  },
  {
    id: '4',
    bestpractice: 'Skill Development Program',
    sector: 'Skilling & Livelihoods',
    district: 'Chennai',
    policies: ['Skill India Mission', 'Employment Generation'],
    files: []
  },
  {
    id: '5',
    bestpractice: 'Organic Farming Promotion',
    sector: 'Agriculture',
    district: 'Madurai',
    policies: ['Agricultural Policy', 'Sustainable Farming'],
    files: []
  },
  {
    id: '6',
    bestpractice: 'Heritage Tourism Development',
    sector: 'Tourism',
    district: 'Thanjavur',
    policies: ['Tourism Policy', 'Cultural Preservation'],
    files: []
  },
  {
    id: '7',
    bestpractice: 'Wastewater Treatment System',
    sector: 'Water & WASH',
    district: 'Erode',
    policies: ['Water Quality Standards', 'Environmental Protection'],
    files: []
  },
  {
    id: '8',
    bestpractice: 'Solar Power Integration',
    sector: 'Energy',
    district: 'Kanchipuram',
    policies: ['Renewable Energy Target', 'Grid Modernization'],
    files: []
  },
  {
    id: '9',
    bestpractice: 'Community Health Center Excellence',
    sector: 'Health',
    district: 'Villupuram',
    policies: ['Healthcare Access', 'Quality Improvement'],
    files: []
  },
  {
    id: '10',
    bestpractice: 'Women Entrepreneurship Training',
    sector: 'Skilling & Livelihoods',
    district: 'Vellore',
    policies: ['Economic Empowerment', 'Skill Development'],
    files: []
  },
  {
    id: '11',
    bestpractice: 'Sustainable Horticulture Models',
    sector: 'Agriculture',
    district: 'Krishnagiri',
    policies: ['Crop Diversification', 'Sustainable Farming'],
    files: []
  },
  {
    id: '12',
    bestpractice: 'Cultural Heritage Conservation',
    sector: 'Tourism',
    district: 'Karur',
    policies: ['Heritage Protection', 'Cultural Tourism'],
    files: []
  }
];

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  listRecords(): Observable<BestPractice[]> {
    return this.http.get<BestPractice[]>('/api/best-practices').pipe(
      catchError(() => of(MOCK_RECORDS))
    );
  }

  // Post a new best practice record to backend API
  addRecord(record: any): Observable<any> {
    return this.http.post('/api/best-practices', record).pipe(
      catchError(() => of(record))
    );
  }

  getRecord(id: string): Observable<BestPractice> {
    return this.http.get<BestPractice>(`/api/best-practices/${id}`).pipe(
      catchError(() => of(MOCK_RECORDS.find(r => r.id === id) || MOCK_RECORDS[0]))
    );
  }

  updateRecord(id: string, record: BestPractice): Observable<BestPractice> {
    return this.http.put<BestPractice>(`/api/best-practices/${id}`, record).pipe(
      catchError(() => of(record))
    );
  }

  deleteRecord(id: string): Observable<any> {
    return this.http.delete(`/api/best-practices/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post('/api/upload', formData).pipe(
      catchError(() => of(null))
    );
  }

  deleteFile(id: string): Observable<any> {
    return this.http.delete(`/api/files/${id}`).pipe(
      catchError(() => of(null))
    );
  }
}
