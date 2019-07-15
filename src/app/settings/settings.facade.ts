import { Injectable } from "@angular/core";
import { CashflowCategoryApi } from './api/category.api';
import { SettingsState } from './state/settings.state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CashFlowCategory } from './models/category.model';


@Injectable()
export class SettingsFacade {

    constructor(private cashflowCategoryApi: CashflowCategoryApi, private settingsState: SettingsState) {

    }

    isUpdating$(): Observable<boolean> {
        return this.settingsState.isUpdating$();
    }

    getCashflowCategories$(): Observable<CashFlowCategory[]> {
        // here we just pass the state without any projections
        // it may happen that it is necessaray to combine two or more streams and expose to the components
        return this.settingsState.getCashflowCategories();
    }

    loadCashflowCategories() {
        console.log(`loading`);
        return this.cashflowCategoryApi.getCashFlowCategories().pipe(tap(categories => this.settingsState.setCashflowCategories(categories)));
    }

    // optimistic update
    // 1. update UI state
    // 2. call API
    addCashflowCategory(category: CashFlowCategory) {
        this.settingsState.addCashflowCategory(category);
        this.cashflowCategoryApi.createCashflowCategory(category)
            .subscribe((addedCategoryWithId: CashFlowCategory) => {
                // success callback - we have id generated by the server, let's update the state
                this.settingsState.updateCashflowCategoryId(category, addedCategoryWithId)
            }, err => {
                this.settingsState.removeCashflowCategory(category);
                console.log(err);
            })
    }

    // pessimistic update
    // 1. call API
    // 2. update UI state
    updateCashflowCategory(category: CashFlowCategory) {
        this.settingsState.setUpdating(true);
        this.cashflowCategoryApi.updateCashflowCategory(category)
            .subscribe(
                (res) => this.settingsState.updateCashflowCategory(category),
                (err) => console.log(err),
                () => this.settingsState.setUpdating(false)
            )
    }

}