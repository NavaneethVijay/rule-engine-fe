import { Product } from "@/components/product-selector/types";

export type Condition = {
    itemId: []
    type: string;
    value: string | number;
    operator: string;
    metadata?: unknown;
}

export type Action = {
    type: string;
    target: string;
    value?: number;
    maximumDiscount?: number;
    metadata?: {
        freeProducts?: Product[];
    };
}

export type Rule = {
    id?: string;
    isActive?: boolean;
    description: string;
    priority: number;
    allowStacking: boolean;
    websiteId: string;
    customerGroupId: string;
    conditions: Condition[];
    actions: Action[];
    start_date?: string;
    end_date?: string;
}
