import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Check, Plus, X } from "lucide-react";
import { Product, ProductSelectorProps } from './types';

// Default sample data - can be overridden via props
const DEFAULT_SAMPLE_PRODUCTS = [
  { id: "1", name: "Blue T-Shirt", sku: "BTS-001" },
  { id: "2", name: "Red Hoodie", sku: "RH-002" },
  { id: "3", name: "Black Jeans", sku: "BJ-003" },
  { id: "4", name: "White Sneakers", sku: "WS-004" },
  { id: "5", name: "Gray Backpack", sku: "GB-005" },
  { id: "6", name: "Denim Jacket", sku: "DJ-006" },
  { id: "7", name: "Running Shoes", sku: "RS-007" },
  { id: "8", name: "Winter Coat", sku: "WC-008" },
];

export function ProductSelector({
  selectedProducts,
  onSelectionChange,
  title = "Select Products",
  triggerButtonLabel = "Select products",
  sampleData = DEFAULT_SAMPLE_PRODUCTS,
  maxHeight = "150px",
  showSelectedProducts = true,
}: ProductSelectorProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempSelectedProducts, setTempSelectedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  return (
    <div className="space-y-2">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => {
              setTempSelectedProducts(selectedProducts);
              setDialogOpen(true);
            }}
          >
            {triggerButtonLabel}
            <Plus className="h-4 w-4 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                const query = e.target.value.toLowerCase();
                const filtered = sampleData.filter(
                  product =>
                    product.name.toLowerCase().includes(query) ||
                    product.sku.toLowerCase().includes(query)
                );
                setSearchResults(filtered);
              }}
            />
            <ScrollArea className="h-[300px] border rounded-md p-2">
              {(searchQuery ? searchResults : sampleData).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => {
                    setTempSelectedProducts((prev) =>
                      prev.some((p) => p.id === product.id)
                        ? prev.filter((p) => p.id !== product.id)
                        : [...prev, product]
                    );
                  }}
                >
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      SKU: {product.sku}
                    </div>
                  </div>
                  {tempSelectedProducts.some((p) => p.id === product.id) && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                setTempSelectedProducts(selectedProducts);
                setSearchQuery("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                onSelectionChange(tempSelectedProducts);
                setDialogOpen(false);
                setSearchQuery("");
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showSelectedProducts && selectedProducts.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="text-sm font-medium">Selected Products</div>
          <ScrollArea className="border rounded-md p-2" style={{ height: maxHeight }}>
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-2 hover:bg-muted rounded-md"
              >
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-muted-foreground">
                    SKU: {product.sku}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelectionChange(
                    selectedProducts.filter((p) => p.id !== product.id)
                  )}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
