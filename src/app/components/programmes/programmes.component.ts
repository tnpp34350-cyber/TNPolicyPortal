import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AdminService, BestPractice } from '../../services/admin.service';
import { AdminAnalyticsComponent } from '../admin-analytics/admin-analytics.component';

@Component({
  selector: 'app-programmes',
  standalone: true,
  imports: [CommonModule, FormsModule, TabsModule, ButtonModule, CheckboxModule, AdminAnalyticsComponent],
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.scss']
})
export class ProgrammesComponent implements OnInit {
  records: BestPractice[] = [];
  
  bestPractices: BestPractice[] = [];
  filteredPractices: BestPractice[] = [];
  policies: Array<{ policy: string; count: number }> = [];
  dataStats: any = {};
  dataCatalog: Array<{ id: string; title: string; description: string; tags: string[]; owner: string; dataType: string; frequency: string; granularity: string; link: string }> = [];
  filteredDataCatalog: Array<any> = [];
  dataSearchQuery: string = '';
  activeTab: number = 0;
  sidebarCollapsed: boolean = false;
  searchQuery: string = '';
  selectedPractices: Set<string> = new Set();
  selectedPolicies: Set<string> = new Set();
  selectedData: Set<string> = new Set();

  // Analytics Sidebar
  adminAnalyticsSectors = [
    { name: 'Agriculture', icon: 'pi-leaf', color: '#2ecc71', count: 24 },
    { name: 'Healthcare', icon: 'pi-heart', color: '#e74c3c', count: 18 },
    { name: 'Education', icon: 'pi-book', color: '#3498db', count: 32 },
    { name: 'Infrastructure', icon: 'pi-building', color: '#f39c12', count: 15 },
    { name: 'Water Resources', icon: 'pi-droplet', color: '#1abc9c', count: 22 },
    { name: 'Energy', icon: 'pi-bolt', color: '#f1c40f', count: 19 },
    { name: 'Finance', icon: 'pi-dollar', color: '#9b59b6', count: 28 },
    { name: 'Transportation', icon: 'pi-car', color: '#34495e', count: 21 }
  ];
  selectedAnalyticsSector: string = '';

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

  // Policy images mapping
  policyImages: { [key: string]: string } = {
    'Scheme': 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=350&fit=crop&q=80',
    'Research Report': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=350&fit=crop&q=80',
    'Bill': 'https://images.unsplash.com/photo-1554080221-cbf9f696e8d5?w=500&h=350&fit=crop&q=80',
    'Policy': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop&q=80',
    'Programme': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop&q=80',
    'Act': 'https://images.unsplash.com/photo-1554080221-cbf9f696e8d5?w=500&h=350&fit=crop&q=80',
    'Agriculture': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=350&fit=crop&q=80',
    'Energy': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=350&fit=crop&q=80',
    'Health': 'https://images.unsplash.com/photo-1631217314831-dc64e773ce08?w=500&h=350&fit=crop&q=80',
    'Education': 'https://images.unsplash.com/photo-1427504494785-cddd56f45601?w=500&h=350&fit=crop&q=80',
    'Water': 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=350&fit=crop&q=80',
    'WASH': 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=350&fit=crop&q=80',
    'Tourism': 'https://images.unsplash.com/photo-1548013146-72f785f38dca?w=500&h=350&fit=crop&q=80',
    'Renewable': 'https://images.unsplash.com/photo-1509391366360-2e938d440dbb?w=500&h=350&fit=crop&q=80',
    'Solar': 'https://images.unsplash.com/photo-1509391366360-2e938d440dbb?w=500&h=350&fit=crop&q=80',
    'Manufacturing': 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=500&h=350&fit=crop&q=80',
    'MSME': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop&q=80',
    'Skill': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop&q=80',
    'Livelihood': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop&q=80',
    'Urban': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=350&fit=crop&q=80',
    'Infrastructure': 'https://images.unsplash.com/photo-1486399172035-001fdf4c9b5f?w=500&h=350&fit=crop&q=80',
    'Environment': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=350&fit=crop&q=80',
    'Farming': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=350&fit=crop&q=80',
    'Conservation': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=350&fit=crop&q=80'
  };

  getPolicyImage(policyName: string): string {
    // Try exact match first
    if (this.policyImages[policyName]) {
      return this.policyImages[policyName];
    }

    // Try partial matches for common keywords
    const lowerName = policyName.toLowerCase();
    for (const [key, url] of Object.entries(this.policyImages)) {
      if (lowerName.includes(key.toLowerCase())) {
        return url;
      }
    }
    
    // Default placeholder
    return 'https://via.placeholder.com/500x350?text=' + encodeURIComponent(policyName.substring(0, 20));
  }

