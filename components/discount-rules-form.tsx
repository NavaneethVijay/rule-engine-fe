'use client'

import * as React from 'react'
import { CalendarIcon, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function DiscountRulesFormComponent() {
  const [conditions, setConditions] = React.useState([{ id: 1 }])
  const [startDate, setStartDate] = React.useState<Date>()
  const [endDate, setEndDate] = React.useState<Date>()
  const [actionType, setActionType] = React.useState("discount_percentage")

  const addCondition = () => {
    const newId = conditions.length + 1
    setConditions([...conditions, { id: newId }])
  }

  const removeCondition = (id: number) => {
    setConditions(conditions.filter(condition => condition.id !== id))
  }

  return (
    <div className="container mx-auto py-6 max-w-[1000px]">
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
            <CardDescription>Basic settings for your discount rule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="status">Status</Label>
                <div className="text-sm text-muted-foreground">
                  Enable or disable this discount rule
                </div>
              </div>
              <Switch id="status" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allow-stacking">Allow Stacking</Label>
                <div className="text-sm text-muted-foreground">
                  Allow this discount to be combined with other discounts
                </div>
              </div>
              <Switch id="allow-stacking" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter a description for this discount rule"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eligibility</CardTitle>
            <CardDescription>Define who can use this discount</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Select defaultValue="secondary">
                  <SelectTrigger id="website">
                    <SelectValue placeholder="Select website" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Website</SelectItem>
                    <SelectItem value="secondary">Secondary Website</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-group">Customer Group</Label>
                <Select defaultValue="vip">
                  <SelectTrigger id="customer-group">
                    <SelectValue placeholder="Select customer group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
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
                      {startDate ? format(startDate, "PPP") : <span>Start date</span>}
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
                      {endDate ? format(endDate, "PPP") : <span>End date</span>}
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
            <CardTitle>Usage Limits</CardTitle>
            <CardDescription>Set restrictions on how the discount can be used</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Input id="priority" type="number" defaultValue="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-discount">Maximum Discount Amount</Label>
                <Input id="max-discount" type="number" placeholder="0.00" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="usage-per-customer">Usage Limit Per Customer</Label>
                <Input id="usage-per-customer" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total-usage">Total Usage Limit</Label>
                <Input id="total-usage" type="number" placeholder="0" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conditions</CardTitle>
            <CardDescription>Define when this discount should be applied</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {conditions.map((condition) => (
              <div key={condition.id} className="grid gap-4 sm:grid-cols-3 items-start">
                <Select defaultValue="sku">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sku">SKU</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="starts-with">Starts With</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input placeholder="Enter value" />
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
            <CardDescription>Configure how the discount will be applied</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="action-type">Action Type</Label>
              <Select 
                defaultValue="discount_percentage"
                onValueChange={(value) => setActionType(value)}
              >
                <SelectTrigger id="action-type">
                  <SelectValue placeholder="Select action type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount_percentage">Discount percentage</SelectItem>
                  <SelectItem value="fixed_amount">Fixed amount</SelectItem>
                  <SelectItem value="free_shipping">Free shipping</SelectItem>
                  <SelectItem value="add_free_products">Add free products</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {actionType === 'discount_percentage' && (
              <div className="space-y-2">
                <Label htmlFor="discount-percentage">Discount Percentage</Label>
                <div className="relative">
                  <Input id="discount-percentage" type="number" placeholder="0" className="pr-8" />
                  <span className="absolute right-3 top-2 text-muted-foreground">%</span>
                </div>
              </div>
            )}
            {actionType === 'fixed_amount' && (
              <div className="space-y-2">
                <Label htmlFor="fixed-amount">Fixed Amount</Label>
                <div className="relative">
                  <Input id="fixed-amount" type="number" placeholder="0.00" className="pl-6" />
                  <span className="absolute left-3 top-2 text-muted-foreground">$</span>
                </div>
              </div>
            )}
            {actionType === 'add_free_products' && (
              <div className="space-y-2">
                <Label htmlFor="free-products">Free Products</Label>
                <Select>
                  <SelectTrigger id="free-products">
                    <SelectValue placeholder="Select free products" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product1">Product 1</SelectItem>
                    <SelectItem value="product2">Product 2</SelectItem>
                    <SelectItem value="product3">Product 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Rule</Button>
        </div>
      </div>
    </div>
  )
}