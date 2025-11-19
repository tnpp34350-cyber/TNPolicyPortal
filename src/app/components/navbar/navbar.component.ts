import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItem, DropdownCard, NAVBAR_ITEMS } from './navbar.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  hoveredDropdown: string | null = null;
  navItems: NavItem[] = NAVBAR_ITEMS;

  constructor(private router: Router, private auth: AuthService) {}

  // 🔵 Toggle dropdown when clicked
  toggleDropdown(label: string, event: MouseEvent) {
    event.stopPropagation(); // prevent auto-close
    // If the item has no dropdown, treat click as navigation
    const itemLabel = (label || '').toLowerCase();
    if (label === 'Home') {
      this.router.navigateByUrl('/');
      this.hoveredDropdown = null;
      return;
    }

    if (label === 'Dashboard') {
      this.router.navigateByUrl('/analytics');
      this.hoveredDropdown = null;
      return;
    }

    this.hoveredDropdown =
      this.hoveredDropdown === label ? null : label;
  }

  // 🔍 Identify card panel
  isCardPanel(items: DropdownCard[] | string[] | undefined): items is DropdownCard[] {
    return items !== undefined &&
           Array.isArray(items) &&
           items.length > 0 &&
           typeof items[0] === 'object';
  }

  // 🔍 Identify list panel
  isListPanel(items: DropdownCard[] | string[] | undefined): items is string[] {
    return items !== undefined &&
           Array.isArray(items) &&
           items.length > 0 &&
           typeof items[0] === 'string';
  }

  // when a panel card is clicked (e.g. Best Practices), navigate appropriately
  onPanelCardClick(p: DropdownCard) {
    const title = (p?.title || '').toLowerCase();
    if (title.includes('best practice') || title.includes('best practices')) {
      this.router.navigateByUrl('/best-practices');
    } else if (title.includes('policy')) {
      this.router.navigateByUrl('/');
    }
    // close dropdown after selection
    this.hoveredDropdown = null;
  }

  openLogin(event: MouseEvent) {
    event.stopPropagation();
    this.auth.open();
  }

  // 🔥 Close dropdown when user clicks outside BOTH navbar & dropdown
  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const clickedInsideNavbar = target.closest('.navbar');
    const clickedInsideDropdown = target.closest('.dropdown-content');

    if (!clickedInsideNavbar && !clickedInsideDropdown) {
      this.hoveredDropdown = null;
    }
  }
}



