import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.scss']
})
export class AdminAnalyticsComponent implements OnInit, OnChanges {
  @Input() selectedSectorFromParent: string = '';

  sectors = [
    { name: 'Agriculture', icon: 'pi-leaf', color: '#2ecc71', count: 24 },
    { name: 'Healthcare', icon: 'pi-heart', color: '#e74c3c', count: 18 },
    { name: 'Education', icon: 'pi-book', color: '#3498db', count: 32 },
    { name: 'Infrastructure', icon: 'pi-building', color: '#f39c12', count: 15 },
    { name: 'Water Resources', icon: 'pi-droplet', color: '#1abc9c', count: 22 },
    { name: 'Energy', icon: 'pi-bolt', color: '#f1c40f', count: 19 },
    { name: 'Finance', icon: 'pi-dollar', color: '#9b59b6', count: 28 },
    { name: 'Transportation', icon: 'pi-car', color: '#34495e', count: 21 }
  ];

  infographics: any[] = [];

  // Chart data
  visitorsChart: any;
  deviceCategoryChart: any;
  mobileDevicesChart: any;
  popularPagesData: any;
  userRetentionData: any;
  chartOptions: any = {};

  selectedSector: string = '';

  // Sector-specific data
  sectorData: { [key: string]: any } = {
    'Agriculture': {
      infographics: [
        { title: 'Total Practices', value: '24', change: '+18%', icon: 'pi-star-fill', color: '#2ecc71' },
        { title: 'Implementations', value: '22', change: '+15%', icon: 'pi-check-circle', color: '#2ecc71' },
        { title: 'Active Users', value: '456', change: '+32%', icon: 'pi-users', color: '#e74c3c' },
        { title: 'Data Resources', value: '34', change: '+8%', icon: 'pi-database', color: '#f39c12' },
        { title: 'Productivity Index', value: '87.5%', change: '+12%', icon: 'pi-chart-line', color: '#3498db' },
        { title: 'Success Rate', value: '92%', change: '+5%', icon: 'pi-trophy', color: '#f1c40f' },
        { title: 'Avg Growth Rate', value: '6.8%', change: '+2.3%', icon: 'pi-trending-up', color: '#1abc9c' },
        { title: 'ROI', value: '145%', change: '+28%', icon: 'pi-dollar', color: '#9b59b6' }
      ],
      xAxisLabel: 'Crop Types',
      xAxisLabels: ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Corn', 'Soybean', 'Barley', 'Oats', 'Millet', 'Pulses', 'Groundnut', 'Sunflower'],
      yAxisLabel: 'Yield (Tons/Hectare)',
      chartTitle: 'Agricultural Yield Trends',
      visitors2023: [42, 56, 48, 72, 81, 68, 75, 82, 69, 78, 65, 75],
      visitors2024: [52, 66, 58, 82, 91, 78, 85, 92, 79, 88, 75, 85],
      deviceData: [52, 32, 12, 4],
      mobileData: [48, 38, 14],
      topPages: [
        { page: '/agriculture/practices', visitors: 523, percent: '22.45%' },
        { page: '/agriculture/policies', visitors: 412, percent: '17.68%' },
        { page: '/crops', visitors: 356, percent: '15.29%' },
        { page: '/resources', visitors: 289, percent: '12.41%' },
        { page: '/analytics', visitors: 223, percent: '9.58%' }
      ]
    },
    'Healthcare': {
      infographics: [
        { title: 'Total Practices', value: '18', change: '+22%', icon: 'pi-star-fill', color: '#e74c3c' },
        { title: 'Implementations', value: '16', change: '+19%', icon: 'pi-check-circle', color: '#2ecc71' },
        { title: 'Active Users', value: '892', change: '+28%', icon: 'pi-users', color: '#e74c3c' },
        { title: 'Data Resources', value: '56', change: '+12%', icon: 'pi-database', color: '#f39c12' },
        { title: 'Patient Satisfaction', value: '94.2%', change: '+8%', icon: 'pi-heart', color: '#e74c3c' },
        { title: 'Treatment Success', value: '88%', change: '+6%', icon: 'pi-check', color: '#2ecc71' },
        { title: 'Avg Recovery Days', value: '14.3', change: '-2.1', icon: 'pi-calendar', color: '#3498db' },
        { title: 'Bed Occupancy', value: '78%', change: '+5%', icon: 'pi-home', color: '#f39c12' }
      ],
      xAxisLabel: 'Medical Specialties',
      xAxisLabels: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Psychiatry', 'Surgery', 'Dermatology', 'Radiology', 'Pathology', 'Urology', 'ENT'],
      yAxisLabel: 'Patient Recovery Rate (%)',
      chartTitle: 'Healthcare Performance Metrics',
      visitors2023: [72, 85, 68, 95, 88, 92, 78, 85, 91, 82, 79, 86],
      visitors2024: [82, 95, 78, 105, 98, 102, 88, 95, 101, 92, 89, 96],
      deviceData: [48, 38, 10, 4],
      mobileData: [52, 35, 13],
      topPages: [
        { page: '/healthcare/practices', visitors: 612, percent: '24.12%' },
        { page: '/healthcare/policies', visitors: 498, percent: '19.65%' },
        { page: '/treatments', visitors: 423, percent: '16.68%' },
        { page: '/resources', visitors: 342, percent: '13.48%' },
        { page: '/data', visitors: 251, percent: '9.89%' }
      ]
    },
    'Education': {
      infographics: [
        { title: 'Total Practices', value: '32', change: '+25%', icon: 'pi-star-fill', color: '#3498db' },
        { title: 'Implementations', value: '28', change: '+21%', icon: 'pi-check-circle', color: '#2ecc71' },
        { title: 'Active Users', value: '1,523', change: '+35%', icon: 'pi-users', color: '#e74c3c' },
        { title: 'Data Resources', value: '78', change: '+14%', icon: 'pi-database', color: '#f39c12' },
        { title: 'Graduation Rate', value: '89.5%', change: '+7%', icon: 'pi-book', color: '#3498db' },
        { title: 'Pass Rate', value: '91%', change: '+4%', icon: 'pi-check-circle', color: '#2ecc71' },
        { title: 'Avg Score', value: '78/100', change: '+2.5', icon: 'pi-chart-bar', color: '#f39c12' },
        { title: 'Attendance', value: '86%', change: '+3%', icon: 'pi-calendar-check', color: '#1abc9c' }
      ],
      xAxisLabel: 'Education Levels',
      xAxisLabels: ['Primary', 'Secondary', 'Higher Sec', 'Diploma', 'Graduation', 'Post-grad', 'Vocational', 'Technical', 'Online', 'Distance', 'Skill Dev', 'Certification'],
      yAxisLabel: 'Enrollment Rate (%)',
      chartTitle: 'Education Enrollment Trends',
      visitors2023: [89, 98, 85, 105, 112, 95, 108, 115, 102, 118, 95, 108],
      visitors2024: [99, 108, 95, 115, 122, 105, 118, 125, 112, 128, 105, 118],
      deviceData: [45, 40, 12, 3],
      mobileData: [42, 45, 13],
      topPages: [
        { page: '/education/practices', visitors: 756, percent: '26.34%' },
        { page: '/education/policies', visitors: 634, percent: '22.08%' },
        { page: '/courses', visitors: 512, percent: '17.82%' },
        { page: '/resources', visitors: 398, percent: '13.86%' },
        { page: '/analytics', visitors: 272, percent: '9.47%' }
      ]
    },
    'Infrastructure': {
      infographics: [
        { title: 'Total Practices', value: '15', change: '+16%', icon: 'pi-star-fill', color: '#f39c12' },
        { title: 'Implementations', value: '13', change: '+12%', icon: 'pi-check-circle', color: '#2ecc71' },
        { title: 'Active Users', value: '678', change: '+22%', icon: 'pi-users', color: '#e74c3c' },
        { title: 'Data Resources', value: '42', change: '+9%', icon: 'pi-database', color: '#f39c12' },
        { title: 'Completion %', value: '72.5%', change: '+6%', icon: 'pi-check', color: '#2ecc71' },
        { title: 'Budget Utilization', value: '85%', change: '+8%', icon: 'pi-dollar', color: '#9b59b6' },
        { title: 'Project Status', value: '24/28', change: '+2', icon: 'pi-list-check', color: '#3498db' },
        { title: 'Quality Score', value: '8.7/10', change: '+0.3', icon: 'pi-star', color: '#f1c40f' }
      ],
      xAxisLabel: 'Infrastructure Types',
      xAxisLabels: ['Roads', 'Railways', 'Airports', 'Ports', 'Power', 'Water', 'Telecom', 'Urban Dev', 'Transportation', 'Storage', 'Utilities', 'Industrial'],
      yAxisLabel: 'Development Progress (%)',
      chartTitle: 'Infrastructure Development Index',
      visitors2023: [58, 68, 55, 78, 85, 72, 80, 88, 76, 84, 70, 79],
      visitors2024: [68, 78, 65, 88, 95, 82, 90, 98, 86, 94, 80, 89],
      deviceData: [50, 35, 12, 3],
      mobileData: [46, 41, 13],
      topPages: [
        { page: '/infrastructure/practices', visitors: 445, percent: '20.54%' },
        { page: '/infrastructure/policies', visitors: 389, percent: '17.92%' },
        { page: '/projects', visitors: 334, percent: '15.39%' },
        { page: '/resources', visitors: 278, percent: '12.81%' },
        { page: '/data', visitors: 221, percent: '10.18%' }
      ]
    },
    'Water Resources': {
      infographics: [
        { title: 'Total Practices', value: '22', change: '+20%', icon: 'pi-star-fill', color: '#1abc9c' },
        { title: 'Implementations', value: '20', change: '+17%', icon: 'pi-check-circle', color: '#2ecc71' },
        { title: 'Active Users', value: '845', change: '+26%', icon: 'pi-users', color: '#e74c3c' },
        { title: 'Data Resources', value: '58', change: '+11%', icon: 'pi-database', color: '#f39c12' },
        { title: 'Water Quality', value: '86.5%', change: '+4%', icon: 'pi-droplet', color: '#1abc9c' },
        { title: 'Distribution Efficiency', value: '91%', change: '+5%', icon: 'pi-share-alt', color: '#3498db' },
        { title: 'Water Loss', value: '8.5%', change: '-1.2%', icon: 'pi-minus-circle', color: '#e74c3c' },
        { title: 'Reservoir Level', value: '76%', change: '+3%', icon: 'pi-volume', color: '#f39c12' }
      ],
      xAxisLabel: 'Water Sources',
      xAxisLabels: ['Rivers', 'Lakes', 'Groundwater', 'Dams', 'Canals', 'Wells', 'Springs', 'Reservoirs', 'Aquifers', 'Ponds', 'Treatment', 'Distribution'],
      yAxisLabel: 'Water Quality Index',
      chartTitle: 'Water Resources Management',
      visitors2023: [64, 74, 62, 85, 92, 79, 86, 93, 81, 89, 76, 85],
      visitors2024: [74, 84, 72, 95, 102, 89, 96, 103, 91, 99, 86, 95],
      deviceData: [48, 36, 13, 3],
      mobileData: [45, 42, 13],
      topPages: [
        { page: '/water/practices', visitors: 534, percent: '21.68%' },
        { page: '/water/policies', visitors: 456, percent: '18.52%' },
        { page: '/resources', visitors: 378, percent: '15.37%' },
        { page: '/conservation', visitors: 312, percent: '12.69%' },
        { page: '/data', visitors: 245, percent: '9.96%' }
      ]
    },
    'Energy': {
      infographics: [
        { title: 'Total Practices', value: '19', change: '+18%', icon: 'pi-star-fill', color: '#f1c40f' },
        { title: 'Implementations', value: '17', change: '+14%', icon: 'pi-check-circle', color: '#2ecc71' },
        { title: 'Active Users', value: '734', change: '+24%', icon: 'pi-users', color: '#e74c3c' },
        { title: 'Data Resources', value: '51', change: '+10%', icon: 'pi-database', color: '#f39c12' },
        { title: 'Renewable %', value: '45.8%', change: '+8%', icon: 'pi-bolt', color: '#f1c40f' },
        { title: 'Grid Efficiency', value: '94%', change: '+3%', icon: 'pi-check', color: '#2ecc71' },
        { title: 'Peak Load', value: '8,542 MW', change: '+2.1%', icon: 'pi-arrow-up', color: '#e74c3c' },
        { title: 'Downtime', value: '0.3%', change: '-0.1%', icon: 'pi-times-circle', color: '#9b59b6' }
      ],
      xAxisLabel: 'Energy Sources',
      xAxisLabels: ['Solar', 'Wind', 'Hydro', 'Coal', 'Gas', 'Nuclear', 'Biomass', 'Geothermal', 'Tidal', 'Wave', 'Grid', 'Storage'],
      yAxisLabel: 'Energy Production (MW)',
      chartTitle: 'Energy Generation & Distribution',
      visitors2023: [62, 72, 58, 81, 88, 76, 84, 91, 78, 86, 73, 82],
      visitors2024: [72, 82, 68, 91, 98, 86, 94, 101, 88, 96, 83, 92],
      deviceData: [49, 36, 12, 3],
      mobileData: [44, 43, 13],
      topPages: [
        { page: '/energy/practices', visitors: 489, percent: '20.32%' },
        { page: '/energy/policies', visitors: 421, percent: '17.48%' },
        { page: '/renewable', visitors: 356, percent: '14.78%' },
        { page: '/resources', visitors: 298, percent: '12.38%' },
        { page: '/analytics', visitors: 237, percent: '9.84%' }
      ]
    },
    'Finance': {
      infographics: [
        { title: 'Total Practices', value: '28', change: '+23%', icon: 'pi-star-fill', color: '#9b59b6' },
        { title: 'Implementations', value: '25', change: '+20%', icon: 'pi-check-circle', color: '#2ecc71' },
        { title: 'Active Users', value: '1,234', change: '+31%', icon: 'pi-users', color: '#e74c3c' },
        { title: 'Data Resources', value: '71', change: '+13%', icon: 'pi-database', color: '#f39c12' },
        { title: 'Total Assets', value: '$2.4B', change: '+12%', icon: 'pi-briefcase', color: '#9b59b6' },
        { title: 'Portfolio Return', value: '18.5%', change: '+4.2%', icon: 'pi-chart-line', color: '#2ecc71' },
        { title: 'Risk Score', value: '32/100', change: '-5', icon: 'pi-shield', color: '#3498db' },
        { title: 'Liquidity Ratio', value: '1.85', change: '+0.15', icon: 'pi-dollar', color: '#f1c40f' }
      ],
      xAxisLabel: 'Financial Sectors',
      xAxisLabels: ['Banking', 'Insurance', 'Investment', 'Lending', 'Payments', 'Trading', 'Bonds', 'Equity', 'Forex', 'Derivatives', 'Crypto', 'Digital'],
      yAxisLabel: 'Financial Volume (Billion)',
      chartTitle: 'Financial Sector Performance',
      visitors2023: [78, 88, 75, 98, 105, 92, 102, 109, 96, 104, 89, 98],
      visitors2024: [88, 98, 85, 108, 115, 102, 112, 119, 106, 114, 99, 108],
      deviceData: [47, 38, 12, 3],
      mobileData: [43, 44, 13],
      topPages: [
        { page: '/finance/practices', visitors: 678, percent: '23.45%' },
        { page: '/finance/policies', visitors: 567, percent: '19.64%' },
        { page: '/investments', visitors: 489, percent: '16.92%' },
        { page: '/resources', visitors: 401, percent: '13.88%' },
        { page: '/data', visitors: 289, percent: '10.01%' }
      ]
    },
    'Transportation': {
      infographics: [
        { title: 'Total Practices', value: '21', change: '+19%', icon: 'pi-star-fill', color: '#34495e' },
        { title: 'Implementations', value: '19', change: '+16%', icon: 'pi-check-circle', color: '#2ecc71' },
        { title: 'Active Users', value: '912', change: '+27%', icon: 'pi-users', color: '#e74c3c' },
        { title: 'Data Resources', value: '64', change: '+11%', icon: 'pi-database', color: '#f39c12' },
        { title: 'Fleet Utilization', value: '82%', change: '+6%', icon: 'pi-car', color: '#34495e' },
        { title: 'On-time Rate', value: '96.5%', change: '+2%', icon: 'pi-check', color: '#2ecc71' },
        { title: 'Avg Travel Time', value: '45 min', change: '-3 min', icon: 'pi-clock', color: '#3498db' },
        { title: 'Safety Score', value: '9.2/10', change: '+0.4', icon: 'pi-shield', color: '#f1c40f' }
      ],
      xAxisLabel: 'Transport Modes',
      xAxisLabels: ['Road', 'Rail', 'Air', 'Water', 'Metro', 'Bus', 'Taxi', 'Auto', 'Cycle', 'Walk', 'Pipeline', 'Multi'],
      yAxisLabel: 'Traffic Volume (Million)',
      chartTitle: 'Transportation Flow Analysis',
      visitors2023: [68, 78, 65, 88, 95, 82, 90, 97, 84, 92, 79, 88],
      visitors2024: [78, 88, 75, 98, 105, 92, 100, 107, 94, 102, 89, 98],
      deviceData: [51, 34, 12, 3],
      mobileData: [47, 40, 13],
      topPages: [
        { page: '/transportation/practices', visitors: 567, percent: '22.10%' },
        { page: '/transportation/policies', visitors: 478, percent: '18.60%' },
        { page: '/logistics', visitors: 401, percent: '15.61%' },
        { page: '/resources', visitors: 334, percent: '13.01%' },
        { page: '/data', visitors: 273, percent: '10.62%' }
      ]
    }
  };

