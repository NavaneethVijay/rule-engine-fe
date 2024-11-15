"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, RotateCw } from "lucide-react";

export type Product = {
  id: number;
  sku: string;
  name: string;
  price: number;
  website_id: string;
  lastSync?: Date;
  syncStatus: "synced" | "pending" | "failed";
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "sku",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SKU
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return `$${price.toFixed(2)}`;
    },
  },
  {
    accessorKey: "website_id",
    header: () => {
      return <Button variant="ghost">Website ID</Button>;
    },
    cell: ({ row }) => {
      const websiteId = row.getValue("website_id");
      return websiteId;
    },
  },
  {
    accessorKey: "syncStatus",
    header: "Sync Status",
    cell: ({ row }) => {
      const status = row.getValue("syncStatus") as string;
      return (
        <div
          className={`capitalize ${
            status === "synced"
              ? "text-green-600"
              : status === "failed"
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "lastSync",
    header: "Last Sync",
    cell: ({ row }) => {
      const date = row.getValue("lastSync") as Date;
      return date ? date.toLocaleString() : "Never";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            // Handle sync action
            console.log("Sync clicked for row", row.original);
          }}
        >
          <RotateCw className="h-4 w-4" />
        </Button>
      );
    },
  },
];
