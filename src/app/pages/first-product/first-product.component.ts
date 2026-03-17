import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-first-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './first-product.component.html',
  styleUrls: ['../../styles/help-pages.scss']
})
export class FirstProductComponent {}
