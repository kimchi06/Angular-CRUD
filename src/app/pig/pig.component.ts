import { Component, OnInit, AfterContentInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { PigService } from '../pig.service';
import { HttpClient } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pig',
  templateUrl: './pig.component.html',
  styleUrls: ['./pig.component.css']
})

export class PigComponent implements AfterViewInit {

  pigs: any;
  pigsData: any[];
  data: any;
  dataSource: any;
  displayedColumns: string[] = ['reporterLocation', 'reporterName', 'reporterDate', 'pigStatus', 'modify', 'delete'];

  constructor(private http: HttpClient, private ps: PigService, private router: Router, private route: ActivatedRoute) { 
    this.pigs = [];
    this.pigsData = [];
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    // this.data.resolverData is the list of keys and its data
    this.data = this.route.snapshot.data;
    this.pigs = this.data.resolverData;

    // Create a new list without keys for sorting purposes
    this.pigsData = [];
    this.data.resolverData.forEach(element => {
      this.pigsData.push(element.data);
    });

    // Then add each to table
    this.dataSource = new MatTableDataSource(this.pigsData);
    this.dataSource.sort = this.sort;
    
    console.log(this.pigsData)
  }

  refreshList() {
    // this.data.resolverData is the list of keys and its data
    this.data = this.route.snapshot.data;
    this.pigs = this.data.resolverData;
    console.log(this.pigs)

    // Create a new list without keys for sorting purposes
    this.pigsData = [];
    this.pigs.forEach(element => {
      this.pigsData.push(element.data);
    });

    // Then add each to table
    this.dataSource = new MatTableDataSource(this.pigsData);
    this.dataSource.sort = this.sort;
  }

  onModify(key: number) {
    let userPW = prompt("Enter a password to continue:");

    this.http.get<Object>(`https://api.hashify.net/hash/md5/hex?value=${userPW}`
    ).subscribe((data: any) => {
      if (data.Digest == "84892b91ef3bf9d216bbc6e88d74a77c") {
        console.log("Accepted")
        this.router.navigate(["/modify", `item${key}`]);
      }
      else {
        alert("Denied")
      }
    })
  }

  onDelete(iN: number) {
    let userPW = prompt("Enter a password to continue:");

    this.http.get<Object>(`https://api.hashify.net/hash/md5/hex?value=${userPW}`
    ).subscribe((data: any) => {
      if (data.Digest == "84892b91ef3bf9d216bbc6e88d74a77c") {
        console.log("Accepted")
        // Run delete command from services
        this.http.delete<Object>(`https://272.selfip.net/apps/L3iqtZsoPl/collections/data1/documents/item${iN}/`
        ).subscribe((data: any) => {
          // Delete from local array
          this.pigs = this.pigs.filter(p=>p.data.itemNumber !== iN);
          console.log(this.pigs)
        })
      }
      else {
        alert("Denied")
      }
    })



    
  }

  addButton() {
    this.router.navigate(["/add"]);
  }
}
