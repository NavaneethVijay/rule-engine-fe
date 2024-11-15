import { Condition, Action } from '@/types/rule'
import { OPERATORS, ACTION_TYPES } from './constants'

export function formatConditionDisplay(condition: Condition): string {
  const operatorDisplay: Record<string, string> = {
    [OPERATORS.EQUALS]: '=',
    [OPERATORS.NOT_EQUALS]: '≠',
    [OPERATORS.GREATER_THAN]: '>',
    [OPERATORS.LESS_THAN]: '<',
    [OPERATORS.GREATER_THAN_EQUALS]: '≥',
    [OPERATORS.LESS_THAN_EQUALS]: '≤',
    [OPERATORS.IN]: 'in',
  }

  switch (condition.type) {
    case 'SKU':
      return `SKU ${operatorDisplay[condition.operator]} ${condition?.itemId?.toString()}`
    case 'CartSubtotal':
      return `Cart Total ${operatorDisplay[condition.operator]} $${condition.value}`
    case 'QuantityInCart':
      return `Quantity ${operatorDisplay[condition.operator]} ${condition.value}`
    case 'DateRange':
      return `Valid: ${condition.value}`
    default:
      return 'Unknown condition'
  }
}

export function formatActionDisplay(action: Action): string {
  switch (action.type) {
    case ACTION_TYPES.PERCENTAGE_DISCOUNT:
      return `${action.value}% off`
    case ACTION_TYPES.FIXED_AMOUNT:
      return `$${action.value} off`
    case ACTION_TYPES.FREE_SHIPPING:
      return 'Free Shipping'
    case ACTION_TYPES.FREE_PRODUCT:
      return `Free Products ${action.metadata?.freeProducts?.map((p) => p.sku).join(', ')}`
    case ACTION_TYPES.BUY_X_GET_Y:
      return `Buy X Get Y ${action.value}% off`
    default:
      return 'Unknown action'
  }
}