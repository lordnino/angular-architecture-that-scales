import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { CashFlowCategory } from '../models/category.model';

@Injectable()
export class SettingsState {

    private updating$ = new BehaviorSubject<boolean>(false);
    private cashflowCategories$ = new BehaviorSubject<CashFlowCategory[]>(null);

    isUpdating$(): Observable<boolean> {
        return this.updating$.asObservable();
    }

    setUpdating(isUpdating: boolean) {
        return this.updating$.next(isUpdating);
    }

    getCashflowCategories() {
        return this.cashflowCategories$.asObservable();
    }

    setCashflowCategories(categories: CashFlowCategory[]) {
        this.cashflowCategories$.next(categories);
    }

    addCashflowCategory(category: CashFlowCategory) {
        const currentValue = this.cashflowCategories$.getValue();
        this.cashflowCategories$.next([...currentValue, category]);
    }

    updateCashflowCategory(updatedCategory: CashFlowCategory) {
        const categories = this.cashflowCategories$.getValue();
        const indexOfUpdated = categories.findIndex(category => category.id === updatedCategory.id);
        categories[indexOfUpdated] = updatedCategory;
        this.cashflowCategories$.next([...categories]);
    }

    updateCashflowCategoryId(categoryToReplace: CashFlowCategory, addedCategoryWithId: CashFlowCategory) {
        const categories = this.cashflowCategories$.getValue();
        const updatedCategoryIndex = categories.findIndex(category => category === categoryToReplace);
        categories[updatedCategoryIndex] = addedCategoryWithId;
        this.cashflowCategories$.next([...categories]);
    }

    removeCashflowCategory(categoryRemove: CashFlowCategory) {
        const currentValue = this.cashflowCategories$.getValue();
        this.cashflowCategories$.next(currentValue.filter(category => category !== categoryRemove));
    }

}