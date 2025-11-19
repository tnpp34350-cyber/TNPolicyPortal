import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
  sectors = [
    'Agriculture',
    'Energy',
    'Health',
    'Education',
    'Tourism',
    'Manufacturing',
    'MSME',
    'Water & WASH',
    'Urbanization',
    'Skilling & Livelihoods'
  ];
}
