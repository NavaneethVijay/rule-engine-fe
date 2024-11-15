"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Save, Plus, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CustomerGroup = {
  customer_group_id: string;
  name: string;
  description: string;
  created_at: string;
};

export default function CustomerGroupsPage() {
  const [customerGroups, setCustomerGroups] = useState<CustomerGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/config");
        const result = await response.json();
        if (result.success) {
          setCustomerGroups(result.data.customerGroups);
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);


  const addNewCustomerGroup = () => {
    const newGroup: CustomerGroup = {
      customer_group_id: crypto.randomUUID(),
      name: "",
      description: "",
      created_at: new Date().toISOString(),
    };
    setCustomerGroups([...customerGroups, newGroup]);
    console.log("Added new customer group:", newGroup);
  };


  const updateCustomerGroup = (
    id: string,
    field: keyof CustomerGroup,
    value: string
  ) => {
    setCustomerGroups(
      customerGroups.map((group) =>
        group.customer_group_id === id ? { ...group, [field]: value } : group
      )
    );
  };

  const deleteCustomerGroup = (id: string) => {
    const groupToDelete = customerGroups.find(g => g.customer_group_id === id);
    setCustomerGroups(customerGroups.filter((group) => group.customer_group_id !== id));
    console.log("Deleted customer group:", groupToDelete);
  };

  const saveChanges = (type) => {
      console.log("Saving customer groups:", customerGroups);
  };


  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Customer Groups</CardTitle>
        <CardDescription>Manage customer group configurations</CardDescription>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => saveChanges("customerGroups")} size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
        <Button onClick={addNewCustomerGroup} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Group
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customerGroups.map((group) => (
            <TableRow key={group.customer_group_id}>
              <TableCell>{group.customer_group_id}</TableCell>
              <TableCell>
                <Input
                  value={group.name}
                  onChange={(e) =>
                    updateCustomerGroup(
                      group.customer_group_id,
                      "name",
                      e.target.value
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  value={group.description}
                  onChange={(e) =>
                    updateCustomerGroup(
                      group.customer_group_id,
                      "description",
                      e.target.value
                    )
                  }
                />
              </TableCell>
              <TableCell>
                {new Date(group.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteCustomerGroup(group.customer_group_id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
  )
}
