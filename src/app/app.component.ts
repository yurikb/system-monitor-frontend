import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MonitorComponent } from './component/monitor/monitor.component';

@Component({
    selector: 'app-root',
    standalone: true,
    template: '<app-monitor></app-monitor>',
    imports: [CommonModule, RouterOutlet, MonitorComponent]
})
export class AppComponent {
  title = 'system-monitor';
}
