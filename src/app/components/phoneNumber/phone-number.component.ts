import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { countries } from './countries';

@Component({
  selector: 'app-phone-number',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './phone-number.component.html',
  styleUrl: './phone-number.component.scss',
})
export class PhoneNumberComponent {
  @Input() phoneControl!: FormControl;
  countries = countries;
  selectedCountry = this.countries[0];
  phoneNumber = '';
  formattedPhoneNumber = '';
  dropdownOpen = false;
  searchText = '';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
    this.dropdownOpen = false;
    this.formatPhoneNumber();
  }

  onPhoneInput(event: any) {
    let rawInput = this.phoneControl.value.replace(/\D/g, ''); 
    let maxDigits = this.selectedCountry.mask.replace(/[^X]/g, '').length; 
  
    if (event.inputType === 'deleteContentBackward' && this.phoneNumber.length > 0) {
      rawInput = this.phoneNumber.slice(0, -1); 
    }
  
    this.phoneNumber = rawInput.substring(0, maxDigits);
    this.formatPhoneNumber();
  }
  
  formatPhoneNumber() {
    let mask = this.selectedCountry.mask;
    let digits = this.phoneNumber.split('');
    let formatted = '';
    let digitIndex = 0;
  
    for (let char of mask) {
      if (char === 'X') {
        if (digitIndex < digits.length) {
          formatted += digits[digitIndex++];
        } else {
          break;
        }
      } else {
        if (digitIndex < digits.length) {
          formatted += char;
        }
      }
    }
  
    this.formattedPhoneNumber = formatted;
    this.phoneControl.setValue(formatted, { emitEvent: false });
  }
  
  

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    let text = event.clipboardData?.getData('text') || '';
    this.phoneNumber = text.replace(/\D/g, '');
    this.formatPhoneNumber();
  }

  filteredCountries() {
    return this.countries.filter((c) =>
      c.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
