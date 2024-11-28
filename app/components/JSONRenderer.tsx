import React from "react";

interface JSONRendererProps {
  data: any;
  path?: (string | number)[]; // Updated to handle both string (for object keys) and number (for array indices)
  onKeyClick: (path: (string | number)[]) => void;
  filter?: string; // New prop to handle the filter text
}

const JSONRenderer: React.FC<JSONRendererProps> = ({
  data,
  path = [],
  onKeyClick,
  filter = "", // Default to an empty string if no filter is provided
}) => {
  // Helper function to check if the key or value matches the filter
  const matchesFilter = (key: string, value: any) => {
    const keyMatches = key.toLowerCase().includes(filter.toLowerCase());
    const valueMatches = JSON.stringify(value)
      .toLowerCase()
      .includes(filter.toLowerCase());
    return keyMatches || valueMatches;
  };

  // If data is an object or array, filter and render accordingly
  if (typeof data === "object" && data !== null) {
    return (
      <div className="pl-4 border-l border-gray-200">
        {Array.isArray(data)
          ? // If the data is an array, we use the index for the path
            data.map((value, index) => (
              <div key={index} className="flex space-x-1">
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => onKeyClick([...path, index])} // Use index for arrays
                >
                  [{index}]
                </span>
                :{" "}
                <JSONRenderer
                  data={value}
                  path={[...path, index]} // Pass the updated path with index
                  onKeyClick={onKeyClick}
                  filter={filter} // Pass the filter to child components
                />
              </div>
            ))
          : // If the data is an object, we use the key for the path
            Object.entries(data)
              .filter(([key, value]) => matchesFilter(key, value)) // Filter based on the key or value
              .map(([key, value]) => (
                <div key={key} className="flex space-x-1">
                  <span
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() => onKeyClick([...path, key])}
                  >
                    {`"${key}"`}
                  </span>
                  :{" "}
                  <JSONRenderer
                    data={value}
                    path={[...path, key]} // Pass the updated path with key
                    onKeyClick={onKeyClick}
                    filter={filter} // Pass the filter to child components
                  />
                </div>
              ))}
      </div>
    );
  } else {
    return (
      <span
        className="text-green-600 cursor-pointer hover:underline"
        onClick={() => onKeyClick(path)}
      >
        {JSON.stringify(data)}
      </span>
    );
  }
};

export default JSONRenderer;
