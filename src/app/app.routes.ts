import { Routes } from '@angular/router';
import { SectionComponent } from './components/section/section.component';
import { BestPracticesComponent } from './components/best-practices/best-practices.component';
import { ExploreSectorComponent } from './components/explore-sector/explore-sector.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';

export const routes: Routes = [
	{ path: '', component: SectionComponent },
	{ path: 'best-practices', component: BestPracticesComponent },
	{ path: 'explore', component: ExploreSectorComponent },
	{ path: 'analytics', component: AnalyticsComponent }
];
