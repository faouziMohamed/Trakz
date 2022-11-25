import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@/modules/material/material.module';
import { MainLayoutComponent } from '@/layouts/main-layout/main-layout.component';
import { AppRoutingModule } from '@/app/app-routing.module';
import { AppComponent } from '@/app/app.component';
import { TasksComponent } from '@/pages/tasks/tasks.component';
import { PlannedComponent } from '@/pages/planned/planned.component';
import { ProjectsComponent } from '@/pages/projects/projects.component';
import { HomeComponent } from '@/pages/home/home.component';
import { NotFoundComponent } from '@/pages/not-found/not-found.component';
import { TrakzLogoComponent } from '@/components/svg/trakz-logo/trakz-logo.component';
import { ImportantComponent } from '@/pages/important/important.component';
import { MyDayComponent } from '@/pages/my-day/my-day.component';
import { UserAvatarComponent } from '@/components/user-avatar/user-avatar.component';
import { EmptyCalendarComponent } from '@/components/svg/empty-calendar/empty-calendar.component';
import { EmptyMyDayHandleComponent } from './pages/my-day/empty-my-day-handle/empty-my-day-handle.component';
import { AddTaskInputComponent } from './pages/my-day/add-task-input/add-task-input.component';
import { TaskRowComponent } from './pages/my-day/task-row/task-row.component';
import { LeftSideNavComponent } from './layouts/main-layout/left-side-nav/left-side-nav.component';
import { TopNavbarComponent } from './layouts/main-layout/top-navbar/top-navbar.component';
import { RightSideNavComponent } from './layouts/main-layout/right-side-nav/right-side-nav.component';
import { TaskTextCardComponent } from './pages/my-day/task-row/task-text-card/task-text-card.component';
import { AddStepInputComponent } from './layouts/main-layout/right-side-nav/add-step-input/add-step-input.component';
import { TaskStepComponent } from './layouts/main-layout/right-side-nav/task-step/task-step.component';
import { OpenedTaskComponent } from '@/layouts/main-layout/right-side-nav/oppened-task/opened-task.component';
import { TaskDetailComponent } from './layouts/main-layout/right-side-nav/task-detail/task-detail.component';
import { TaskNoteComponent } from './layouts/main-layout/right-side-nav/task-note/task-note.component';
import { DeleteTaskComponent } from './layouts/main-layout/right-side-nav/delete-task/delete-task.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    TrakzLogoComponent,
    MyDayComponent,
    ImportantComponent,
    PlannedComponent,
    TasksComponent,
    ProjectsComponent,
    HomeComponent,
    NotFoundComponent,
    UserAvatarComponent,
    EmptyCalendarComponent,
    EmptyMyDayHandleComponent,
    AddTaskInputComponent,
    TaskRowComponent,
    LeftSideNavComponent,
    TopNavbarComponent,
    RightSideNavComponent,
    TaskTextCardComponent,
    AddStepInputComponent,
    TaskStepComponent,
    OpenedTaskComponent,
    TaskDetailComponent,
    TaskNoteComponent,
    DeleteTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
