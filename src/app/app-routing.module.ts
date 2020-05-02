import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./auth/auth.guard";
import { RegisterComponent } from "./components/register/register.component";
import { CockpitComponent } from "./components/cockpit/cockpit.component";

const routes: Routes = [
  {
    path: "cockpit",
    component: CockpitComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "",
    redirectTo: "/cockpit",
    pathMatch: "full"
  },
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
