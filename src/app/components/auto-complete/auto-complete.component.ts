import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
})
export class AutoCompleteComponent implements OnDestroy {
  @Output()
  locationChange: EventEmitter<PlaceSuggestion> = new EventEmitter<PlaceSuggestion>();

  searchOptions: Subject<PlaceSuggestion[]> = new Subject<PlaceSuggestion[]>();
  inputFieldFormControl: FormControl = new FormControl();

  private valueChangesSub: Subscription;
  private choosenOption: PlaceSuggestion;

  private userInputTimeout: number;
  private requestSub: Subscription;

  constructor(public translate: TranslateService, private http: HttpClient) {
    this.valueChangesSub = this.inputFieldFormControl.valueChanges.subscribe((value) => {
      if (this.userInputTimeout) {
        window.clearTimeout(this.userInputTimeout);
      }

      if (this.choosenOption && this.choosenOption.shortAddress === value) {
        this.searchOptions.next(null);
        return;
      }

      if (!value || value.length < 3) {
        // do not need suggestions until for less than 3 letters
        this.searchOptions.next(null);
        return;
      }

      this.userInputTimeout = window.setTimeout(() => {
        this.generateSuggestions(value);
      }, 300);
    });
  }

  ngOnDestroy() {
    this.valueChangesSub.unsubscribe();
  }

  private generateSuggestions(text: string) {
    const REST_KEY = 'INxGhspY9TqShx3heSZSBmobOsutPeE9eJaTxfHiiQQ';
    const url = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${text}&limit=5&apiKey=${REST_KEY}`;

    if (this.requestSub) {
      this.requestSub.unsubscribe();
    }

    this.http.get(url).subscribe(
      (data: any) => {
        console.log(data);

        const placeSuggestions = data.suggestions.map((feature) => {
          return {
            shortAddress: this.generateShortAddress(feature),
            fullAddress: this.generateFullAddress(feature),
            data: feature,
          };
        });

        this.searchOptions.next(placeSuggestions.length ? placeSuggestions : null);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // tslint:disable-block
  private generateShortAddress(properties: any): string {
    console.log('PROPS', properties);

    const shortAddress = properties.label;

    /* if (!shortAddress && properties.street && properties.housenumber) {
      // name is not set for buildings
      shortAddress = `${properties.street} ${properties.housenumber}`;
    }

    shortAddress += (properties.address.postcode && properties.address.city) ?
    `, ${properties.address.postcode}-${properties.address.city}` : '';
    shortAddress += (!properties.address.postcode && properties.address.city
    && properties.address.city !== properties.address.name) ? `, ${properties.address.city}` : '';
    shortAddress += (properties.address.country && properties.address.country
     !== properties.address.name) ? `, ${properties.address.country}` : '';
 */
    return shortAddress;
  }

  // tslint:disable-block
  private generateFullAddress(properties: any): string {
    const fullAddress = properties.label;
    // tslint:disable-block
    /*   fullAddress += properties.address.street ? `,
    ${properties.address.street}` : '';
    fullAddress += properties.address.housenumber ? `
    ${properties.address.housenumber}` : '';
    fullAddress += (properties.address.postcode && properties.address.city) ?
    `, ${properties.address.postcode}-${properties.address.city}` : '';
    fullAddress += (!properties.address.postcode && properties.address.city
    && properties.address.city !== properties.address.name) ? `, ${properties.address.city}` : '';
    fullAddress += properties.address.state ? `, ${properties.address.state}` : '';
    fullAddress += (properties.address.country &&
     properties.address.country !== properties.address.name) ? `, ${properties.country}` : '';
   */
    return fullAddress;
  }

  public optionSelectionChange(option: PlaceSuggestion, event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      this.choosenOption = option;
      this.locationChange.emit(option);
    }
  }
}

export interface PlaceSuggestion {
  shortAddress: string;
  fullAddress: string;
  data: GeocodingFeatureProperties;
}

interface GeocodingFeatureProperties {
  name: string;
  country: string;
  state: string;
  postcode: string;
  city: string;
  street: string;
  housenumber: string;
}
