import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminService, BestPractice } from '../../services/admin.service';

@Component({
  selector: 'app-programmes',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, TabsModule, ButtonModule],
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.scss']
})
export class ProgrammesComponent implements OnInit {
  records: BestPractice[] = [];
  
  bestPractices: BestPractice[] = [];
  filteredPractices: BestPractice[] = [];
  policies: Array<{ policy: string; count: number }> = [];
  dataStats: any = {};
  activeTab: number = 0;
  sidebarCollapsed: boolean = false;
  searchQuery: string = '';

  // Filter state
  expandedFilters: { [key: string]: boolean } = {
    implementation: false,
    districts: false,
    sectors: false,
    themes: false,
    contentType: false,
    caseStudy: false
  };

  implementationOptions = [
    { label: 'Domestic', value: 'domestic', selected: false },
    { label: 'International', value: 'international', selected: false }
  ];

  districtOptions = [
    { label: 'Coimbatore', value: 'coimbatore', selected: false },
    { label: 'Tiruppur', value: 'tiruppur', selected: false },
    { label: 'Salem', value: 'salem', selected: false },
    { label: 'Chennai', value: 'chennai', selected: false },
    { label: 'Madurai', value: 'madurai', selected: false },
    { label: 'Thanjavur', value: 'thanjavur', selected: false }
  ];

  sectorOptions = [
    { label: 'Water & WASH', value: 'water', selected: false },
    { label: 'Energy', value: 'energy', selected: false },
    { label: 'Health', value: 'health', selected: false },
    { label: 'Skilling & Livelihoods', value: 'skilling', selected: false },
    { label: 'Agriculture', value: 'agriculture', selected: false },
    { label: 'Tourism', value: 'tourism', selected: false }
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    try {
      this.adminService.listRecords().subscribe({
        next: (rs: BestPractice[]) => this.processData(rs || []),
        error: () => this.processData([])
      });
    } catch (e) {
      this.processData([]);
    }
  }

  // Practice images mapping - Tamil Nadu focused
  practiceImages: { [key: string]: string } = {
    'Water Conservation Initiative': 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=350&fit=crop&q=80',
    'Renewable Energy Adoption': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=350&fit=crop&q=80',
    'Health Awareness Program': 'https://images.unsplash.com/photo-1631217314831-dc64e773ce08?w=500&h=350&fit=crop&q=80',
    'Skill Development Program': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop&q=80',
    'Organic Farming Promotion': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=350&fit=crop&q=80',
    'Heritage Tourism Development': 'https://images.unsplash.com/photo-1548013146-72f785f38dca?w=500&h=350&fit=crop&q=80',
    'Wastewater Treatment System': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=350&fit=crop&q=80',
    'Solar Power Integration': 'https://images.unsplash.com/photo-1509391366360-2e938d440dbb?w=500&h=350&fit=crop&q=80',
    'Community Health Center Excellence': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=350&fit=crop&q=80',
    'Women Entrepreneurship Training': 'https://images.unsplash.com/photo-1494888286746-fc937a76e518?w=500&h=350&fit=crop&q=80',
    'Sustainable Horticulture Models': 'https://images.unsplash.com/photo-1464208687429-7505649dae38?w=500&h=350&fit=crop&q=80',
    'Cultural Heritage Conservation': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=500&h=350&fit=crop&q=80',
    // Sector-based fallbacks - Tamil Nadu context
    'Water & WASH': 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=350&fit=crop&q=80',
    'Energy': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=350&fit=crop&q=80',
    'Health': 'https://images.unsplash.com/photo-1631217314831-dc64e773ce08?w=500&h=350&fit=crop&q=80',
    'Skilling & Livelihoods': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop&q=80',
    'Agriculture': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=350&fit=crop&q=80',
    'Tourism': 'https://images.unsplash.com/photo-1548013146-72f785f38dca?w=500&h=350&fit=crop&q=80'
  };

  getPracticeImage(practiceName: string): string {
    // Try to get image by practice name first
    if (this.practiceImages[practiceName]) {
      return this.practiceImages[practiceName];
    }
    
    // If not found, generate a placeholder with practice name
    return 'https://via.placeholder.com/500x350?text=' + encodeURIComponent(practiceName.substring(0, 20));
  }

  processData(rs: BestPractice[]) {
    this.records = rs;
    this.bestPractices = rs;
    this.filteredPractices = rs;

    // Process policies
    const policyMap = new Map<string, number>();
    rs.forEach((r: BestPractice) => {
      (r.policies || []).forEach((p: string) => {
        policyMap.set(p, (policyMap.get(p) || 0) + 1);
      });
    });
    this.policies = Array.from(policyMap.entries())
      .map(([policy, count]: [string, number]) => ({ policy, count }))
      .sort((a, b) => b.count - a.count);

    // Process data statistics
    const sectors = new Set(rs.map((r: BestPractice) => r.sector));
    const districts = new Set(rs.map((r: BestPractice) => r.district));
    let totalFiles = 0;
    rs.forEach((r: BestPractice) => {
      totalFiles += (r.files || []).length;
    });

    this.dataStats = {
      totalPractices: rs.length,
      totalSectors: sectors.size,
      totalDistricts: districts.size,
      totalPolicies: this.policies.length,
      totalFiles: totalFiles
    };
  }

  toggleFilter(filterKey: string) {
    this.expandedFilters[filterKey] = !this.expandedFilters[filterKey];
  }

  toggleOption(option: any) {
    option.selected = !option.selected;
  }

  clearAllFilters() {
    this.implementationOptions.forEach(opt => opt.selected = false);
    this.districtOptions.forEach(opt => opt.selected = false);
    this.sectorOptions.forEach(opt => opt.selected = false);
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  searchPractices(query: string) {
    this.searchQuery = query;
    if (!query.trim()) {
      this.filteredPractices = this.bestPractices;
    } else {
      const lowerQuery = query.toLowerCase();
      this.filteredPractices = this.bestPractices.filter(practice =>
        practice.bestpractice.toLowerCase().includes(lowerQuery) ||
        practice.sector.toLowerCase().includes(lowerQuery) ||
        practice.district.toLowerCase().includes(lowerQuery)
      );
    }
  }
}