  getPolicyType(policyName: string): string {
    const types = ['Scheme', 'Bill', 'Act', 'Policy', 'Programme', 'Research Report'];
    for (const type of types) {
      if (policyName.toLowerCase().includes(type.toLowerCase())) {
        return type;
      }
    }
    return 'Policy';
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

    // Initialize data catalog with sample data
    this.dataCatalog = [
      {
        id: '1',
        title: 'India Population Census Data',
        description: 'Provides population statistics, demographics, social and economic characteristics, housing and household details.',
        tags: ['Health & Nutrition', 'Disease Programme', 'Macro Indicators', 'Gender'],
        owner: 'Office of Registrar General of India (ORGI), Ministry of Home Affairs',
        dataType: 'Data set (Downloadable in excel format)',
        frequency: 'Decennial',
        granularity: 'National',
        link: '#'
      },
      {
        id: '2',
        title: 'Civil Registration System (CRVS)',
        description: 'Registration of births, deaths, and still births and publication of annual statistics. Information of Sex Ratio and medical',
        tags: ['Health & Nutrition', 'Health & Family', 'Macro Indicators'],
        owner: 'Ministry of Home Affairs',
        dataType: 'Data set (Downloadable in excel format)',
        frequency: 'Annual',
        granularity: 'State',
        link: '#'
      },
      {
        id: '3',
        title: 'National Sample Survey Office (NSSO) Data',
        description: 'Large scale national survey providing data on employment, unemployment, consumer spending, agriculture and other sectors.',
        tags: ['Employment', 'Agriculture', 'Consumer Data', 'Macro Indicators'],
        owner: 'Ministry of Statistics and Programme Implementation',
        dataType: 'Data set (Downloadable in multiple formats)',
        frequency: 'Periodic',
        granularity: 'National & State',
        link: '#'
      },
      {
        id: '4',
        title: 'District Health Survey Data',
        description: 'Comprehensive health data including disease prevalence, health infrastructure, and population health metrics by district.',
        tags: ['Health & Nutrition', 'Disease Programme', 'District Level'],
        owner: 'Ministry of Health and Family Welfare',
        dataType: 'Data set (Downloadable in excel format)',
        frequency: 'Annual',
        granularity: 'District',
        link: '#'
      },
      {
        id: '5',
        title: 'Agricultural Statistics',
        description: 'Data on crop production, agricultural land use, farm size, and agricultural income across states and districts.',
        tags: ['Agriculture', 'Land Use', 'Production Data', 'Economic'],
        owner: 'Ministry of Agriculture & Farmers Welfare',
        dataType: 'Data set (Downloadable in multiple formats)',
        frequency: 'Annual',
        granularity: 'State & District',
        link: '#'
      },
      {
        id: '6',
        title: 'Skill Development Programme Data',
        description: 'Training participation, certification rates, employment outcomes of skill development initiatives.',
        tags: ['Skills', 'Employment', 'Training', 'Youth'],
        owner: 'Ministry of Skill Development and Entrepreneurship',
        dataType: 'Data set (Downloadable in excel format)',
        frequency: 'Quarterly',
        granularity: 'National & State',
        link: '#'
      },
      {
        id: '7',
        title: 'Environmental Data Portal',
        description: 'Data on air quality, water quality, forest coverage, biodiversity and environmental indicators.',
        tags: ['Environment', 'Sustainability', 'Climate', 'Natural Resources'],
        owner: 'Ministry of Environment, Forest and Climate Change',
        dataType: 'Data set (Real-time and downloadable)',
        frequency: 'Real-time/Daily',
        granularity: 'National',
        link: '#'
      },
      {
        id: '8',
        title: 'Urban Development Indicators',
        description: 'Data on urban infrastructure, housing, sanitation, water supply and urban poverty metrics.',
        tags: ['Urban Development', 'Infrastructure', 'Housing', 'WASH'],
        owner: 'Ministry of Housing and Urban Affairs',
        dataType: 'Data set (Downloadable in multiple formats)',
        frequency: 'Annual',
        granularity: 'City & State',
        link: '#'
      }
    ];

    this.filteredDataCatalog = this.dataCatalog;
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

  togglePracticeSelection(practice: BestPractice, event: Event) {
    event.stopPropagation();
    const practiceId = practice.bestpractice;
    if (this.selectedPractices.has(practiceId)) {
      this.selectedPractices.delete(practiceId);
    } else {
      this.selectedPractices.add(practiceId);
    }
  }

  isPracticeSelected(practice: BestPractice): boolean {
    return this.selectedPractices.has(practice.bestpractice);
  }

  getSelectedCount(): number {
    return this.selectedPractices.size;
  }

  isEditEnabled(): boolean {
    return this.selectedPractices.size === 1;
  }

  isDeleteEnabled(): boolean {
    return this.selectedPractices.size > 0;
  }

  togglePolicySelection(policy: string, event: Event) {
    event.stopPropagation();
    if (this.selectedPolicies.has(policy)) {
      this.selectedPolicies.delete(policy);
    } else {
      this.selectedPolicies.add(policy);
    }
  }

  isPolicySelected(policy: string): boolean {
    return this.selectedPolicies.has(policy);
  }

  getSelectedPoliciesCount(): number {
    return this.selectedPolicies.size;
  }

  isEditEnabledPolicies(): boolean {
    return this.selectedPolicies.size === 1;
  }

  isDeleteEnabledPolicies(): boolean {
    return this.selectedPolicies.size > 0;
  }

  searchDataCatalog(query: string) {
    this.dataSearchQuery = query;
    if (!query.trim()) {
      this.filteredDataCatalog = this.dataCatalog;
    } else {
      const lowerQuery = query.toLowerCase();
      this.filteredDataCatalog = this.dataCatalog.filter(data =>
        data.title.toLowerCase().includes(lowerQuery) ||
        data.description.toLowerCase().includes(lowerQuery) ||
        data.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        data.owner.toLowerCase().includes(lowerQuery)
      );
    }
  }

  toggleDataSelection(dataId: string, event: Event) {
    event.stopPropagation();
    if (this.selectedData.has(dataId)) {
      this.selectedData.delete(dataId);
    } else {
      this.selectedData.add(dataId);
    }
  }

  isDataSelected(dataId: string): boolean {
    return this.selectedData.has(dataId);
  }

  getSelectedDataCount(): number {
    return this.selectedData.size;
  }

  isEditEnabledData(): boolean {
    return this.selectedData.size === 1;
  }

  isDeleteEnabledData(): boolean {
    return this.selectedData.size > 0;
  }

  onAnalyticsSectorSelect(sector: string) {
    this.selectedAnalyticsSector = sector;
  }
}
