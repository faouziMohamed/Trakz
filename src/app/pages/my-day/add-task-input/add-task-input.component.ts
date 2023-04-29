import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { pageTitles } from '@/models/navLabel';
import { ITask } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';
import { slugToTitle } from '@/utils/trakzUtils';

@Component({
  selector: 'app-add-task-input',
  templateUrl: './add-task-input.component.html',
  styleUrls: ['./add-task-input.component.scss'],
})
export class AddTaskInputComponent implements OnInit {
  inputHasFocus = false;

  parentFolder = 'Tasks';

  constructor(private _taskService: TaskService, private _router: Router) {}

  private static scrollInToNewAddedTask(createdTask: ITask) {
    const taskHTMLId = TaskService.taskGeneratedId(createdTask);
    const taskElement = document.getElementById(taskHTMLId);
    if (taskElement) {
      taskElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onFocusInput(taskInput: HTMLInputElement) {
    if (!taskInput.value) {
      // eslint-disable-next-line no-param-reassign
      taskInput.placeholder = "try 'Pay utilities this afternoon'";
    }
    this.inputHasFocus = true;
  }

  onBlurInput(taskInput: HTMLInputElement) {
    if (!taskInput.value) {
      // eslint-disable-next-line no-param-reassign
      taskInput.placeholder = 'Add a task';
    }
    this.inputHasFocus = false;
  }

  ngOnInit(): void {
    this.inputHasFocus = false;
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.parentFolder = slugToTitle(event.url.split('/')[1]);
      }
    });
  }

  onEnterInput(taskInput: HTMLInputElement) {
    if (!taskInput.value.trim().length) {
      return;
    }
    const createdTask = this._taskService.createTask({
      text: taskInput.value,
      parent: this.parentFolder,
      isInMyDay: this.parentFolder === pageTitles.MyDay,
    });
    // eslint-disable-next-line no-param-reassign
    taskInput.value = '';
    this._taskService.addTask(createdTask);
    // scroll to the task that was just added to the list of tasks in the DOM
    setTimeout(() => {
      AddTaskInputComponent.scrollInToNewAddedTask(createdTask);
    }, 0);
  }
}
