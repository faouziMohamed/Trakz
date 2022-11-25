import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-step-input',
  templateUrl: './add-step-input.component.html',
  styleUrls: ['./add-step-input.component.scss'],
})
export class AddStepInputComponent implements OnInit {
  inputHasFocus: boolean = false;

  handleInputFocus(taskInput: HTMLInputElement) {
    if (!taskInput.value) {
      taskInput.placeholder = '';
    }
    this.inputHasFocus = true;
  }

  handleInputBlur(taskInput: HTMLInputElement) {
    if (!taskInput.value) {
      taskInput.placeholder = 'Next step';
    }
    this.inputHasFocus = false;
  }

  ngOnInit(): void {
    this.inputHasFocus = false;
  }
}
