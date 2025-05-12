import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcome = 'Welcome to the Labs page';

  tasks = signal([
    'Task 1',
    'Task 2',
    'Task 3',
    'Task 4',
    'Task 5',
    'Task 6',
    'Task 7',
  ]);

  // Equivalente a ReactHookForm
  colorControl = new FormControl('');
  widthControl = new FormControl(100);

  nameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  constructor() {
    this.colorControl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  name = signal('Juan');

  disabled = true;

  person = {
    name: 'John',
    age: 30,
    city: 'New York',
  };

  changeName() {
    this.person.name = 'Jane';
  }

  changehandler(event: Event) {
    this.name.set((event.target as HTMLInputElement).value);
  }

  inputHandler(event: Event) {
    console.log((event.target as HTMLInputElement).value);
  }

  keydownHandler(event: KeyboardEvent) {
    console.log((event.target as HTMLInputElement).value);
  }
}
