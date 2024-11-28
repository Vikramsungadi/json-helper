"use client";

import { useState, useEffect } from "react";
import JSONInputForm from "@/app/components/JSONInputForm";
import JSONRenderer from "@/app/components/JSONRenderer";
import AccessorDisplay from "@/app/components/AccessorDisplay";
import { Button } from "@/components/ui/button";
import Drawer from "@/app/components/Drawer"; // ShadCN Drawer
import Modal from "@/app/components/Modal"; // ShadCN Modal
import { XIcon, PinIcon, Delete } from "lucide-react"; // You can use any icon library you prefer

export default function HomePage() {
  const [jsonData, setJsonData] = useState<any | null>(null);
  const [accessorPath, setAccessorPath] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [favorites, setFavorites] = useState<
    { id: string; name: string; data: any; pinned: boolean }[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [favoriteName, setFavoriteName] = useState<string>("");
  const [recentFilters, setRecentFilters] = useState<string[]>([]);

  // Load favorites and recent filters from localStorage when the component mounts
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedFilters = localStorage.getItem("recentFilters");
    if (savedFilters) {
      setRecentFilters(JSON.parse(savedFilters));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  // Save recent filters to localStorage when the focus is out of the filter input
  useEffect(() => {
    if (filter) {
      const updatedFilters = [filter, ...recentFilters].slice(0, 20); // Keep only the last 20 filters
      localStorage.setItem("recentFilters", JSON.stringify(updatedFilters));
    }
  }, [filter]);

  const handleJSONInput = (input: string) => {
    try {
      const parsed = JSON.parse(input);
      setJsonData(parsed);
    } catch {
      alert("Invalid JSON!");
    }
  };

  const handleKeyClick = (path: string[]) => {
    setAccessorPath(path.join("."));
  };

  const handleValueClick = (value: any) => {
    alert(`Value copied: ${JSON.stringify(value)}`);
  };

  const handleSaveFavorite = () => {
    if (favoriteName && jsonData) {
      const newFavorite = {
        id: crypto.randomUUID(), // Generate a unique ID for the favorite
        name: favoriteName,
        data: jsonData,
        pinned: false,
      };
      const updatedFavorites = [...favorites, newFavorite];
      setFavorites(updatedFavorites); // Update state

      // Close modal and reset the input field
      setShowModal(false);
      setFavoriteName("");
    }
  };
  const handleDeleteFavorite = (favoriteId: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== favoriteId);
    setFavorites(updatedFavorites); // Update state
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
  };

  const handleFavoriteClick = (favoriteData: any) => {
    console.log(favoriteData);
    setJsonData(favoriteData); // Set the clicked favorite's data as the current JSON
  };

  const handlePinToggle = (favoriteId: string) => {
    const updatedFavorites = favorites.map((fav) =>
      fav.id === favoriteId ? { ...fav, pinned: !fav.pinned } : fav
    );
    setFavorites(updatedFavorites); // Update state
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleRecentFilterClick = (filterText: string) => {
    setFilter(filterText); // Apply the clicked recent filter
  };

  const handleBlur = () => {
    // Save the filter to localStorage when the input loses focus
    if (filter && !recentFilters.includes(filter)) {
      const updatedFilters = [filter, ...recentFilters].slice(0, 20); // Keep only the last 20 filters
      setRecentFilters(updatedFilters);
    }
  };

  const handleRemoveFilter = (filterToRemove: string) => {
    const updatedFilters = recentFilters.filter(
      (filter) => filter !== filterToRemove
    );
    setRecentFilters(updatedFilters);
    localStorage.setItem("recentFilters", JSON.stringify(updatedFilters)); // Update localStorage
  };

  return (
    <div className="container mx-auto px-4">
      <nav className="sticky top-0 bg-background flex justify-between py-2 px-2 ">
        <h1 className="text-2xl font-bold mb-4">JSON Viewer</h1>
        <div className="flex gap-4">
          <div className="flex gap-1 font-mono">
            {favorites
              .filter((fav) => fav.pinned) // Only display pinned favorites
              .map((fav) => (
                <Button
                  className="px-2 cursor-pointer"
                  variant="ghost"
                  key={fav.id}
                  onClick={() => handleFavoriteClick(fav.data)}
                >
                  {`{${fav.name}}`}
                </Button>
              ))}
          </div>
          <Drawer
            favorites={favorites}
            onFavoriteClick={handleFavoriteClick}
            handlePinToggle={handlePinToggle}
            handleDeleteFavorite={handleDeleteFavorite}
            // Pass the handler to Drawer
          />
        </div>
      </nav>

      {/* JSON Input Form */}
      <div>
        <JSONInputForm
          onSaveFavorite={() => setShowModal(true)}
          onSubmit={handleJSONInput}
        />
      </div>

      {/* Filter Input and Recent Filters */}
      <div className="flex gap-4 mt-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Filter by key or value"
            value={filter}
            onChange={handleFilterChange}
            onBlur={handleBlur} // Handle blur event to save to localStorage
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Display recent filters */}
        <div className="flex flex-wrap items-center gap-2">
          {recentFilters.slice(0, 6).map((recentFilter, index) => (
            <div key={index} className="flex items-center space-x-2 relative">
              <Button
                onClick={() => handleRecentFilterClick(recentFilter)}
                className="text-sm px-2 py-1"
              >
                {recentFilter.length > 20
                  ? `${recentFilter.slice(0, 20)}...`
                  : recentFilter}
              </Button>
              <Delete
                className="text-red-600 cursor-pointer absolute -bottom-4 right-0"
                size={16}
                onClick={() => handleRemoveFilter(recentFilter)} // Remove filter when clicked
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Saving Favorite */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveFavorite}
          name={favoriteName}
          setName={setFavoriteName}
        />
      )}

      {/* Render formatted JSON on the page */}
      {jsonData && (
        <div className="mt-4 space-y-4 overflow-x-scroll font-mono">
          <div>
            <h3 className="mt-4">JSON Structure</h3>
          </div>
          <JSONRenderer
            data={jsonData}
            path={[]}
            onKeyClick={handleKeyClick}
            onValueClick={handleValueClick}
            filter={filter} // Pass the filter to the JSONRenderer
          />
        </div>
      )}

      {/* Display the path */}
      <AccessorDisplay path={accessorPath} />
    </div>
  );
}
