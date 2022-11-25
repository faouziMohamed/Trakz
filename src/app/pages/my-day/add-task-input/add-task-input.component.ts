import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task-input',
  templateUrl: './add-task-input.component.html',
  styleUrls: ['./add-task-input.component.scss'],
})
export class AddTaskInputComponent implements OnInit {
  inputHasFocus: boolean = false;

  constructor() {}

  handleInputFocus(taskInput: HTMLInputElement) {
    if (!taskInput.value) {
      taskInput.placeholder = "try 'Pay utilities this afternoon'";
    }
    this.inputHasFocus = true;
  }

  handleInputBlur(taskInput: HTMLInputElement) {
    if (!taskInput.value) {
      taskInput.placeholder = 'Add a task';
    }
    this.inputHasFocus = false;
  }

  ngOnInit(): void {
    this.inputHasFocus = false;
  }
}
