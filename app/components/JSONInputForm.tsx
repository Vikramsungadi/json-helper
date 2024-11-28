import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface Props {
  onSubmit: (json: string) => void;
  onSaveFavorite: () => void;
}

const JSONInputForm: React.FC<Props> = ({ onSubmit, onSaveFavorite }) => {
  const [input, setInput] = React.useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(input);
      }}
      className="space-y-4"
    >
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your JSON here"
        rows={4}
      />
      <div className="flex gap-4">
        <Button type="submit" variant="outline">
          Parse JSON
        </Button>
        <Button variant={"outline"} onClick={onSaveFavorite}>
          Save to Favorites
        </Button>
      </div>
    </form>
  );
};

export default JSONInputForm;
