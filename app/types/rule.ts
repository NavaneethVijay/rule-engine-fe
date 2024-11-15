import { Action, Condition } from "@/types/rule";

export interface Rule {
    id?: string;
    description: string;
    websiteId?: string;
    customerGroupId?: string;
    isActive: boolean;
    conditions: Condition[];
    actions: Action[];
    priority: number;
    allowStacking: boolean;
    start_date: string;
    end_date: string;
    minimumCartValue?: number;
    maximumDiscountAmount?: number;
    usageLimitPerCustomer?: number;
    totalUsageLimit?: number;
  }