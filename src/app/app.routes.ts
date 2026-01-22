import { Routes } from '@angular/router';

export const routes: Routes = [
  // AgentIvy Harness (auto-injected)
  {
    path: 'agent-ivy-harness',
    loadComponent: () => import('./agent-ivy-harness/harness.component').then(m => m.HarnessComponent)
  },

  {
    path: '',
    loadComponent: () => import('./components/task-list/task-list.component')
      .then(m => m.TaskListComponent)
  },
  {
    path: 'performance-test',
    loadComponent: () => import('./components/performance-issue/performance-issue.component')
      .then(m => m.PerformanceIssueComponent)
  },
];
