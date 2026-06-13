import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MermaidChartComponent } from '../../components/mermaid-chart/mermaid-chart.component';

@Component({
  selector: 'app-quick-start',
  standalone: true,
  imports: [RouterLink, MermaidChartComponent],
  templateUrl: './quick-start.component.html',
})
export class QuickStartComponent {
  readonly vendorWorkflowDef = `flowchart LR
    subgraph dash [Dashboard]
      O[Organization]
      P[Product_and_release]
      K[RSA_keys]
      L[License_and_license_bin]
    end
    subgraph runtime [Customer_app]
      S[SDK_bootstrap]
      V[Validate_offline_or_online]
    end
    API[REST_API]
    O --> P --> K --> L
    L --> S --> V
    V --> API`;

  readonly activationSessionDef = `flowchart TB
    subgraph online [Online_validation]
      V[POST_Licenses_validate]
    end
    subgraph offline [Offline_validation]
      O[RSA_verify_license_bin]
    end
    subgraph seats [Seat_models]
      A[Activations_table]
      S[Sessions_heartbeat]
    end
    V --> A
    V --> S`;
}
