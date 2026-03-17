import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-floating-license',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './floating-license.component.html',
  styleUrls: ['../../styles/help-pages.scss']
})
export class FloatingLicenseComponent {}
