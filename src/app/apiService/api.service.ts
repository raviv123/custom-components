import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { dashboard } from '../mockData';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getDashboard(){
    return of(dashboard)
  }


}
