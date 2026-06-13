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
