"use client";

import * as React from "react";
import { CalendarIcon, Check, ChevronRight, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Rule } from "@/types/rule";
import { ACTION_TYPES, CONDITION_TYPES, OPERATORS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { ProductSelector } from "@/components/product-selector";
import { Product } from "@/components/product-selector/types";

type Website = {
  website_id: string;
  name: string;
  url: string;
  created_at: string;
};

type CustomerGroup = {
  customer_group_id: string;
  name: string;
  description: string;
  created_at: string;
};

export default function DiscountRulesForm() {
  const [conditions, setConditions] = useState([{ id: 1 }]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [actionType, setActionType] = useState("discount_percentage");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFreeProducts, setSelectedFreeProducts] = useState<Product[]>([]);

  const router = useRouter();

  const [formData, setFormData] = useState<Rule>({
    description: "",
    priority: 1,
    allowStacking: true,
    websiteId: "",
    customerGroupId: "",
    isActive: true,
    conditions: [
      {
        type: "SKU",
        value: "",
        operator: "in",
        itemId: [],
        metadata: {
          target_skus: [],
        },
      },
    ],
    actions: [
      {
        type: "percentage_discount",
        value: 0,
        target: "total",
        maximumDiscount: 100,
      },
    ],
  });

  const [websites, setWebsites] = useState<Website[]>([]);
  const [customerGroups, setCustomerGroups] = useState<CustomerGroup[]>([]);

  React.useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/config");
        const result = await response.json();
        if (result.success) {
          setWebsites(result.data.websites);
          setCustomerGroups(result.data.customerGroups);
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    fetchConfig();
  }, []);

  const addCondition = () => {
    const newId = conditions.length + 1;
    setConditions([...conditions, { id: newId }]);

    // Also update the formData conditions
    setFormData((prev) => ({
      ...prev,
      conditions: [
        ...prev.conditions,
        {
          type: "SKU",
          value: "",
          operator: "in",
          itemId: [],
          metadata: {
            target_skus: [],
          },
        },
      ],
    }));
  };

  const removeCondition = (id: number) => {
    setConditions(conditions.filter((condition) => condition.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setIsLoading(true);
    await fetch("/api/rules/create", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    router.push("/dashboard/cart-rules");
  };

  const updateFormData = (field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update condition handler
  const updateCondition = (index: number, field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.map((condition, i) =>
        i === index ? { ...condition, [field]: value } : condition
      ),
    }));
  };

  // Update action handler
  const updateAction = (field: string, value: unknown) => {
    if (field === "metadata") {
      const { freeProductSkus } = value as { freeProductSkus: Product[] };
      setSelectedFreeProducts(freeProductSkus);
    }
    setFormData((prev) => ({
      ...prev,
      actions: [{ ...prev.actions[0], [field]: value }],
    }));
  };

  // Add this state for managing selected products per condition
  const [conditionProducts, setConditionProducts] = useState<{
    [key: number]: Product[];
  }>({});

  // Add this function to handle product selection for conditions
  const handleConditionProductChange = (index: number, products: Product[]) => {
    setConditionProducts((prev) => ({
      ...prev,
      [index]: products,
    }));

    // Update the condition with the SKUs from selected products
    const skus = products.map((p) => p.sku);
    updateCondition(index, "value", skus.join(","));
    updateCondition(index, "metadata", { target_skus: skus });
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/cart-rules">
              Cart Rules
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Add New Rule</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <form
        onSubmit={handleSubmit}
        className="container mx-auto py-6 max-w-[1000px]"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Create discount rule</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Set up a new discount rule for your store
            </p>
          </div>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Basic settings for your discount rule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="status">Status</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable or disable this discount rule
                  </div>
                </div>
                <Switch
                  id="status"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    updateFormData("isActive", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-stacking">Allow Stacking</Label>
                  <div className="text-sm text-muted-foreground">
                    Allow this discount to be combined with other discounts
                  </div>
                </div>
                <Switch
                  id="allow-stacking"
                  checked={formData.allowStacking}
                  onCheckedChange={(checked) =>
                    updateFormData("allowStacking", checked)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    updateFormData("description", e.target.value)
                  }
                  placeholder="Enter a description for this discount rule"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Eligibility</CardTitle>
              <CardDescription>
                Define who can use this discount
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Select
                    onValueChange={(value) =>
                      updateFormData("websiteId", value)
                    }
                  >
                    <SelectTrigger id="website">
                      <SelectValue placeholder="Select website" />
                    </SelectTrigger>
                    <SelectContent>
                      {websites.map((website) => (
                        <SelectItem
                          key={website.website_id}
                          value={website.website_id}
                        >
                          {website.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-group">Customer Group</Label>
                  <Select
                    onValueChange={(value) =>
                      updateFormData("customerGroupId", value)
                    }
                  >
                    <SelectTrigger id="customer-group">
                      <SelectValue placeholder="Select customer group" />
                    </SelectTrigger>
                    <SelectContent>
                      {customerGroups.map((group) => (
                        <SelectItem
                          key={group.customer_group_id}
                          value={group.customer_group_id}
                        >
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Active Dates</Label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="start-date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span>Start date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="end-date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, "PPP")
                        ) : (
                          <span>End date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conditions</CardTitle>
              <CardDescription>
                Define when this discount should be applied
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {conditions.map((condition, index) => (
                <div
                  key={condition.id}
                  className="grid gap-4 sm:grid-cols-3 items-start"
                >
                  <Select
                    defaultValue="sku"
                    onValueChange={(value) =>
                      updateCondition(index, "type", value)
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
                    onValueChange={(value) =>
                      updateCondition(index, "operator", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select operator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={OPERATORS.IN}>In</SelectItem>
                      <SelectItem value={OPERATORS.NOT_IN}>Not In</SelectItem>
                      <SelectItem value={OPERATORS.EQUALS}>Equals</SelectItem>
                      <SelectItem value={OPERATORS.NOT_EQUALS}>
                        Not Equals
                      </SelectItem>
                      <SelectItem value={OPERATORS.GREATER_THAN}>
                        Greater Than
                      </SelectItem>
                      <SelectItem value={OPERATORS.LESS_THAN}>
                        Less Than
                      </SelectItem>
                      <SelectItem value={OPERATORS.GREATER_THAN_EQUALS}>
                        Greater Than or Equal
                      </SelectItem>
                      <SelectItem value={OPERATORS.LESS_THAN_EQUALS}>
                        Less Than or Equal
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    {formData.conditions[index]?.type ===
                    CONDITION_TYPES.SKU ? (
                      <div className="flex-1">
                        <ProductSelector
                          selectedProducts={conditionProducts[index] || []}
                          onSelectionChange={(products) =>
                            handleConditionProductChange(index, products)
                          }
                          title="Select Products"
                          triggerButtonLabel="Select products"
                        />
                      </div>
                    ) : (
                      <Input
                        placeholder="Enter value"
                        onChange={(e) =>
                          updateCondition(index, "value", e.target.value)
                        }
                        value={formData.conditions[index]?.value || ""}
                      />
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeCondition(condition.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addCondition}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Condition
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Discount Settings</CardTitle>
              <CardDescription>
                Configure how the discount will be applied
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="action-type">Action Type</Label>
                <Select
                  defaultValue="discount_percentage"
                  onValueChange={(value) => {
                    setActionType(value);
                    updateAction("type", value);
                  }}
                >
                  <SelectTrigger id="action-type">
                    <SelectValue placeholder="Select action type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ACTION_TYPES.PERCENTAGE_DISCOUNT}>
                      Percentage Discount
                    </SelectItem>
                    <SelectItem value={ACTION_TYPES.FIXED_AMOUNT}>
                      Fixed Amount
                    </SelectItem>
                    <SelectItem value={ACTION_TYPES.FREE_SHIPPING}>
                      Free Shipping
                    </SelectItem>
                    <SelectItem value={ACTION_TYPES.FREE_PRODUCT}>
                      Add free products
                    </SelectItem>
                    {/* <SelectItem value={ACTION_TYPES.BUY_X_GET_Y}>
                        Buy X Get Y
                      </SelectItem>
                      <SelectItem value={ACTION_TYPES.COUPON_CODE}>
                        Coupon Code
                      </SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
              {(actionType === ACTION_TYPES.PERCENTAGE_DISCOUNT ||
                actionType === ACTION_TYPES.FIXED_AMOUNT) && (
                <div className="space-y-2">
                  <Label>Discount Target</Label>
                  <RadioGroup
                    defaultValue="cart"
                    onValueChange={(value) => updateAction("target", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cart" id="target-cart" />
                      <Label htmlFor="target-cart">Cart level</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="item" id="target-item" />
                      <Label htmlFor="target-item">Item level</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
              {actionType === ACTION_TYPES.PERCENTAGE_DISCOUNT && (
                <div className="space-y-2">
                  <Label htmlFor="discount-percentage">
                    Discount Percentage
                  </Label>
                  <div className="relative">
                    <Input
                      id="discount-percentage"
                      type="text"
                      placeholder="0"
                      className="pl-8"
                      value={formData.actions[0]?.value || ""}
                      onChange={(e) =>
                        updateAction("value", parseFloat(e.target.value))
                      }
                    />
                    <span className="absolute left-3 top-2 text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>
              )}

              {actionType === ACTION_TYPES.FIXED_AMOUNT && (
                <div className="space-y-2">
                  <Label htmlFor="fixed-amount">Fixed Amount</Label>
                  <div className="relative">
                    <Input
                      id="fixed-amount"
                      type="text"
                      placeholder="0.00"
                      className="pl-6"
                      onChange={(e) =>
                        updateAction("value", parseFloat(e.target.value))
                      }
                    />
                    <span className="absolute left-3 top-2 text-muted-foreground">
                      $
                    </span>
                  </div>
                </div>
              )}

              {actionType === ACTION_TYPES.COUPON_CODE && (
                <div className="space-y-2">
                  <Label htmlFor="coupon-code">Coupon Code</Label>
                  <Input id="coupon-code" type="text" placeholder="SHJAP192" />
                </div>
              )}

              {actionType === ACTION_TYPES.FREE_PRODUCT && (
                <div className="space-y-2">
                  <Label htmlFor="free-products">Free Products</Label>
                  <ProductSelector
                    selectedProducts={selectedFreeProducts}
                    onSelectionChange={(products) =>
                      updateAction("metadata", { freeProductSkus: products.map((p) => p.sku) })
                    }
                    title="Select Free Products"
                    triggerButtonLabel="Select products to give away"
                  />
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Usage Limits</CardTitle>
              <CardDescription>
                Set restrictions on how the discount can be used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Input
                    id="priority"
                    type="text"
                    value={formData.priority}
                    onChange={(e) =>
                      updateFormData("priority", parseInt(e.target.value))
                    }
                    defaultValue="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-discount">Maximum Discount Amount</Label>
                  <Input id="max-discount" type="text" placeholder="0.00" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="usage-per-customer">
                    Usage Limit Per Customer
                  </Label>
                  <Input id="usage-per-customer" type="text" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total-usage">Total Usage Limit</Label>
                  <Input id="total-usage" type="text" placeholder="0" />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Save Rule</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
