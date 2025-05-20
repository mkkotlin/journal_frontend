import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { JournalListComponent } from './components/journal-list/journal-list.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'journal_list', component: JournalListComponent},
    { path:'add-entry', component: EntryFormComponent,}
];
