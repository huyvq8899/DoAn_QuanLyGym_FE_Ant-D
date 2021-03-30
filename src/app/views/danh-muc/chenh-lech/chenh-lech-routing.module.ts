import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChenhLechComponent } from './chenh-lech.component';

const routes: Routes = [
    {
        path: '',
        component: ChenhLechComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChenhLechRoutingModule { }
