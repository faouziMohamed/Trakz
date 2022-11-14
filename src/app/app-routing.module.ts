import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyDayComponent } from '@/pages/my-day/my-day.component';
import { ImportantComponent } from '@/pages/important/important.component';
import { TasksComponent } from '@/pages/tasks/tasks.component';
import { PlannedComponent } from '@/pages/planned/planned.component';
import { ProjectsComponent } from '@/pages/projects/projects.component';
import { HomeComponent } from '@/pages/home/home.component';
import { NotFoundComponent } from '@/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
