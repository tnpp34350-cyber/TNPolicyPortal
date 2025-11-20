import { Routes } from '@angular/router';
import { SectionComponent } from './components/section/section.component';
import { BestPracticesComponent } from './components/best-practices/best-practices.component';
import { ExploreSectorComponent } from './components/explore-sector/explore-sector.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AdminConsoleComponent } from './components/admin-console/admin-console.component';
import { SectorDetailComponent } from './components/sector-detail/sector-detail.component';
import { ProgrammesComponent } from './components/programmes/programmes.component';

export const routes: Routes = [
	{ path: '', component: SectionComponent },
	{ path: 'best-practices', component: BestPracticesComponent },
	{ path: 'explore', component: ExploreSectorComponent },
	{ path: 'analytics', component: AnalyticsComponent },
	{ path: 'programmes', component: ProgrammesComponent },
	{ path: 'dashboard/:sector', component: SectorDetailComponent },
	{ path: 'admin', component: AdminConsoleComponent }
];
