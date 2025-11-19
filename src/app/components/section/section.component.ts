import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from '../hero/hero.component';
import { ExploreSectorComponent } from '../explore-sector/explore-sector.component';
import { BestPracticesComponent } from '../best-practices/best-practices.component';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, OverviewComponent, ExploreSectorComponent, BestPracticesComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  constructor(public nav: NavigationService) {}
}

 
