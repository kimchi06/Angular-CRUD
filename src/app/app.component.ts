import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
import { PigService } from './pig.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  title = 'PigTracker'; 

  private map;
  pigs: any[];
  data: any;
  knownLong: any[];
  knownLat: any[];
  list: any[];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.pigs = [];
    this.knownLat = [];
    this.knownLong = [];
    this.list = [];
  }

  ngAfterViewInit(): void {
    this.map = L.map("mapID").setView([49.2, -123], 11);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGprNSIsImEiOiJjbGI5Mzg4ZXgwcXp4M3BwamtqeGdvcjdmIn0.8WbYZ96EoQNQ4fLkQieTZA', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    // First, get data from server
    this.http.get(`https://272.selfip.net/apps/L3iqtZsoPl/collections/data1/documents/`
    ).subscribe((data: any) => {
      this.pigs = data;
      // Go through each pig and see if its coords have already been identified
      this.pigs.forEach(element => {
        // If known, increase count by 1
        if (this.knownLong.includes(element.data.reporterLong) && this.knownLat.includes(element.data.reporterLat)) {
          this.list.forEach(item => {
            if (item[0] == element.data.reporterLocation) {
              item[1] += 1;
            }
          });
        }
        // If new location, add its coords and name to list
        else {
          this.list.push([element.data.reporterLocation, 1, element.data.reporterLat, element.data.reporterLong]);
          this.knownLat.push(element.data.reporterLat);
          this.knownLong.push(element.data.reporterLong);
        }
      });
      console.table(this.list)
      this.list.forEach(loc => {
        L.marker([loc[2], loc[3]]).addTo(this.map)
        .bindPopup(`<b>${loc[0]}</b><br>${loc[1]} pigs reported.`).openPopup();
      });
    })
    

    
    
  }
}