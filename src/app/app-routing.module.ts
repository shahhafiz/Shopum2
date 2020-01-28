import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/all',
    pathMatch: 'full'
  },
  
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'add', loadChildren: './pages/add/add.module#AddPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'reset', loadChildren: './pages/reset/reset.module#ResetPageModule' },
  
  
  { path: 'home/:tag', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'show/:id', loadChildren: './pages/show/show.module#ShowPageModule' },
  { path: 'edit/:id', loadChildren: './pages/edit/edit.module#EditPageModule' },
  { path: 'my-items', loadChildren: './pages/my-items/my-items.module#MyItemsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'conversations', loadChildren: './pages/conversations/conversations.module#ConversationsPageModule' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesPageModule' },
  { path: 'result/:tag', loadChildren: './pages/result/result.module#ResultPageModule' },
  { path: 'seed', loadChildren: './pages/seed/seed.module#SeedPageModule' },
  { path: 'userdetailsform', loadChildren: './pages/userdetailsform/userdetailsform.module#UserdetailsformPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
