import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [RegisterComponent, AutoCompleteComponent],
  imports: [CommonModule, RegisterRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class RegisterModule {}
