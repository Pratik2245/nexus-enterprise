
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login/login')
                .then(m => m.Login)
    },
    {
        path: '',
        loadComponent: () =>
            import('./layouts/admin-layout/admin-layout')
                .then(m => m.AdminLayout),
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/dashboard/dashboard')
                        .then(m => m.Dashboard)
            },
            {
                path: 'projects',
                loadComponent: () =>
                    import('./features/projects/projects')
                        .then(m => m.Projects)
            },
            {
                path: 'tasks',
                loadComponent: () =>
                    import('./features/tasks/tasks')
                        .then(m => m.Tasks)
            },
            {
                path: 'employees',
                loadComponent: () =>
                    import('./features/employees/employees')
                        .then(m => m.Employees)
            },
            {
                path: 'approvals',
                loadComponent: () =>
                    import('./features/approvals/approvals')
                        .then(m => m.Approvals)
            },
            {
                path: 'audit-logs',
                loadComponent: () =>
                    import('./features/audit-logs/audit-logs')
                        .then(m => m.AuditLogs)
            }
        ]
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
