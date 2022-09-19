import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscoverComponent } from './discover/discover.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './Guards/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchComponent } from './search/search.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostComponent } from './post/post.component';
import { PostGuard } from './Guards/post.guard';

const routes: Routes = [
  { path: '', component: DiscoverComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:userId', component: ProfileComponent },
  {
    path: 'search',
    component: SearchComponent,
    children: [
      { path: 'post', component: SearchPostComponent },
      { path: 'people', component: SearchPeopleComponent },
    ],
  },
  { path: 'posts/:id', component: PostComponent },
  {
    path: 'post/editor',
    component: PostEditorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:userId/edit',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'for-you', component: SubscriptionComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
