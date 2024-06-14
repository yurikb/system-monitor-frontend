import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  private url = "http://localhost:8080/monitor";

  constructor(private http: HttpClient) { }

  getCpuUsage(): Observable<number> {
    return this.http.get<number>(`${this.url}/cpu`);
  }

  getMemoryUsage(): Observable<number>{
    return this.http.get<number>(`${this.url}/memory`)
  }

  getDiskUsage(): Observable<number> {
    return this.http.get<number>(`${this.url}/disk`)
  }

  pollData(): Observable<any> {
    return interval(1000)
      .pipe(
        switchMap(() => {
          return this.http.get<any>(this.url);
        })
      )
  }
}

