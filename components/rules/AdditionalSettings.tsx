import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Rule } from "@/types/rule";

interface AdditionalSettingsProps {
  formData: Rule;
  handleChange: (field: keyof Rule, value: any) => void;
}

export function AdditionalSettings({
  formData,
  handleChange,
}: AdditionalSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="priority" className="text-right">
          Priority
        </Label>
        <Input
          id="priority"
          type="number"
          value={formData.priority}
          onChange={(e) => handleChange("priority", parseInt(e.target.value))}
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="maximumDiscountAmount" className="text-right">
          Maximum Discount Amount
        </Label>
        <Input
          id="maximumDiscountAmount"
          type="number"
          value={formData.maximumDiscountAmount}
          onChange={(e) => handleChange("maximumDiscountAmount", Number(e.target.value))}
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="usageLimitPerCustomer" className="text-right">
          Usage Limit Per Customer
        </Label>
        <Input
          id="usageLimitPerCustomer"
          type="number"
          value={formData.usageLimitPerCustomer}
          onChange={(e) => handleChange("usageLimitPerCustomer", Number(e.target.value))}
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="totalUsageLimit" className="text-right">
          Total Usage Limit
        </Label>
        <Input
          id="totalUsageLimit"
          type="number"
          value={formData.totalUsageLimit}
          onChange={(e) => handleChange("totalUsageLimit", Number(e.target.value))}
          className="col-span-3"
        />
      </div>
    </div>
  );
}