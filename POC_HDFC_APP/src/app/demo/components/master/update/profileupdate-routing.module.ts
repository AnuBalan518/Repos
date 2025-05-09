import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileUpdateComponent } from './profileupdate.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProfileUpdateComponent }
	])],
	exports: [RouterModule]
})
export class ProfileUpdateRoutingModule { }
