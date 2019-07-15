import { Component, OnInit, Input } from '@angular/core';
import { CashFlowCategory } from '../../models/category.model';
import { Observable } from 'rxjs';
import { SettingsFacade } from '../../settings.facade';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() cashflowCategories$ : CashFlowCategory[];
  newCategory: CashFlowCategory = new CashFlowCategory();
  isUpdating$: Observable<boolean>;
  categories: CashFlowCategory[];

  constructor(private settingsFacade: SettingsFacade) { 
    this.isUpdating$ = this.settingsFacade.isUpdating$();
  }

  ngOnInit() {
    this.settingsFacade.loadCashflowCategories().subscribe((res: any) => {
      this.getCategory();
    });
    // this.getCategory();
  }

  addCategory(category: CashFlowCategory) {
    this.settingsFacade.addCashflowCategory(category);
  }

  updateCategoty(category: CashFlowCategory) {
    this.settingsFacade.updateCashflowCategory(category);
  }

  getCategory() {
    this.settingsFacade.getCashflowCategories$().subscribe((res: any) => {
      console.log(res);
      this.categories = res;
    });
  }

}
