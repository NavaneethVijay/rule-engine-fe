"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Rule } from "@/types/rule";
import RulesConfiguration from "@/components/rules/RulesConfiguration";
import { AdditionalSettings } from "@/components/rules/AdditionalSettings";
import { BasicInformation } from "@/components/rules/BasicInformation";
import { useRouter } from "next/navigation";

export default function AddCartRule() {
  const router = useRouter();
  const [formData, setFormData] = useState<Rule>({
    id: "",
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

  const handleChange = (field: keyof Rule, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleConditionChange = (
    index: number,
    field: keyof Condition,
    value: any
  ) => {
    const newConditions = [...formData.conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setFormData({ ...formData, conditions: newConditions });
  };

  const handleActionTypeChange = (value: string) => {
    const newActions = [...formData.actions];
    newActions[0] = {
      type: value,
      value: 0,
      target: "total",
      maximumDiscount: 100,
    };
    setFormData({ ...formData, actions: newActions });
  };

  const handleActionValueChange = (value: number) => {
    const newActions = [...formData.actions];
    newActions[0] = {
      ...newActions[0],
      value: value,
    };
    setFormData({ ...formData, actions: newActions });
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
          itemId: [],
          metadata: {
            target_skus: [],
          },
        },
      ],
    });
  };

  const removeCondition = (index: number) => {
    setFormData({
      ...formData,
      conditions: formData.conditions.filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/rules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save rule");
      }

      router.push("/dashboard/cart-rules");
    } catch (error) {
      console.error("Error saving rule:", error);
      // Add error handling here (e.g., show error toast)
    }
  };

  return (
    <div className="space-y-6 w-3/4 mx-auto">
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

      <div className="bg-white py-6  px-10 rounded-lg container mx-auto">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">Add New Cart Rule</h1>
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/cart-rules")}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Rule</Button>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-6">
                <BasicInformation
                  formData={formData}
                  handleChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-6">
                <AdditionalSettings
                  formData={formData}
                  handleChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-6">
                <RulesConfiguration
                formData={formData}
                handleConditionChange={handleConditionChange}
                handleActionTypeChange={handleActionTypeChange}
                handleActionValueChange={handleActionValueChange}
                addCondition={addCondition}
                removeCondition={removeCondition}
                setFormData={setFormData}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard/cart-rules")}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Rule</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
