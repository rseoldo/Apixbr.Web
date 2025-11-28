import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { CLIENT_ROUTES } from './features/clients';

export const appRoutes: Routes = [

    // HOME (público)
    {
        path: '',
        loadComponent: () =>
            import('./modules/home/home.component').then(m => m.HomeComponent)
    },

    // LOGIN
    {
        path: 'login',
        loadComponent: () =>
            import('./modules/auth/login/login.component').then(m => m.LoginComponent)
    },

    // REGISTER
    {
        path: 'register',
        loadComponent: () =>
            import('./modules/auth/register/register.component').then(m => m.RegisterComponent)
    },

    // ÁREA LOGADA
    {
        path: 'app',
        loadComponent: () =>
            import('./layout/main-layout/main-layout.component')
                .then(m => m.MainLayoutComponent),

        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./modules/dashboard/dashboard.component')
                        .then(m => m.DashboardComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'apis',
                loadComponent: () =>
                    import('./modules/apis/components/apis-list/apis-list.component')
                        .then(m => m.ApisListComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'apis/:id',
                loadComponent: () =>
                    import('./modules/apis/components/apis-detail/apis-detail.component')
                        .then(m => m.ApisDetailComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'apis/test',
                loadComponent: () =>
                    import('./modules/apis/components/apis-test/apis-test.component')
                        .then(m => m.ApisTestComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'cnpj-consulta',
                loadComponent: () =>
                    import('./modules/components/cnpj-consulta/cnpj-consulta.component')
                        .then(m => m.CnpjConsultaComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'clients',
                children: CLIENT_ROUTES,
                canActivate: [AuthGuard]
            }
        ]
    },

    // WILDCARD
    { path: '**', redirectTo: '' }
];
