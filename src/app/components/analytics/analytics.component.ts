import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
  constructor(private router: Router) {}

  selectedSlug: string | null = null;
  selectedSector: { title: string; img: string; desc: string } | null = null;

  sectors = [
    { title: 'Agriculture', slug: 'agriculture', img: '/assets/img/agriculture.jpg', desc: 'Farming, crops and agri practices' },
    { title: 'Energy', slug: 'energy', img: '/assets/img/energy.jpg', desc: 'Solar, wind and power generation' },
    { title: 'Health', slug: 'health', img: '/assets/img/health.jpg', desc: 'Health services and initiatives' },
    { title: 'Education', slug: 'education', img: '/assets/img/education.jpg', desc: 'Schools, skilling and learning' },
    { title: 'Tourism', slug: 'tourism', img: '/assets/img/tourism.jpg', desc: 'Travel, experiences and heritage' },
    { title: 'Manufacturing', slug: 'manufacturing', img: '/assets/img/manufacturing.jpg', desc: 'Factories, supply chains and industry' },
    { title: 'MSME', slug: 'msme', img: '/assets/img/msme.jpg', desc: 'Small businesses and entrepreneurship' },
    { title: 'Water & WASH', slug: 'water-wash', img: '/assets/img/water-wash.jpg', desc: 'Water, sanitation and hygiene' },
    { title: 'Urbanization', slug: 'urbanization', img: '/assets/img/urbanization.jpg', desc: 'Cities, planning and infrastructure' },
    { title: 'Skilling & Livelihoods', slug: 'skilling-livelihoods', img: '/assets/img/skilling.jpg', desc: 'Training, jobs and livelihood programs' }
  ];

  selectSector(sector: { title: string; slug: string; img: string; desc: string }) {
    this.selectedSlug = sector.slug;
    this.selectedSector = sector;
    // Optionally update other dashboard widgets here, e.g., reload charts.
  }

  viewSector(title: string) {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    this.router.navigateByUrl(`/dashboard/${slug}`);
  }
}
