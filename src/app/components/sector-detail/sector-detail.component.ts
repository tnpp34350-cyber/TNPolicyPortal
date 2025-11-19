import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sector-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sector-detail.component.html',
  styleUrls: ['./sector-detail.component.scss']
})
export class SectorDetailComponent {
  slug: string | null = null;
  sector: { title: string; img: string; desc: string } | undefined;

  sectors = [
    { title: 'Agriculture', img: '/assets/img/agriculture.jpg', desc: 'Farming, crops and agri practices' },
    { title: 'Energy', img: '/assets/img/energy.jpg', desc: 'Solar, wind and power generation' },
    { title: 'Health', img: '/assets/img/health.jpg', desc: 'Health services and initiatives' },
    { title: 'Education', img: '/assets/img/education.jpg', desc: 'Schools, skilling and learning' },
    { title: 'Tourism', img: '/assets/img/tourism.jpg', desc: 'Travel, experiences and heritage' },
    { title: 'Manufacturing', img: '/assets/img/manufacturing.jpg', desc: 'Factories, supply chains and industry' },
    { title: 'MSME', img: '/assets/img/msme.jpg', desc: 'Small businesses and entrepreneurship' },
    { title: 'Water & WASH', img: '/assets/img/water-wash.jpg', desc: 'Water, sanitation and hygiene' },
    { title: 'Urbanization', img: '/assets/img/urbanization.jpg', desc: 'Cities, planning and infrastructure' },
    { title: 'Skilling & Livelihoods', img: '/assets/img/skilling.jpg', desc: 'Training, jobs and livelihood programs' }
  ];

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('sector');
      if (this.slug) {
        const key = this.slug;
        this.sector = this.sectors.find(s => this.slugify(s.title) === key);
      }
    });
  }

  private slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
}
