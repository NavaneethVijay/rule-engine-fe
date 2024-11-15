'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample product data
const products = [
  { id: 1, sku: "PROD-001", name: "Ergonomic Desk Chair", price: 199.99, website_id: "MAIN-01" },
  { id: 2, sku: "PROD-002", name: "Wireless Keyboard", price: 59.99, website_id: "MAIN-01" },
  { id: 3, sku: "PROD-003", name: "27-inch 4K Monitor", price: 349.99, website_id: "MAIN-01" },
  { id: 4, sku: "PROD-004", name: "Noise-Cancelling Headphones", price: 199.99, website_id: "MAIN-01" },
  { id: 5, sku: "PROD-005", name: "Ergonomic Mouse", price: 39.99, website_id: "MAIN-01" },
]

export function ProductPageComponent() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Website ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.website_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}