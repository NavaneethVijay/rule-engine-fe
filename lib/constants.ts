export const CONDITION_TYPES = {
    SKU: 'SKU',
    CART_SUBTOTAL: 'CartSubtotal',
    QUANTITY_IN_CART: 'QuantityInCart',
    DATE_RANGE: 'DateRange'
  } as const

  export const ACTION_TYPES = {
    PERCENTAGE_DISCOUNT: 'percentage_discount',
    FIXED_AMOUNT: 'fixed_amount',
    BUY_X_GET_Y: 'buy_x_get_y_discount',
    FREE_SHIPPING: 'free_shipping',
    FREE_PRODUCT: 'free_product',
    COUPON_CODE: 'coupon_code'
  } as const

  export const OPERATORS = {
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than',
    GREATER_THAN_EQUALS: 'greater_than_equals',
    LESS_THAN_EQUALS: 'less_than_equals',
    IN: 'in',
    NOT_IN: 'not_in'
  } as const

  export const websites = [
    { id: "bf373229-9fa3-4f86-97b3-fc5bef6a5d28", name: "Main Website" },
    { id: "7f8e9d2a-bc3d-4e5f-a6g7-h8i9j0k1l2m3", name: "Secondary Website" },
  ]

  export const customerGroups = [
    { id: "6b1372a1-1e65-4a24-859d-683c3b4d1bc0", name: "General" },
    { id: "9c2483b2-2f76-5b35-96ae-794d5e6f8c1d", name: "VIP" },
  ]

  export const products = [
    { id: 1, sku: "PROD-001", name: "Ergonomic Desk Chair" },
    { id: 2, sku: "PROD-002", name: "Wireless Keyboard" },
    { id: 3, sku: "PROD-003", name: "27-inch 4K Monitor" },
    { id: 4, sku: "PROD-004", name: "Noise-Cancelling Headphones" },
    { id: 5, sku: "PROD-005", name: "Ergonomic Mouse" },
  ]