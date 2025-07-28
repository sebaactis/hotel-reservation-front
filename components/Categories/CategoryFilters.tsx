import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Categorie } from "@/types";

interface Props {
    isSelected: boolean;
    category: Categorie;
    handleCategoryChange: (categoryDescription: string, checked: boolean) => void;
}

const CategoryFilters = ({ isSelected, category, handleCategoryChange }: Props) => {
    return (
        <div key={category.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
                <Checkbox
                    id={category.id}
                    checked={isSelected}
                    onCheckedChange={(checked) => handleCategoryChange(category.description, checked as boolean)}
                    className="border-2"
                    style={{ borderColor: "#523961" }}
                />
                <Label
                    htmlFor={category.id}
                    className="flex items-center gap-2 cursor-pointer flex-1"
                    style={{ color: isSelected ? "#3B234A" : "#523961" }}
                >
                    <span className="text-sm font-medium">{category.description}</span>
                </Label>
            </div>
            <Badge
                variant="outline"
                className="text-xs"
                style={{
                    borderColor: isSelected ? "#3B234A" : "#BAAFC4",
                    color: isSelected ? "#3B234A" : "#523961",
                }}
            >
                {category.count}
            </Badge>
        </div>
    )
}

export default CategoryFilters