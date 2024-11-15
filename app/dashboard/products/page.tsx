import { columns, Product } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample product data
const products = [
  {
    id: 1,
    sku: "PROD-001",
    name: "Ergonomic Desk Chair",
    price: 199.99,
    website_id: "MAIN-01",
    syncStatus: "failed",
    lastSync: new Date("2024-03-10T10:00:00"),
  },
  {
    id: 2,
    sku: "PROD-002",
    name: "Wireless Keyboard",
    price: 59.99,
    website_id: "MAIN-01",
    syncStatus: "pending",
    lastSync: new Date("2024-03-09T15:30:00"),
  },
  { id: 3, sku: "PROD-003", name: "27-inch 4K Monitor", price: 349.99, website_id: "MAIN-01", syncStatus: "synced", lastSync: new Date("2024-03-10T10:00:00") },
  { id: 4, sku: "PROD-004", name: "Noise-Cancelling Headphones", price: 199.99, website_id: "MAIN-01", syncStatus: "synced", lastSync: new Date("2024-03-10T10:00:00") },
  { id: 5, sku: "PROD-005", name: "Ergonomic Mouse", price: 39.99, website_id: "MAIN-01", syncStatus: "synced", lastSync: new Date("2024-03-10T10:00:00") },
]

export default function ProductPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={products as Product[]} />
        </CardContent>
      </Card>
    </div>
  )
}