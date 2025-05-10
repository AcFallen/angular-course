import {
  Component,
  computed,
  signal,
  effect,
  Injector,
  inject,
} from '@angular/core';
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
  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');

  filteredTasks = computed(() => {
    return this.tasks().filter((task) => {
      if (this.filter() === 'all') return true;
      if (this.filter() === 'pending') return !task.completed;
      return task.completed;
    });
  });

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.nullValidator,
    ],
  });

  inyector = inject(Injector);

  ngOnInit() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
    this.trackTask();
  }

  trackTask() {
    effect(
      () => {
        localStorage.setItem('tasks', JSON.stringify(this.tasks()));
      },
      { injector: this.inyector }
    );
  }

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

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
