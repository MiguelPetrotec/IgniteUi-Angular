import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-inputgroup',
  templateUrl: './inputgroup.component.html',
  styleUrls: ['./inputgroup.component.scss']
})

export class InputGroupComponent implements OnInit {
  
  public user = {
    dateTime: new Date(),
    email: '',
    fullName: '',
    genres: '',
    movie: '',
    phone: ''
  };

  // Forms
  contactForm: FormGroup;

  public genres = [
    { type: 'Action', movies: ['The Matrix', 'Kill Bill: Vol.1', 'The Dark Knight Rises'] },
    { type: 'Adventure', movies: ['Interstellar', 'Inglourious Basterds', 'Inception'] },
    // tslint:disable-next-line:object-literal-sort-keys
    {
      type: 'Comedy', movies: ['Wild Tales', 'In Bruges', 'Three Billboards Outside Ebbing, Missouri',
        'Untouchable', '3 idiots']
    },
    { type: 'Crime', movies: ['Training Day', 'Heat', 'American Gangster'] },
    { type: 'Drama', movies: ['Fight Club', 'A Beautiful Mind', 'Good Will Hunting', 'City of God'] },
    { type: 'Biography', movies: ['Amadeus', 'Bohemian Rhapsody'] },
    { type: 'Mystery', movies: ['The Prestige', 'Memento', 'Cloud Atlas'] },
    { type: 'Musical', movies: ['All That Jazz'] },
    { type: 'Romance', movies: ['Love Actually', 'In The Mood for Love'] },
    { type: 'Sci-Fi', movies: ['The Fifth Element'] },
    { type: 'Thriller', movies: ['The Usual Suspects'] },
    { type: 'Western', movies: ['Django Unchained'] }];


  ngOnInit() {
    this.contactForm = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, this.noWhitespaceValidator])),
      fullName: new FormControl('', Validators.compose([Validators.required, this.noWhitespaceValidator])),
      genres: new FormControl('', Validators.compose([Validators.required, this.noWhitespaceValidator])),
      movie: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([this.noWhitespaceValidator]))
    });

  }

  constructor(private fb: FormBuilder) {
  }


  streetNameValidator(addressList: any[]): ValidatorFn {

    return (control: FormControl): { [key: string]: boolean } | null => {

      let idx = -1;
      if (control.parent) {
        const code = control.parent.value.code;
        idx = control.value != null && control.value &&
          control.value.length > 0 ? addressList.findIndex(addr => addr.code !== code && addr.street === control.value) : -1;
        const isValid = idx < 0;
        return isValid ? null : { streetName: true };
      }

      return null;

    };
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = control.value ? control.value.length > 0 && (control.value || '').trim().length === 0 : false;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }


  public onDateSelection(value) {
    this.user.dateTime.setDate((value as Date).getDate());
  }

  public onTimeSelection(event) {
    this.user.dateTime.setTime((event.newValue as Date).getTime());
  }
}
