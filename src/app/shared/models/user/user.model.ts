import { PlanEnum } from "../../../core/enums/plan.enum";

export interface User {
    id: string;
    name: string;
    password?: string;
    email: string;
    plan: PlanEnum | null;
}