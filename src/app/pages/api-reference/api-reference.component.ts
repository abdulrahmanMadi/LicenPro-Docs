import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-api-reference',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './api-reference.component.html',
  styleUrls: ['../../styles/help-pages.scss']
})
export class ApiReferenceComponent {}
