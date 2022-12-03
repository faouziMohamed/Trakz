import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImportantComponent } from '@/pages/important/important.component';
import { MyDayComponent } from '@/pages/my-day/my-day.component';
import { NotFoundComponent } from '@/pages/not-found/not-found.component';
import { PlannedComponent } from '@/pages/planned/planned.component';
import { ProjectsComponent } from '@/pages/projects/projects.component';
import { TasksComponent } from '@/pages/tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-day',
    pathMatch: 'full',
  },
  {
    path: 'my-day',
    component: MyDayComponent,
  },
  {
    path: 'important',
    component: ImportantComponent,
  },
  {
    path: 'planned',
    component: PlannedComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
