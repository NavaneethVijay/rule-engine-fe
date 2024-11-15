"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Home,
  ShoppingCart,
  Package,
  Users,
  BarChart,
  Settings,
  Trash2,
  Pencil,
} from "lucide-react";
import { CONDITION_TYPES, ACTION_TYPES, OPERATORS } from "@/lib/constants";
import { Rule, Condition, Action } from "@/types/rule";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/sidebar";
import { websites, customerGroups } from "@/lib/sample-data";
import RulesConfiguration from "@/components/rules/RulesConfiguration";
import {AdditionalSettings} from "@/components/rules/AdditionalSettings";
import { BasicInformation } from "@/components/rules/BasicInformation";

function RuleForm({
  rule,
  onSave,
  onCancel,
}: {
  rule: Rule | null;
  onSave: (rule: Rule) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Rule>(
    rule || {
      id: "",
      description: "",
      priority: 1,
      allowStacking: true,
      websiteId: "",
      customerGroupId: "",
      conditions: [
        {
          type: "SKU",
          value: "",
          operator: "in",
          itemIds: [],
          metadata: {
            target_skus: []
          }
        },
      ],
      actions: [
        {
          type: "percentage_discount",
          value: 0,
          target: "total",
          itemIds: [],
          maximumDiscount: 100
        },
      ],
    }
  );

  const handleChange = (field: keyof Rule, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleConditionChange = (
    index: number,
    field: keyof Condition,
    value: any
  ) => {
    const newConditions = [...formData.conditions];
    if (field === 'value' && newConditions[index].type === 'SKU') {
      // For SKU conditions, update both value and itemIds
      const skuValues = value.split(',').map(s => s.trim());
      newConditions[index] = {
        ...newConditions[index],
        value,
        itemIds: skuValues,
        metadata: {
          target_skus: skuValues
        }
      };
    } else {
      newConditions[index] = { ...newConditions[index], [field]: value };
    }
    setFormData({ ...formData, conditions: newConditions });
  };

  const addCondition = () => {
    setFormData({
      ...formData,
      conditions: [
        ...formData.conditions,
        {
          type: "SKU",
          value: "",
          operator: "in",
          itemIds: [],
          metadata: {
            target_skus: []
          }
        },
      ],
    });
  };

  const handleActionTypeChange = (value: string) => {
    const newActions = [...formData.actions];
    newActions[0] = {
      type: value,
      value: 0,
      target: "total",
      itemIds: [],
      maximumDiscount: 100
    };
    setFormData({ ...formData, actions: newActions });
  };

  const handleActionValueChange = (value: number) => {
    const newActions = [...formData.actions];
    newActions[0] = {
      ...newActions[0],
      value: value
    };
    setFormData({ ...formData, actions: newActions });
  };

  // Add a new handler for action item IDs
  const handleActionItemIdsChange = (value: string) => {
    const newActions = [...formData.actions];
    const itemIds = value.split(',').map(s => s.trim());
    newActions[0] = {
      ...newActions[0],
      itemIds
    };
    setFormData({ ...formData, actions: newActions });
  };

  const removeCondition = (index: number) => {
    setFormData({
      ...formData,
      conditions: formData.conditions.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="grid gap-4 py-2">
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Basic Information</h3>
        <BasicInformation formData={formData} handleChange={handleChange} />
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Rules Configuration</h3>
        <RulesConfiguration
          formData={formData}
          handleConditionChange={handleConditionChange}
          handleActionTypeChange={handleActionTypeChange}
          handleActionValueChange={handleActionValueChange}
          handleActionItemIdsChange={handleActionItemIdsChange}
          addCondition={addCondition}
          removeCondition={removeCondition}
          setFormData={setFormData}
        />
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Additional Settings</h3>
        <AdditionalSettings formData={formData} handleChange={handleChange} />
      </div>

      <div className="flex justify-end gap-4">
        <Button onClick={onCancel} variant="outline">Cancel</Button>
        <Button onClick={() => onSave(formData)}>Save</Button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await fetch('/api/rules/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            websiteId: "bf373229-9fa3-4f86-97b3-fc5bef6a5d28",
            customerGroupId: "6b1372a1-1e65-4a24-859d-683c3b4d1bc0"
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch rules');
        }

        const data = await response.json();
        setRules(data.rules);
      } catch (error) {
        console.error('Error fetching rules:', error);
        // Optionally add error state handling here
      } finally {
        setIsLoading(false);
      }
    };

    fetchRules();
  }, []);

  const addRule = (newRule: Rule) => {
    setRules([...rules, { ...newRule, id: (rules.length + 1).toString() }]);
    console.log(JSON.stringify(newRule, null, 2));
    setIsDialogOpen(false);
  };

  const editRule = (updatedRule: Rule) => {
    setRules(
      rules.map((rule) => (rule.id === updatedRule.id ? updatedRule : rule))
    );
    setIsDialogOpen(false);
    setEditingRule(null);
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const formatActionDisplay = (action: Action) => {
    switch (action.type) {
      case 'percentage_discount':
        return `${action.value}% off${action.itemIds?.length ? ` on ${action.itemIds.join(', ')}` : ''}`;
      case 'fixed_amount':
        return `$${action.value} off${action.itemIds?.length ? ` on ${action.itemIds.join(', ')}` : ''}`;
      case 'free_shipping':
        return "Free Shipping";
      default:
        return "Unknown discount type";
    }
  };

  const formatConditionDisplay = (condition: Condition) => {
    const operatorDisplay = {
      'in': 'in',
      'not_in': 'not in',
      'equals': '=',
      'greater_than': '>',
      'less_than': '<',
    };

    switch (condition.type) {
      case 'SKU':
        return `SKU ${operatorDisplay[condition.operator]} ${condition.itemIds?.join(', ')}`;
      case 'CART_SUBTOTAL':
        return `Cart Total ${operatorDisplay[condition.operator]} $${condition.value}`;
      case 'QUANTITY':
        return `Quantity ${operatorDisplay[condition.operator]} ${condition.value}`;
      default:
        return "Unknown condition";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarProvider className="w-64">
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Cart Price Rules</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingRule(null)}>
                <Plus className="mr-2 h-4 w-4" /> Add New Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90%] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingRule ? "Edit Rule" : "Create New Rule"}
                </DialogTitle>
                <DialogDescription>
                  {editingRule
                    ? "Modify the existing rule details below."
                    : "Set up a new cart price rule with the form below."}
                </DialogDescription>
              </DialogHeader>
              <RuleForm
                rule={editingRule}
                onSave={editingRule ? editRule : addRule}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingRule(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center">Loading rules...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Conditions</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Customer Group</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Stacking</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">
                      {rule.description}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {rule.conditions.map((condition, index) => (
                          <div key={index} className="text-sm">
                            {formatConditionDisplay(condition)}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {rule.actions.map((action, index) => (
                        <div key={index} className="text-sm">
                          {formatActionDisplay(action)}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {websites.find((w) => w.id === rule.websiteId)?.name}
                    </TableCell>
                    <TableCell>
                      {customerGroups.find((g) => g.id === rule.customerGroupId)?.name}
                    </TableCell>
                    <TableCell>{rule.priority}</TableCell>
                    <TableCell>{rule.allowStacking ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingRule(rule);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteRule(rule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
}
