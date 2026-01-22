import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../components/task-list/task-list.component';
import { TaskService } from '../services/task.service';
import { of } from 'rxjs';

// ===== GLOBAL MOCK DATA =====
// Defined globally so MockServices can access them
const mockTasks = [{ id: 1, title: 'Test Task 1', completed: false, dueDate: '2023-12-01' }, { id: 2, title: 'Test Task 2', completed: true, dueDate: '2023-12-02' }];
const userId = 1;
const showCompleted = true;

class MockTaskService {
  getTasks(...args: any[]) {
    return of(mockTasks);
  }
}

@Component({
  selector: 'app-harness',
  standalone: true,
  imports: [CommonModule, TaskListComponent],
  providers: [
    { provide: TaskService, useClass: MockTaskService }
  ],
  template: `
    <div id="test-wrapper-1768957289969" style="padding: 20px;">
      <app-task-list
        [userId]="userId" [showCompleted]="showCompleted">
      </app-task-list>
    </div>
  `
})
export class HarnessComponent {
  // Expose global mocks to template bindings
  mockTasks = mockTasks;
  userId = userId;
  showCompleted = showCompleted;

  handleEvent(n: string, p: any) { console.log('[Harness]', n, p); }
}
