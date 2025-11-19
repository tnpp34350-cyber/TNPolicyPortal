import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-console',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.scss']
})
export class AdminConsoleComponent {
  // Sample sectors and districts for the sidebar
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

  districts = [
    'Chennai', 'Tiruchirappalli', 'Madurai', 'Tirunelveli', 'Coimbatore', 'Nilgiris', 'Kanyakumari', 'Vellore', 'Chengalpattu', 'Kanchipuram', 'Villupuram', 'Ranipet', 'Tiruppur', 'Karur', 'Erode', 'Sivagangai', 'Ramanathapuram', 'Virudunagar', 'Tenkasi', 'Theni', 'Dindigul', 'Puducherry', 'Kallakurichi', 'Perambalur'
  ];

  // Sample best practice records
  records: Array<{
    id: number;
    bestpractice: string;
    sector: string;
    district: string;
    policies: string[];
    selected?: boolean;
  }> = [
    { id: 1, bestpractice: 'Rainwater harvesting model', sector: 'Water & WASH', district: 'Chennai', policies: ['Policy A','Policy C'] },
    { id: 2, bestpractice: 'Solar microgrid program', sector: 'Energy', district: 'Coimbatore', policies: ['Policy B'] },
    { id: 3, bestpractice: 'Community health outreach', sector: 'Health', district: 'Madurai', policies: ['Policy A','Policy D'] },
    { id: 4, bestpractice: 'Skill training hubs', sector: 'Skilling & Livelihoods', district: 'Tiruchirappalli', policies: ['Policy E'] },
    { id: 5, bestpractice: 'Agri extension clinics', sector: 'Agriculture', district: 'Tirunelveli', policies: ['Policy F'] },
    { id: 6, bestpractice: 'Heritage tourism circuit', sector: 'Tourism', district: 'Vellore', policies: ['Policy G'] }
  ];

  // Filter state
  selectedSectors = new Set<string>();
  selectedDistricts = new Set<string>();
  // dropdown state
  districtsOpen = false;

  // no inline edit state (reverted)

  constructor() {}

  // Computed list
  get filteredRecords() {
    return this.records.filter(r => {
      if (this.selectedSectors.size && !this.selectedSectors.has(r.sector)) return false;
      if (this.selectedDistricts.size && !this.selectedDistricts.has(r.district)) return false;
      return true;
    });
  }

  toggleSector(sector: string) {
    if (this.selectedSectors.has(sector)) this.selectedSectors.delete(sector);
    else this.selectedSectors.add(sector);
  }

  toggleDistrict(d: string) {
    if (this.selectedDistricts.has(d)) this.selectedDistricts.delete(d);
    else this.selectedDistricts.add(d);
  }

  toggleDistrictsDropdown() {
    this.districtsOpen = !this.districtsOpen;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.districtsOpen) return;
    const insideToggle = !!target.closest('.district-toggle');
    const insideDropdown = !!target.closest('.district-dropdown');
    if (!insideToggle && !insideDropdown) this.districtsOpen = false;
  }

  selectAllDistricts(checked: boolean) {
    if (checked) {
      this.districts.forEach(d => this.selectedDistricts.add(d));
    } else {
      this.selectedDistricts.clear();
    }
  }

  toggleSelectRecord(rec: any) {
    rec.selected = !rec.selected;
  }

  selectAllVisible(checked: boolean) {
    this.filteredRecords.forEach(r => r.selected = checked);
  }

  // bulk action example
  bulkExportSelected() {
    const sel = this.records.filter(r => r.selected);
    console.log('Export selected', sel.map(s => s.id));
    alert(`Exporting ${sel.length} records (mock)`);
  }

  get selectedCount() {
    return this.records.filter(r => r.selected).length;
  }
  // inline edit feature removed per revert request
  
}

