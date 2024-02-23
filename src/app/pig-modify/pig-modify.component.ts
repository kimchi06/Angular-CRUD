import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'

import { PigService } from '../pig.service';

@Component({
  selector: 'app-pig-modify',
  templateUrl: './pig-modify.component.html',
  styleUrls: ['./pig-modify.component.css']
})

export class PigModifyComponent implements OnInit {
  key: any;
  pig: any;

  constructor(private router: Router, private http: HttpClient, private ps: PigService, private ActivatedRoute: ActivatedRoute ) {
    this.key;
    this.pig;
  }

  ngOnInit(): void {
    this.key = this.ActivatedRoute.snapshot.paramMap.get('key');

    // Obtain data associated with the key
    this.http.get<Object>(`https://272.selfip.net/apps/L3iqtZsoPl/collections/data1/documents/${this.key}`
    ).subscribe((data: any) => {
      this.pig = data;
    })    
  }

  clickRetrieved() {
    this.pig.data.pigStatus = "Retrieved";
    this.http.put<Object>(`https://272.selfip.net/apps/L3iqtZsoPl/collections/data1/documents/${this.key}`,
    {"key": `${this.key}`, "data": this.pig.data}).subscribe((data: any) => {
      console.log(data);
    })
  }

  clickUndo() {
    this.pig.data.pigStatus = "Ready for pickup";
    this.http.put<Object>(`https://272.selfip.net/apps/L3iqtZsoPl/collections/data1/documents/${this.key}`,
    {"key": `${this.key}`, "data": this.pig.data}).subscribe((data: any) => {
      console.log(data);
    })
  }

  goHome() {
    this.router.navigate(["/"]);
  }
}
