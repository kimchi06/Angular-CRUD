import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PigService } from '../pig.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-pig-add',
  templateUrl: './pig-add.component.html',
  styleUrls: ['./pig-add.component.css']
})

export class PigAddComponent implements OnInit{
  form: FormGroup;
  data: any;
  locations: any;
  locationsList: any[];
  uniqueList: any[];

  constructor(private ps: PigService, private router: Router, private route: ActivatedRoute) {
    let formControls = {
      reporterName: new FormControl('', [Validators.required]),
      reporterPhone: new FormControl('', [Validators.required]),
      pigBreed: new FormControl('unknown', [Validators.required]),
      pigID: new FormControl('', [Validators.required]),
      newLoc: new FormControl('new', [Validators.required]),
      reporterLocation: new FormControl('', [Validators.required]),
      reporterLong: new FormControl('', [Validators.required, this.longitudeValidator]),
      reporterLat: new FormControl('', [Validators.required, this.latitudeValidator]),
      reporterNotes: new FormControl('')
    }

    this.form = new FormGroup(formControls, { validators: [this.newLocationValidator], updateOn: 'change'});

    this.locations = this.route.snapshot.data;
    this.locations = this.locations.resolverData;

    this.locationsList = [];
    this.uniqueList = [];
    this.locations.forEach(element => {
      // If location doesn't exist yet, add it, otherwise nothing
      if (this.locationsList.includes(element.data.reporterLocation) == false) {
        this.locationsList.push(element.data.reporterLocation);
        this.uniqueList.push(element.data);
      }
    });
  }

  longitudeValidator(control: FormControl) {
    if (control.value < -180 || control.value > 180) {
      return { long_error: "Must be within bounds (-180, 180)" };
    }
    else {
      return null;
    }
  }

  latitudeValidator(control: FormControl) {
    if (control.value < -85 || control.value > 85) {
      return { lat_error: "Must be within bounds (-85, 85)" };
    }
    else {
      return null;
    }
  }

  newLocationValidator: ValidatorFn = (control: AbstractControl): ValidationErrors  | null => {
    this.data = this.route.snapshot.data;
    this.data = this.data.resolverData;
    var invalid_long = [];
    var invalid_lat = [];

    this.data.forEach(element => {
      invalid_long.push(element.data.reporterLong);
      invalid_lat.push(element.data.reporterLat);
    });

    var accept: boolean = true;

    // Check for duplicate coords IFF new location selected
    if (control.get("newLoc").value == "new") {
      var long = control.get("reporterLong");
      var lat = control.get("reporterLat");
      console.log("added")
      control.get("reporterLocation").setValidators([Validators.required]);
      control.get("reporterLong").setValidators([Validators.required, this.longitudeValidator]);
      control.get("reporterLat").setValidators([Validators.required, this.latitudeValidator]);
      for (let x = 0; x < invalid_long.length; x++) {
        if (invalid_long[x] == (long.value) && invalid_lat[x] == (lat.value)) {
          accept = false;
        }
      }
    }
    else {
      control.get("reporterLocation").clearValidators();
      control.get("reporterLong").clearValidators();
      control.get("reporterLat").clearValidators();
    }

    console.log("accept???   " + accept)
    
    return accept
           ? null: { form_error: "Matching locations" }
  }

  findLong(loc) {
    var found;
    this.locations.forEach(element => {
      if (element.data.reporterLocation == loc) {
        found = element.data.reporterLong;
      }
    });
    return found;
  }

  findLat(loc) {
    var found;
    this.locations.forEach(element => {
      if (element.data.reporterLocation == loc) {
        found = element.data.reporterLat;
      }
    });
    return found;
  }

  onSubmit(values) {
    console.log(values);
    this.ps.add(values);

    this.router.navigate(["/"]);
  }

  goHome() {
    this.router.navigate(["/"]);
  }

  ngOnInit(): void { }

}
