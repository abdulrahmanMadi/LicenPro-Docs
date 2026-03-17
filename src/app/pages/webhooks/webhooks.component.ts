import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-webhooks',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './webhooks.component.html',
  styleUrls: ['../../styles/help-pages.scss']
})
export class WebhooksComponent {}