  ngOnInit() {
    this.initializeCharts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedSectorFromParent'] && !changes['selectedSectorFromParent'].firstChange) {
      this.selectedSector = this.selectedSectorFromParent;
      this.updateChartsForSector(this.selectedSectorFromParent);
    } else if (this.selectedSectorFromParent) {
      this.selectedSector = this.selectedSectorFromParent;
      this.updateChartsForSector(this.selectedSectorFromParent);
    }
  }

  initializeCharts() {
    // Initialize with default data
    this.updateChartsForSector('');
  }

  updateChartsForSector(sector: string) {
    const sectorInfo = sector && this.sectorData[sector] ? this.sectorData[sector] : this.getDefaultData();

    // Update infographics
    this.infographics = sectorInfo.infographics;

    // Visitors Line Chart with sector-specific axes
    this.visitorsChart = {
      labels: sectorInfo.xAxisLabels,
      datasets: [
        {
          label: 'Performance 2023',
          data: sectorInfo.visitors2023,
          fill: true,
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: '#3498db',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        },
        {
          label: 'Performance 2024',
          data: sectorInfo.visitors2024,
          fill: true,
          borderColor: '#f39c12',
          backgroundColor: 'rgba(243, 156, 18, 0.1)',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: '#f39c12',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }
      ]
    };

    // Chart options with sector-specific axis labels
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: sectorInfo.chartTitle,
          font: { size: 14, weight: 'bold' },
          padding: 15
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: sectorInfo.xAxisLabel,
            font: { size: 12, weight: 'bold' }
          }
        },
        y: {
          title: {
            display: true,
            text: sectorInfo.yAxisLabel,
            font: { size: 12, weight: 'bold' }
          }
        }
      }
    };

    // Device Category Doughnut Chart
    this.deviceCategoryChart = {
      labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
      datasets: [
        {
          data: sectorInfo.deviceData,
          backgroundColor: ['#3498db', '#2ecc71', '#f39c12', '#e74c3c'],
          borderColor: '#fff',
          borderWidth: 2
        }
      ]
    };

    // Mobile Devices Pie Chart
    this.mobileDevicesChart = {
      labels: ['iPhone', 'Android', 'Others'],
      datasets: [
        {
          data: sectorInfo.mobileData,
          backgroundColor: ['#3498db', '#2ecc71', '#95a5a6'],
          borderColor: '#fff',
          borderWidth: 2
        }
      ]
    };

    // Popular Pages Table Data
    this.popularPagesData = sectorInfo.topPages;

    // User Retention Data
    this.userRetentionData = [
      { period: 'Day 1', retention: 95, percent: '95.3%' },
      { period: 'Day 7', retention: 78, percent: '78.1%' },
      { period: 'Day 14', retention: 65, percent: '64.9%' },
      { period: 'Day 30', retention: 48, percent: '48.2%' },
      { period: 'Day 60', retention: 32, percent: '32.5%' }
    ];
  }

  getDefaultData() {
    return {
      infographics: [
        { title: 'Total Practices', value: '179', change: '+12%', icon: 'pi-star-fill', color: '#3498db' },
        { title: 'Implementations', value: '156', change: '+8%', icon: 'pi-check-circle', color: '#2ecc71' },
        { title: 'Active Users', value: '1,234', change: '+25%', icon: 'pi-users', color: '#e74c3c' },
        { title: 'Data Resources', value: '89', change: '+5%', icon: 'pi-database', color: '#f39c12' },
        { title: 'Success Rate', value: '88.5%', change: '+7%', icon: 'pi-trophy', color: '#f1c40f' },
        { title: 'Efficiency Score', value: '91%', change: '+4%', icon: 'pi-chart-line', color: '#3498db' },
        { title: 'Avg Performance', value: '84.2%', change: '+3.5%', icon: 'pi-trending-up', color: '#1abc9c' },
        { title: 'Overall ROI', value: '156%', change: '+22%', icon: 'pi-dollar', color: '#9b59b6' }
      ],
      xAxisLabel: 'Sector Overview',
      xAxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      yAxisLabel: 'Overall Metrics',
      chartTitle: 'Overall Analytics Dashboard',
      visitors2023: [65, 72, 58, 85, 92, 78, 88, 95, 82, 91, 76, 88],
      visitors2024: [72, 82, 68, 95, 102, 88, 98, 105, 92, 101, 86, 98],
      deviceData: [45, 35, 15, 5],
      mobileData: [45, 40, 15],
      topPages: [
        { page: '/practices', visitors: 452, percent: '18.25%' },
        { page: '/policies', visitors: 398, percent: '16.08%' },
        { page: '/analytics', visitors: 342, percent: '13.82%' },
        { page: '/sectors', visitors: 298, percent: '12.04%' },
        { page: '/dashboard', visitors: 256, percent: '10.34%' }
      ]
    };
  }

  onSectorSelect(sector: string) {
    this.selectedSector = sector;
    this.updateChartsForSector(sector);
  }
}
