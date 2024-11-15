'use client'

import { useState } from 'react'
import { Plus, Home, ShoppingCart, Package, Users, BarChart, Settings, Trash2, Pencil } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

type Condition = {
  type: string;
  value: string | number;
}

type Rule = {
  id: string;
  description: string;
  conditions: Condition[];
  discountType: string;
  discountValue: number;
  freeProductSku?: string;
  priority: number;
  allowStacking: boolean;
}

const initialRules: Rule[] = [
  {
    id: "1",
    description: "10% off SKU_A",
    conditions: [{ type: "SKU", value: "SKU_A" }],
    discountType: "Percentage",
    discountValue: 10,
    priority: 1,
    allowStacking: true,
  },
  {
    id: "2",
    description: "Buy 2 SKU_B, get 1 SKU_C free",
    conditions: [
      { type: "SKU", value: "SKU_B" },
      { type: "QuantityInCart", value: 2 },
    ],
    discountType: "FreeProduct",
    discountValue: 0,
    freeProductSku: "SKU_C",
    priority: 2,
    allowStacking: false,
  },
  {
    id: "3",
    description: "$5 off orders over $50",
    conditions: [{ type: "CartSubtotal", value: 50 }],
    discountType: "FixedAmount",
    discountValue: 5,
    priority: 3,
    allowStacking: true,
  },
  {
    id: "4",
    description: "Free shipping on orders over $100",
    conditions: [{ type: "CartSubtotal", value: 100 }],
    discountType: "FreeShipping",
    discountValue: 0,
    priority: 1,
    allowStacking: true,
  }
]

function RuleForm({ rule, onSave, onCancel }: { rule: Rule | null; onSave: (rule: Rule) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<Rule>(
    rule || {
      id: "",
      description: "",
      conditions: [{ type: "SKU", value: "" }],
      discountType: "Percentage",
      discountValue: 0,
      priority: 0,
      allowStacking: false,
    }
  )

  const handleChange = (field: keyof Rule, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleConditionChange = (index: number, field: keyof Condition, value: any) => {
    const newConditions = [...formData.conditions]
    newConditions[index] = { ...newConditions[index], [field]: value }
    setFormData({ ...formData, conditions: newConditions })
  }

  const addCondition = () => {
    setFormData({
      ...formData,
      conditions: [...formData.conditions, { type: "SKU", value: "" }]
    })
  }

  const removeCondition = (index: number) => {
    const newConditions = formData.conditions.filter((_, i) => i !== index)
    setFormData({ ...formData, conditions: newConditions })
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="col-span-3"
        />
      </div>
      {formData.conditions.map((condition, index) => (
        <div key={index} className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={`condition-type-${index}`} className="text-right">Condition {index + 1}</Label>
          <Select
            value={condition.type}
            onValueChange={(value) => handleConditionChange(index, "type", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SKU">SKU</SelectItem>
              <SelectItem value="QuantityInCart">Quantity in Cart</SelectItem>
              <SelectItem value="CartSubtotal">Cart Subtotal</SelectItem>
            </SelectContent>
          </Select>
          <Input
            id={`condition-value-${index}`}
            value={condition.value}
            onChange={(e) => handleConditionChange(index, "value", e.target.value)}
            className="w-[180px]"
          />
          <Button variant="outline" onClick={() => removeCondition(index)}>Remove</Button>
        </div>
      ))}
      <Button onClick={addCondition} className="w-full">Add Condition</Button>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="discount-type" className="text-right">Discount Type</Label>
        <Select
          value={formData.discountType}
          onValueChange={(value) => handleChange("discountType", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select discount type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Percentage">Percentage</SelectItem>
            <SelectItem value="FixedAmount">Fixed Amount</SelectItem>
            <SelectItem value="FreeProduct">Free Product</SelectItem>
            <SelectItem value="FreeShipping">Free Shipping</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {formData.discountType !== "FreeShipping" && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="discount-value" className="text-right">
            {formData.discountType === "Percentage" ? "Discount Percentage" :
             formData.discountType === "FixedAmount" ? "Discount Amount" :
             "Quantity of Free Product"}
          </Label>
          <Input
            id="discount-value"
            type="number"
            value={formData.discountValue}
            onChange={(e) => handleChange("discountValue", parseFloat(e.target.value))}
            className="col-span-3"
          />
        </div>
      )}
      {formData.discountType === "FreeProduct" && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="free-product-sku" className="text-right">Free Product SKU</Label>
          <Input
            id="free-product-sku"
            value={formData.freeProductSku || ""}
            onChange={(e) => handleChange("freeProductSku", e.target.value)}
            className="col-span-3"
          />
        </div>
      )}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="priority" className="text-right">Priority</Label>
        <Input
          id="priority"
          type="number"
          value={formData.priority}
          onChange={(e) => handleChange("priority", parseInt(e.target.value))}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="allow-stacking" className="text-right">Allow Stacking</Label>
        <Switch
          id="allow-stacking"
          checked={formData.allowStacking}
          onCheckedChange={(checked) => handleChange("allowStacking", checked)}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(formData)}>Save</Button>
      </div>
    </div>
  )
}

export function DashboardComponent() {
  const [rules, setRules] = useState<Rule[]>(initialRules)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<Rule | null>(null)

  const addRule = (newRule: Rule) => {
    setRules([...rules, { ...newRule, id: (rules.length + 1).toString() }])
    setIsDialogOpen(false)
  }

  const editRule = (updatedRule: Rule) => {
    setRules(rules.map(rule => rule.id === updatedRule.id ? updatedRule : rule))
    setIsDialogOpen(false)
    setEditingRule(null)
  }

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProvider>
        <Sidebar className="w-64 bg-white">
          <SidebarHeader>
            <h2 className="text-xl font-bold p-4">E-commerce Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Cart Rules
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Package className="mr-2 h-4 w-4" />
                      Products
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Users className="mr-2 h-4 w-4" />
                      Customers
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <BarChart className="mr-2 h-4 w-4" />
                      Analytics
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
      </SidebarProvider>

      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-semibold mb-6">Cart Price Rules</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-4" onClick={() => setEditingRule(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{editingRule ? 'Edit Price Rule' : 'Add New Price Rule'}</DialogTitle>
              <DialogDescription>
                {editingRule ? 'Edit the existing cart price rule.' : 'Create a new cart price rule.'} Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <RuleForm
              rule={editingRule}
              onSave={editingRule ? editRule : addRule}
              onCancel={() => {
                setIsDialogOpen(false)
                setEditingRule(null)
              }}
            />
          </DialogContent>
        </Dialog>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Conditions</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Stacking</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.description}</TableCell>
                  <TableCell>
                    {rule.conditions.map((condition, index) => (
                      <div key={index}>
                        {condition.type}: {condition.value}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {rule.discountType === 'Percentage' && `${rule.discountValue}%`}
                    {rule.discountType === 'FixedAmount' && `$${rule.discountValue}`}
                    {rule.discountType === 'FreeProduct' && `Free ${rule.freeProductSku}`}
                    {rule.discountType === 'FreeShipping' && 'Free Shipping'}
                  </TableCell>
                  <TableCell>{rule.priority}</TableCell>
                  <TableCell>{rule.allowStacking ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => {
                      setEditingRule(rule)
                      
                      setIsDialogOpen(true)
                    }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteRule(rule.id)}>
                      <Trash2  className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}