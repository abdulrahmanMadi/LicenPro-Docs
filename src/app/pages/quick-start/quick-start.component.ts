import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quick-start',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quick-start.component.html',
  styleUrls: ['../../styles/help-pages.scss']
})
export class QuickStartComponent {
  currentStep = 1;
  
  steps = [
    { number: 1, title: 'Create Account', completed: false },
    { number: 2, title: 'Create Product', completed: false },
    { number: 3, title: 'Configure RSA Keys', completed: false },
    { number: 4, title: 'Generate License', completed: false },
    { number: 5, title: 'Integrate SDK', completed: false }
  ];
}
