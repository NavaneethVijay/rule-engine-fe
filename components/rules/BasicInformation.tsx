import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { websites, customerGroups } from "@/lib/sample-data";
import { Rule } from "@/types/rule";
import { Switch } from "../ui/switch";

interface BasicInformationProps {
  formData: Rule;
  handleChange: (field: keyof Rule, value: any) => void;
}

export function BasicInformation({
  formData,
  handleChange,
}: BasicInformationProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="isActive" className="text-right">
          Status
        </Label>
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => handleChange("isActive", checked)}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="allow-stacking" className="text-right">
          Allow Stacking
        </Label>
        <Switch
          id="allow-stacking"
          checked={formData.allowStacking}
          onCheckedChange={(checked) => handleChange("allowStacking", checked)}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="website" className="text-right">
          Website
        </Label>
        <Select
          value={formData.websiteId}
          onValueChange={(value) => handleChange("websiteId", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select website" />
          </SelectTrigger>
          <SelectContent>
            {websites.map((website) => (
              <SelectItem key={website.id} value={website.id}>
                {website.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="customerGroup" className="text-right">
          Customer Group
        </Label>
        <Select
          value={formData.customerGroupId}
          onValueChange={(value) => handleChange("customerGroupId", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select customer group" />
          </SelectTrigger>
          <SelectContent>
            {customerGroups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Date Range</Label>
        <div className="col-span-3 grid grid-cols-2 gap-4">
          <Input
            type="date"
            value={formData.start_date}
            onChange={(e) => handleChange("start_date", e.target.value)}
          />
          <Input
            type="date"
            value={formData.end_date}
            onChange={(e) => handleChange("end_date", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
