"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { websites, customerGroups } from "@/lib/constants";
import { formatActionDisplay } from "@/lib/formatters";
import { Rule } from "@/types/rule";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CartRules() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingRuleId, setDeletingRuleId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await fetch("/api/rules/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            websiteId: "bf373229-9fa3-4f86-97b3-fc5bef6a5d28",
            customerGroupId: "6b1372a1-1e65-4a24-859d-683c3b4d1bc0",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch rules");
        }

        const data = await response.json();
        setRules(data.rules);
      } catch (error) {
        console.error("Error fetching rules:", error);
        // Optionally add error state handling here
      } finally {
        setIsLoading(false);
      }
    };

    fetchRules();
  }, []);

  console.log(rules);

  const handleDeleteRule = async (ruleId: string) => {
    try {
      const response = await fetch(`/api/rules/${ruleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete rule");
      }

      // Remove the rule from the local state
      setRules(rules.filter((rule) => rule.id !== ruleId));
    } catch (error) {
      console.error("Error deleting rule:", error);
      // Optionally add error handling here (e.g., toast notification)
    } finally {
      setIsDeleteDialogOpen(false);
      setDeletingRuleId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Cart Price Rules</h1>
        <Button onClick={() => router.push("/dashboard/cart-rules/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Rule
        </Button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-4 text-center">Loading rules...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Customer Group</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Stacking</TableHead>
                <TableHead>Status</TableHead>
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
                    {
                      customerGroups.find((g) => g.id === rule.customerGroupId)
                        ?.name
                    }
                  </TableCell>
                  <TableCell>{rule.priority}</TableCell>
                  <TableCell>{rule.allowStacking ? "Yes" : "No"}</TableCell>
                  <TableCell>{rule.isActive ? "Active" : "Inactive"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        router.push(`/dashboard/cart-rules/edit/${rule.id}`)
                      }
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setDeletingRuleId(rule.id || null);
                        setIsDeleteDialogOpen(true);
                      }}
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
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected discount rule.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingRuleId && handleDeleteRule(deletingRuleId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
