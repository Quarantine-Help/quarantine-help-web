import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
})
export class AutoCompleteComponent implements OnDestroy {
  @Output()
  locationChange: EventEmitter<PlaceSuggestion> = new EventEmitter<PlaceSuggestion>();

  searchOptions: Subject<PlaceSuggestion[]> = new Subject<PlaceSuggestion[]>();
  addressSuggestionInput: FormControl = new FormControl('', [addressWithoutHoseNumberNotAllowed()]);

  private valueChangesSub: Subscription;
  private choosenOption: PlaceSuggestion;

  private userInputTimeout: number;
  private requestSub: Subscription;
  protected longitudeFromClient = 59.334591;
  protected latitudeFromClient = 18.06324;
  matcher = new MyErrorStateMatcher();

  constructor(public translate: TranslateService, private http: HttpClient) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitudeFromClient = position.coords.longitude;
        this.latitudeFromClient = position.coords.latitude;
      });
    } else {
      console.log('No support for geolocation');
    }
    this.valueChangesSub = this.addressSuggestionInput.valueChanges.subscribe((value) => {
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
    // @FIXME Move me to env later
    const HERE_MAPS_KEY = 'INxGhspY9TqShx3heSZSBmobOsutPeE9eJaTxfHiiQQ';
    if (text.includes(', ')) {
      // Can happen as auto complete goes up and you want to edit.
      text = text.split(',')[0];
    }
    const queryParams = new URLSearchParams({
      apiKey: HERE_MAPS_KEY,
      q: text,
      resultTypes: 'houseNumber,street',
      at: `${this.latitudeFromClient},${this.longitudeFromClient}`,
      limit: `${5}`,
    });
    const suggestionsHEREAPI = `https://autosuggest.search.hereapi.com/v1/autosuggest?${queryParams.toString()}`;
    if (this.requestSub) {
      this.requestSub.unsubscribe();
    }
    this.http.get(suggestionsHEREAPI).subscribe(
      (data: any) => {
        const placeSuggestions = data.items.map((feature) => {
          const addressInformation = this.extractAddressFromResult(feature);
          return {
            shortAddress: this.generateShortAddress(feature),
            fullAddress: this.generateFullAddress(feature),
            addressInformation,
          };
        });

        this.searchOptions.next(placeSuggestions.length ? placeSuggestions : null);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private generateShortAddress(properties: any): string {
    return properties.title;
  }

  private generateFullAddress(properties: any): string {
    return properties.title;
  }

  public optionSelectionChange(option: PlaceSuggestion, event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      if (option.addressInformation.resultType !== 'houseNumber') {
        this.addressSuggestionInput.setErrors({
          notHouseAddress: true,
        });
        return;
      }
      this.addressSuggestionInput.setErrors(null);
      this.choosenOption = option;
      this.locationChange.emit(option);
    }
  }

  private extractAddressFromResult(feature: any) {
    // The post code specially needs to be unwrapped.
    const addressExtracted = feature.address;
    let postCode = addressExtracted.postalCode;
    let firstLineOfAddress = addressExtracted.street;
    let houseNumber = null;

    if (postCode) {
      if (postCode.includes('-')) {
        postCode = postCode.split('-')[1];
        if (postCode.includes(' ')) {
          postCode = postCode.replace(/\s/g, '');
        }
        if (/^\d+$/.test(postCode)) {
          postCode = parseInt(postCode, 10);
        }
      }
    }
    if (feature.resultType === 'houseNumber') {
      houseNumber = addressExtracted.houseNumber;
      firstLineOfAddress = `${firstLineOfAddress} ${houseNumber}`;
    }
    const resultType = feature.resultType;
    return {
      resultType,
      postCode,
      position: {
        latitude: feature.position.lat,
        longitude: feature.position.lng,
      },
      placeId: addressExtracted.id,
      countryCode: addressExtracted.countryCode,
      countryName: addressExtracted.countryName,
      city: addressExtracted.city,
      housenumber: houseNumber,
      secondLineOfAddress: addressExtracted.district,
      firstLineOfAddress,
    };
  }
}

export interface PlaceSuggestion {
  shortAddress: string;
  fullAddress: string;
  addressInformation: AddressInformation;
}

export function addressWithoutHoseNumberNotAllowed(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.errors) {
      return null;
    }
    if (control.errors.notHouseAddress) {
      return { notHouseAddress: true };
    }
  };
}

interface AddressInformation {
  name: string;
  country: string;
  state: string;
  placeId: string;
  position: {
    latitude: number;
    longitude: number;
  };
  secondLineOfAddress: string;
  postCode: string;
  city: string;
  housenumber: string;
  latitude: string;
  longitude: string;
  countryCode: string;
  countryName: string;
  locationId: string;
  resultType: string;
}
