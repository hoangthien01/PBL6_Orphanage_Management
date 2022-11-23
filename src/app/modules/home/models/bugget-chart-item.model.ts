export class BudgetChartResponseModel {
    total_expense: number;
    total_donate: number;
    details: BudgetChartModel[];

    public constructor(init?: Partial<BudgetChartResponseModel>) {
        Object.assign(this, init);
    }
  }

  export class BudgetChartModel {
      day: string;
      donate: number;
      expense: number;

    public constructor(init?: Partial<BudgetChartModel>) {
        Object.assign(this, init);
    }
  }
