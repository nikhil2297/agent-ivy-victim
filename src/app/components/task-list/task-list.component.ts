import { Component, inject, input, output, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  // Signal-based inputs (Angular 16+)
  userId = input<number>(1);
  showCompleted = input<boolean>(true);

  // Signal-based outputs
  taskSelected = output<Task>();
  taskDeleted = output<number>();

  // Inject service using inject()
  private taskService = inject(TaskService);

  // Signals for state
  tasks = signal<Task[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Computed signal
  filteredTasks = computed(() => {
    const allTasks = this.tasks();
    if (this.showCompleted()) {
      return allTasks;
    }
    return allTasks.filter(t => !t.completed);
  });

  taskCount = computed(() => this.filteredTasks().length);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading.set(true);
    this.error.set(null);

    this.taskService.getTasks(this.userId()).subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load tasks');
        this.loading.set(false);
      }
    });
  }

  toggleTask(task: Task): void {
    const updated = { ...task, completed: !task.completed };
    this.taskService.updateTask(updated).subscribe({
      next: () => {
        this.tasks.update(tasks =>
          tasks.map(t => t.id === task.id ? updated : t)
        );
      }
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks.update(tasks => tasks.filter(t => t.id !== taskId));
        this.taskDeleted.emit(taskId);
      }
    });
  }

  selectTask(task: Task): void {
    this.taskSelected.emit(task);
  }
}