"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"; // Import ShadCN Checkbox

interface AccessorDisplayProps {
  path: string;
  name?: string;
}

const AccessorDisplay: React.FC<AccessorDisplayProps> = ({ path, name }) => {
  const { toast } = useToast();
  const [isChecked, setIsChecked] = useState(true); // Checkbox state

  const handleCopy = () => {
    const selectedPath = getFormattedPath(path);
    navigator.clipboard.writeText(selectedPath).then(() => {
      toast({
        title: "Copied",
        description: `${selectedPath.slice(0, 70)}${
          selectedPath.length > 70 ? "...." : ""
        }`,
      });
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev); // Toggle checkbox state
  };

  // Function to format the path with optional chaining when checkbox is checked
  const getFormattedPath = (path: string) => {
    return isChecked ? path.replace(/\./g, "?.") : path;
  };

  return (
    <div className="relative mt-4">
      <Card className="sticky bottom-0 p-2">
        {/* Checkbox from ShadCN */}
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <Checkbox
            checked={isChecked}
            onCheckedChange={handleCheckboxChange} // Update state when checkbox is clicked
            className="h-5 w-5"
          />
          <label className="text-xs">{name}</label>
        </div>

        <CardHeader className="p-2">
          <CardTitle>Path</CardTitle>
        </CardHeader>
        <CardContent onClick={handleCopy} className="cursor-copy p-2">
          <code className="text-sm text-gray-800">
            {getFormattedPath(path) || "Click on a key to view its path"}
          </code>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessorDisplay;
