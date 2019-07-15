import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { CashFlowCategory } from '../models/category.model';

@Injectable()
export class CashflowCategoryApi {

    constructor() { }

    getCashFlowCategories(): Observable<CashFlowCategory[]> {
        return new Observable((observer: Observer<any>) => {
            observer.next([
                {
                    id: 0,
                    name: 'ali',
                    price: '20.0'
                },
                { 
                    id: 1,
                    name: 'amr',
                    price:'25.50'
                },
                {
                    id: 2,
                    name: 'moh',
                    price: '29.00'
                }
            ])
            observer.complete();
        })
    }

    createCashflowCategory(category: CashFlowCategory): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            observer.next('added cashflow successfully');
            observer.complete();
        })
    }

    updateCashflowCategory(category: CashFlowCategory): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            observer.next('updated cashflow successfully');
            observer.complete();
        })
    }
}