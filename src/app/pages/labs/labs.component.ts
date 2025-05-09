import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcome = 'Welcome to the Labs page';

  tasks = [
    'Task 1',
    'Task 2',
    'Task 3',
    'Task 4',
    'Task 5',
    'Task 6',
    'Task 7',
  ];

  disabled = true;

  person = {
    name: 'John',
    age: 30,
    city: 'New York',
  };

  changeName() {
    this.person.name = 'Jane';
  }

  inputHandler(event: Event) {
    console.log((event.target as HTMLInputElement).value);
  }

  keydownHandler(event: KeyboardEvent) {
    console.log((event.target as HTMLInputElement).value);
  }
}
