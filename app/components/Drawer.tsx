import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; // ShadCN Dialog
import { Heart, PinIcon, Trash2 } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
interface DrawerProps {
  favorites: { id: string; name: string; data: any; pinned: boolean }[];
  onFavoriteClick: (favoriteData: any) => void; // Handler passed from HomePage
  handlePinToggle: (favoriteData: any) => void; // Handler passed from HomePage
  handleDeleteFavorite: (favoriteData: any) => void; // Handler passed from HomePage
}

const Drawer: React.FC<DrawerProps> = ({
  favorites,
  onFavoriteClick,
  handlePinToggle,
  handleDeleteFavorite,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="text-xl font-bold hover:opacity-100 transition-opacity opacity-70 p-2 rounded">
          <Heart size={20} className="text-red-400" />
        </DialogTrigger>
        <DialogContent className="w-1/3 overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle>Favorites</DialogTitle>
          </DialogHeader>
          <ul className="mt-4 space-y-2">
            {favorites.length > 0 ? (
              favorites.map((favorite, index) => (
                <li
                  key={index}
                  className="flex justify-between cursor-pointer items-center hover:border-white border border-white/50  rounded-sm p-2"
                >
                  <PinIcon
                    size={15}
                    className={twMerge(
                      "text-yellow-500  cursor-pointer mr-2",
                      favorite.pinned && "fill-yellow-500"
                    )}
                    onClick={() => handlePinToggle(favorite.id)} // Toggle pin status
                  />
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      setIsOpen(false);
                      onFavoriteClick(favorite.data);
                    }} // Call the handler
                  >
                    {favorite.name}
                  </Button>
                  <Trash2
                    onClick={() => handleDeleteFavorite(favorite.id)}
                    size={15}
                    className="transition-colors ml-auto text-red-400 hover:text-red-600 mr-3"
                  />
                </li>
              ))
            ) : (
              <li>No favorites saved yet</li>
            )}
          </ul>
          <DialogFooter>
            <DialogClose className="bg-red-500 text-white py-2 px-4 rounded">
              Close
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Drawer;
