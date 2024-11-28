import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import React from "react";

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
  formattedJSON: string;
}

const RightPanel: React.FC<RightPanelProps> = ({
  isOpen,
  onClose,
  formattedJSON,
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent translate="yes" className="w-96 p-4">
        <DrawerClose />
        <h2 className="text-lg font-bold mb-4">Formatted JSON</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
          {formattedJSON || "No JSON to display"}
        </pre>
      </DrawerContent>
    </Drawer>
  );
};

export default RightPanel;
