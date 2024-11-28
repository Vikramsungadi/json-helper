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
    <Card className="sticky bottom-2 p-2 mt-4 ">
      {/* Checkbox from ShadCN */}

      <CardHeader className="p-2 flex flex-row justify-between items-center w-full">
        <CardTitle>Path</CardTitle>
        <div>
          <Checkbox
            checked={isChecked}
            onCheckedChange={handleCheckboxChange} // Update state when checkbox is clicked
            className="h-5 w-5"
          />
          <label className="text-xs">{name}</label>
        </div>
      </CardHeader>
      <CardContent onClick={handleCopy} className="cursor-copy p-2">
        <code className="text-sm text-gray-800">
          {getFormattedPath(path) || "Click on a key to view its path"}
        </code>
      </CardContent>
    </Card>
  );
};

export default AccessorDisplay;
