import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { JournalListComponent } from './components/journal-list/journal-list.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { BookViewComponent } from './components/book-view/book-view.component';

export const routes: Routes = [
    { path:'', redirectTo: 'login', pathMatch:'full'},
    { path: 'login', component: LoginComponent},
    { path: 'journal-list', component: JournalListComponent},
    { path:'add-entry', component: EntryFormComponent,},
    { path: 'book-view', component: BookViewComponent}
];
