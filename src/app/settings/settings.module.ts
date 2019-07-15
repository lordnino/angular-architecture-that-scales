import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routings.module';
import { CategoryComponent } from './components/category/category.component';
import { SettingsState } from './state/settings.state';
import { SettingsFacade } from './settings.facade';
import { CashflowCategoryApi } from './api/category.api';

@NgModule({
    declarations: [CategoryComponent],
    imports: [CommonModule, FormsModule, SettingsRoutingModule],
    exports: [],
    providers: [SettingsState, SettingsFacade, CashflowCategoryApi]
})
export class SettingsModule {}