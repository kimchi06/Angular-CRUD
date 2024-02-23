import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PigService {

  pigs: any;
  res: any;
  index: number;

  constructor(private http: HttpClient) { 
    this.pigs = [];
   }

  // Retrieves all data from database
  retrieveAll() {
    return this.http.get(`https://272.selfip.net/apps/L3iqtZsoPl/collections/data1/documents/`);
  }

  add(pig) {
    // Find the next number for the key
    this.http.get<Object>('https://272.selfip.net/apps/L3iqtZsoPl/collections/data1/documents/'
    ).subscribe((data: any) => {
      this.index = 0;
      data.forEach(element => {
        if (this.index < Number(element.key.slice(4, element.key.length+1))) {
          this.index = Number(element.key.slice(4, element.key.length+1));
        }
      });
      this.index += 1;

      // Automatically determine time, status, and item number
      pig.reporterDate = new Date().getTime();
      pig.pigStatus = "Ready for pickup";
      pig.itemNumber = this.index;

      // Add pig to the app's and the server's list of pigs
      this.pigs.push(pig);
      this.http.post('https://272.selfip.net/apps/L3iqtZsoPl/collections/data1/documents/',
      {"key": `item${this.index}`, "data": pig}
      ).subscribe((data: any) => {
        console.log(data);
        this.pigs.push(data);
      });
    })
  }

  delete(itemNum: number) {
    this.http.delete<Object>(`https://272.selfip.net/apps/L3iqtZsoPl/collections/data1/documents/item${itemNum}/`
    ).subscribe()
  }

}
