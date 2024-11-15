import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { CONDITION_TYPES, ACTION_TYPES, OPERATORS } from "@/lib/constants";
import { Rule, Condition } from "@/types/rule";
import { products } from "@/lib/sample-data";

interface RulesConfigurationProps {
  formData: Rule;
  handleConditionChange: (index: number, field: keyof Condition, value: any) => void;
  handleActionTypeChange: (value: string) => void;
  handleActionValueChange: (value: number) => void;
  addCondition: () => void;
  removeCondition: (index: number) => void;
  setFormData: (data: Rule) => void;
}

export function RulesConfiguration({
  formData,
  handleConditionChange,
  handleActionTypeChange,
  handleActionValueChange,
  addCondition,
  removeCondition,
  setFormData,
}: RulesConfigurationProps) {
  return (
    <div className="space-y-4">
      {/* Reference the Conditions section */}
      <div className="space-y-4">
        {formData.conditions.map((condition, index) => (
          <div key={index} className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Condition {index + 1}</Label>
            <div className="col-span-3 grid grid-cols-3 gap-4">
              <Select
                value={condition.type}
                onValueChange={(value) =>
                  handleConditionChange(index, "condition_type_id", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={CONDITION_TYPES.SKU}>SKU</SelectItem>
                  <SelectItem value={CONDITION_TYPES.CART_SUBTOTAL}>
                    Cart Subtotal
                  </SelectItem>
                  <SelectItem value={CONDITION_TYPES.QUANTITY_IN_CART}>
                    Quantity in Cart
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={condition.operator}
                onValueChange={(value) =>
                  handleConditionChange(index, "operator", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={OPERATORS.EQUALS}>Equals</SelectItem>
                  <SelectItem value={OPERATORS.NOT_EQUALS}>Not Equals</SelectItem>
                  <SelectItem value={OPERATORS.GREATER_THAN}>
                    Greater Than
                  </SelectItem>
                  <SelectItem value={OPERATORS.LESS_THAN}>Less Than</SelectItem>
                  <SelectItem value={OPERATORS.GREATER_THAN_EQUALS}>
                    Greater Than or Equal
                  </SelectItem>
                  <SelectItem value={OPERATORS.LESS_THAN_EQUALS}>
                    Less Than or Equal
                  </SelectItem>
                </SelectContent>
              </Select>

              {condition.type === CONDITION_TYPES.SKU ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {condition.value || "Select SKU"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Command>
                      <CommandInput placeholder="Search SKU..." />
                      <CommandEmpty>No SKU found.</CommandEmpty>
                      <CommandGroup>
                        {products.map((product) => (
                          <CommandItem
                            key={product.id}
                            onSelect={() =>
                              handleConditionChange(index, "value", product.sku)
                            }
                          >
                            {product.sku} - {product.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              ) : null }
            </div>
            <Button
              variant="destructive"
              onClick={() => removeCondition(index)}
              className="col-start-4"
            >
              Remove
            </Button>
          </div>
        ))}

        <Button onClick={addCondition} variant="default" className="w-auto">
          Add Condition
        </Button>
      </div>

      {/* Reference the Actions section */}
      <div className="space-y-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Action Type</Label>
          <Select
            value={formData.actions[0].type}
            onValueChange={handleActionTypeChange}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select action type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ACTION_TYPES.PERCENTAGE_DISCOUNT}>
                Percentage Discount
              </SelectItem>
              <SelectItem value={ACTION_TYPES.FIXED_AMOUNT}>
                Fixed Amount
              </SelectItem>
              <SelectItem value={ACTION_TYPES.BUY_X_GET_Y}>
                Buy X Get Y
              </SelectItem>
              <SelectItem value={ACTION_TYPES.FREE_SHIPPING}>
                Free Shipping
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.actions[0].type !== ACTION_TYPES.FREE_SHIPPING && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              {formData.actions[0].type ===
              ACTION_TYPES.PERCENTAGE_DISCOUNT
                ? "Discount Percentage"
                : formData.actions[0].type === ACTION_TYPES.FIXED_AMOUNT
                ? "Discount Amount"
                : "Discount Value"}
            </Label>
            <Input
              type="number"
              value={formData.actions[0].type}
              onChange={(e) => handleActionValueChange(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
        )}

        {formData.actions[0].type === ACTION_TYPES.BUY_X_GET_Y && (
          <>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Buy Products (SKUs)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="col-span-2">
                    Select Products
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder="Search products..." />
                    <CommandEmpty>No products found.</CommandEmpty>
                    <CommandGroup>
                      {products.map((product) => (
                        <CommandItem
                          key={product.id}
                          onSelect={() => {
                            const newActions = [...formData.actions];
                            newActions[0].buy_x_skus = [
                              ...(newActions[0].buy_x_skus || []),
                              product.sku,
                            ];
                            setFormData({ ...formData, actions: newActions });
                          }}
                        >
                          {product.sku} - {product.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Get Products (SKUs)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="col-span-2">
                    Select Products
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder="Search products..." />
                    <CommandEmpty>No products found.</CommandEmpty>
                    <CommandGroup>
                      {products.map((product) => (
                        <CommandItem
                          key={product.id}
                          onSelect={() => {
                            const newActions = [...formData.actions];
                            newActions[0].get_y_skus = [
                              ...(newActions[0].get_y_skus || []),
                              product.sku,
                            ];
                            setFormData({ ...formData, actions: newActions });
                          }}
                        >
                          {product.sku} - {product.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default RulesConfiguration;