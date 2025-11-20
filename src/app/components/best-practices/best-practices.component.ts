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
  showAllCases = false;
  totalBestPractices = 7612;
  selectedSector = '';
  filteredResults: any[] = [];

  stats = [
    { value: '7,612', label: 'Best Practices' },
    { value: '1,191', label: 'Case Studies' },
    { value: '1,036', label: 'Videos' },
    { value: '10', label: 'Audio Bytes' },
    { value: '10', label: 'Sectors' }
  ];

  sectors = [
    {
      name: 'Agriculture & Allied Services',
      count: 945,
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Education',
      count: 862,
      image: 'https://images.unsplash.com/photo-1427504494785-cdcd02f53c0d?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Energy',
      count: 524,
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Health & Nutrition',
      count: 1365,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Urbanization',
      count: 720,
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Water & WASH',
      count: 941,
      image: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'MSME',
      count: 303,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Manufacturing',
      count: 166,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Skilling Livelihoods & Labour Welfare',
      count: 776,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Tourism',
      count: 659,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80'
    }
  ];

  featuredCases = [
    {
      image: 'https://images.unsplash.com/photo-1664207687959-138bc20d9a96?auto=format&fit=crop&w=400&q=80',
      title: 'Infrastructure Development'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Business Growth'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Community Services'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Innovation Hub'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Digital Transformation'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Sustainable Development'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Social Impact'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Healthcare Initiative'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Education Program'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Water Conservation'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Agricultural Innovation'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Energy Solutions'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Urban Planning'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Tourism Development'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      title: 'Manufacturing Excellence'
    }
  ];

  states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  districts: string[] = [];
  sectorFilters = [
    'Agriculture', 'Education', 'Energy', 'Health', 'Urbanization',
    'Water', 'MSME', 'Manufacturing', 'Skilling', 'Tourism'
  ];

  allResults = [
    {
      title: 'Global Best Practices on Protecting and Leveraging...',
      location: 'China, Asia',
      sector: 'Skilling Livelihoods...'
    },
    {
      title: 'Case Study: Global Best Practices on Protecting...',
      location: 'Multiple, Pan-India',
      sector: 'Skilling Livelihoods...'
    },
    {
      title: 'Best Practice Implementation in Rural Areas',
      location: 'Tamil Nadu',
      sector: 'Agriculture'
    },
    {
      title: 'Urban Development Initiative',
      location: 'Karnataka',
      sector: 'Urbanization'
    },
    {
      title: 'Healthcare System Reform',
      location: 'Kerala',
      sector: 'Health & Nutrition'
    }
  ];

  stateData = [
    { name: 'Andhra Pradesh', abbreviation: 'AP', count: 245 },
    { name: 'Arunachal Pradesh', abbreviation: 'AR', count: 45 },
    { name: 'Assam', abbreviation: 'AS', count: 156 },
    { name: 'Bihar', abbreviation: 'BR', count: 234 },
    { name: 'Chhattisgarh', abbreviation: 'CT', count: 189 },
    { name: 'Goa', abbreviation: 'GA', count: 78 },
    { name: 'Gujarat', abbreviation: 'GJ', count: 456 },
    { name: 'Haryana', abbreviation: 'HR', count: 198 },
    { name: 'Himachal Pradesh', abbreviation: 'HP', count: 123 },
    { name: 'Jharkhand', abbreviation: 'JH', count: 167 },
    { name: 'Karnataka', abbreviation: 'KA', count: 512 },
    { name: 'Kerala', abbreviation: 'KL', count: 289 },
    { name: 'Madhya Pradesh', abbreviation: 'MP', count: 378 },
    { name: 'Maharashtra', abbreviation: 'MH', count: 678 },
    { name: 'Manipur', abbreviation: 'MN', count: 34 },
    { name: 'Meghalaya', abbreviation: 'ML', count: 56 },
    { name: 'Mizoram', abbreviation: 'MZ', count: 28 },
    { name: 'Nagaland', abbreviation: 'NL', count: 42 },
    { name: 'Odisha', abbreviation: 'OD', count: 234 },
    { name: 'Punjab', abbreviation: 'PB', count: 201 },
    { name: 'Rajasthan', abbreviation: 'RJ', count: 345 },
    { name: 'Sikkim', abbreviation: 'SK', count: 31 },
    { name: 'Tamil Nadu', abbreviation: 'TN', count: 623 },
    { name: 'Telangana', abbreviation: 'TS', count: 298 },
    { name: 'Tripura', abbreviation: 'TR', count: 67 },
    { name: 'Uttar Pradesh', abbreviation: 'UP', count: 892 },
    { name: 'Uttarakhand', abbreviation: 'UK', count: 145 },
    { name: 'West Bengal', abbreviation: 'WB', count: 334 }
  ];

  constructor() {
    this.filteredResults = this.allResults;
    this.loadDistricts('Tamil Nadu');
  }

  toggleViewMore() {
    this.showAllCases = !this.showAllCases;
  }

  onStateChange(event: any) {
    const state = event.target.value;
    this.loadDistricts(state);
    this.filterResults();
  }

  onDistrictChange(event: any) {
    this.filterResults();
  }

  onSectorFilterChange(event: any) {
    this.selectedSector = event.target.value;
    this.filterResults();
  }

  loadDistricts(state: string) {
    const stateDistricts: { [key: string]: string[] } = {
      'Tamil Nadu': ['All', 'Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy'],
      'Karnataka': ['All', 'Bangalore', 'Mysore', 'Mangalore', 'Hubli'],
      'Kerala': ['All', 'Kochi', 'Thiruvananthapuram', 'Kozhikode'],
      'Andhra Pradesh': ['All', 'Hyderabad', 'Vijayawada', 'Visakhapatnam']
    };
    this.districts = stateDistricts[state] || [];
  }

  filterResults() {
    this.filteredResults = this.allResults;
  }

  getStateColor(count: number): string {
    if (count >= 500) {
      return '#1c5aa0'; // Dark blue - High
    } else if (count >= 250) {
      return '#3498db'; // Medium blue - Medium
    } else {
      return '#e8f4f8'; // Light blue - Low
    }
  }
}
