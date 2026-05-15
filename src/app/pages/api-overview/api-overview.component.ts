import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MermaidChartComponent } from '../../components/mermaid-chart/mermaid-chart.component';
import { OpenapiEmbedComponent } from '../../components/openapi-embed/openapi-embed.component';

@Component({
  selector: 'app-api-overview',
  standalone: true,
  imports: [MermaidChartComponent, OpenapiEmbedComponent, RouterLink],
  templateUrl: './api-overview.component.html',
  styleUrls: ['../../styles/help-pages.scss'],
})
export class ApiOverviewComponent {
  readonly systemContextDef = `flowchart LR
    subgraph vendor [Vendor]
      Dash[LicenPro_Dashboard]
    end
    subgraph host [Hosted_API]
      API[LicenPro_API]
    end
    subgraph customer [Customer_app]
      SDK[DotNet_SDK]
    end
    Dash -->|Bearer_JWT| API
    SDK -->|X_API_KEY_or_JWT| API
    API -->|signed_artifacts| SDK`;

  readonly licenseLifecycleDef = `flowchart LR
    A[Create_license] --> B[Sign_license_bin]
    B --> C[Distribute_to_customer]
    C --> D[SDK_validate_online_or_offline]
    D --> E{Revoked_or_refreshed?}
    E -->|refresh| B
    E -->|revoke| F[Block_validation]`;
}
