import { CdkAccordionModule } from '@angular/cdk/accordion';
import { LayoutModule } from '@angular/cdk/layout';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmptyCalendarComponent } from '@/components/svg/empty-calendar/empty-calendar.component';
import { TrakzLogoComponent } from '@/components/svg/trakz-logo/trakz-logo.component';
import { UserAvatarComponent } from '@/components/user-avatar/user-avatar.component';

import { AppComponent } from '@/app/app.component';
import { AppRoutingModule } from '@/app/app-routing.module';
import { LeftSidebarComponent } from '@/layouts/main-layout/left-sidebar/left-sidebar.component';
import { LeftSidebarItemComponent } from '@/layouts/main-layout/left-sidebar/left-sidebar-item/left-sidebar-item.component';
import { MainLayoutComponent } from '@/layouts/main-layout/main-layout.component';
import { AddStepInputComponent } from '@/layouts/main-layout/right-sidebar/add-step-input/add-step-input.component';
import { ConfirmDeleteDialogComponent } from '@/layouts/main-layout/right-sidebar/delete-task/confirm-delete-dialog/confirm-delete-dialog.component';
import { DeleteTaskComponent } from '@/layouts/main-layout/right-sidebar/delete-task/delete-task.component';
import { OpenedTaskComponent } from '@/layouts/main-layout/right-sidebar/oppened-task/opened-task.component';
import { RightSidebarComponent } from '@/layouts/main-layout/right-sidebar/right-sidebar.component';
import { TaskDetailComponent } from '@/layouts/main-layout/right-sidebar/task-detail/task-detail.component';
import { TaskNoteComponent } from '@/layouts/main-layout/right-sidebar/task-note/task-note.component';
import { TaskStepComponent } from '@/layouts/main-layout/right-sidebar/task-step/task-step.component';
import { TopNavbarComponent } from '@/layouts/main-layout/top-navbar/top-navbar.component';
import { MaterialModule } from '@/modules/material/material.module';
import { HomeComponent } from '@/pages/home/home.component';
import { ImportantComponent } from '@/pages/important/important.component';
import { AddTaskInputComponent } from '@/pages/my-day/add-task-input/add-task-input.component';
import { EmptyMyDayHandleComponent } from '@/pages/my-day/empty-my-day-handle/empty-my-day-handle.component';
import { MyDayComponent } from '@/pages/my-day/my-day.component';
import { TaskRowComponent } from '@/pages/my-day/task-row/task-row.component';
import { TaskTextCardComponent } from '@/pages/my-day/task-row/task-text-card/task-text-card.component';
import { NotFoundComponent } from '@/pages/not-found/not-found.component';
import { PlannedComponent } from '@/pages/planned/planned.component';
import { ProjectsComponent } from '@/pages/projects/projects.component';
import { TasksComponent } from '@/pages/tasks/tasks.component';

import { TrakzNotificationComponent } from './layouts/main-layout/top-navbar/trakz-notification/trakz-notification.component';
import { TaskGroupListComponent } from './pages/tasks/task-group-list/task-group-list.component';

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
    LeftSidebarComponent,
    TopNavbarComponent,
    RightSidebarComponent,
    TaskTextCardComponent,
    AddStepInputComponent,
    TaskStepComponent,
    OpenedTaskComponent,
    TaskDetailComponent,
    TaskNoteComponent,
    DeleteTaskComponent,
    ConfirmDeleteDialogComponent,
    LeftSidebarItemComponent,
    TrakzNotificationComponent,
    TaskGroupListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    CdkAccordionModule,
    NgOptimizedImage,
    HttpClientModule,
    MatLineModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
