import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../../service/monitor.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss'
})
export class MonitorComponent implements OnInit {
  cpuUsage: number = 0;
  memoryUsage: number = 0;
  diskUsage: number = 0;
  private pollSubscriptions: Subscription = new Subscription;
  private isOverloadedDisplayed: boolean = false;

  constructor(private monitorService: MonitorService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.pollSubscriptions = this.monitorService.pollData().subscribe(
      (data: any) => {
        this.cpuUsage = data.cpuUsage;
        this.memoryUsage = data.memoryUsage;
        this.diskUsage = data.diskUsage;

        if (!this.isOverloadedDisplayed) {
          if (this.cpuUsage > 80 || this.memoryUsage > 80 || this.diskUsage > 80) {
            this.snackBar.open('System is overloaded!', 'Close', { duration: 3000 });
            this.isOverloadedDisplayed = true;
            setTimeout(() => {
              this.isOverloadedDisplayed = false;
            }, 5 * 60 * 1000);
          }
        }
      },
      error => {
        console.error('Error polling data: ', error);
      }
    )
  }

  ngOnDestroy(): void {
    if (this.pollSubscriptions) {
      this.pollSubscriptions.unsubscribe();
    }
  }

  formatNumber(num: number): string {
    return num.toFixed(2);
  }
}
