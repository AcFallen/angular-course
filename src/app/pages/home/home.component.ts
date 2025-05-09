import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Instalar Angular CLI',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear un nuevo proyecto',
      completed: true,
    },
    {
      id: Date.now(),
      title: 'Crear un nuevo componente',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear un nuevo servicio',
      completed: true,
    },
    {
      id: Date.now(),
      title: 'Crear un nuevo pipe',
      completed: true,
    },
  ]);

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.nullValidator,
    ],
  });

  changehandler() {
    if (this.newTaskControl.valid) {
      const value = this.newTaskControl.value.trim();
      if (value) {
        this.addTask(value);
        this.newTaskControl.reset();
      }
    }
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTasks(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }

  toogleTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }

  editTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index
          ? { ...task, editing: !task.editing }
          : { ...task, editing: false }
      )
    );
  }

  keydownHandler(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    if (value) {
      this.tasks.update((tasks) =>
        tasks.map((task, i) =>
          i === index ? { ...task, title: value, editing: false } : task
        )
      );
    }
  }
}
