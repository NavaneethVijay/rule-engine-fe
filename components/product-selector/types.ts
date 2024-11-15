export type Product = {
  id: string;
  name: string;
  sku: string;
};

export interface ProductSelectorProps {
  selectedProducts: Product[];
  onSelectionChange: (products: Product[]) => void;
  title?: string;
  triggerButtonLabel?: string;
  sampleData?: Product[]; // Later this could be replaced with an API endpoint prop
  maxHeight?: string;
  showSelectedProducts?: boolean;
}