import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { DEFAULT_FOLDER, Task } from '@/models/task';
import { TaskService } from '@/services/tasks/task.service';
import { slugToTitle, taskGeneratedId } from '@/utils/trakzUtils';

@Component({
  selector: 'app-add-task-input',
  templateUrl: './add-task-input.component.html',
  styleUrls: ['./add-task-input.component.scss'],
})
export class AddTaskInputComponent implements OnInit {
  inputHasFocus = false;

  parentFolder = 'Tasks';

  constructor(private _taskService: TaskService, private _router: Router) {}

  private static scrollInToNewAddedTask(createdTask: Task) {
    const taskHTMLId = taskGeneratedId(createdTask);
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

  onSaveNewTask(taskInput: HTMLInputElement) {
    if (!taskInput.value.trim().length) {
      return;
    }

    this._taskService
      .addNewTask({
        content: taskInput.value,
        folderName: this.parentFolder,
        isInMyDay: this.parentFolder === DEFAULT_FOLDER.MyDay,
        isImportant: this.parentFolder === DEFAULT_FOLDER.Important,
      })
      .subscribe((task) => {
        // eslint-disable-next-line no-param-reassign
        taskInput.value = '';
        // scroll to the task that was just added to the list of tasks in the DOM
        setTimeout(() => {
          AddTaskInputComponent.scrollInToNewAddedTask(task);
        }, 0);
      });
  }
}
