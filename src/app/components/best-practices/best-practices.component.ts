import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-best-practices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-practices.component.html',
  styleUrl: './best-practices.component.scss'
})
export class BestPracticesComponent {
  stats = [
    { value: '7,612', label: 'Best Practices' },
    { value: '1,191', label: 'Case Studies' },
    { value: '1,036', label: 'Videos' },
    { value: '10', label: 'Audio Bytes' },
    { value: '10', label: 'Sectors' }
  ];
}
