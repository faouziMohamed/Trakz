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
import { TrakzLogoComponent } from '@/components/trakz-logo/trakz-logo.component';
import { ImportantComponent } from '@/pages/important/important.component';
import { MyDayComponent } from '@/pages/my-day/my-day.component';
import { UserAvatarComponent } from '@/components/user-avatar/user-avatar.component';

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
