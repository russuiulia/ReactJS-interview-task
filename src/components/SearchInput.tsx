import { useState } from "react";

interface SearchInputProps {
  onSearch: (value: string) => void;
  initialValue?: string;
}

export function SearchInput({
  onSearch,
  initialValue = ""
}: SearchInputProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="search-input-container">
      <input
        id="repo-search"
        type="search"
        value={value}
        placeholder="Search repositories..."
        onChange={(e) => {
          setValue(e.target.value);
          onSearch(e.target.value.trim());
        }}
        className="search-input"
        aria-label="Search GitHub repositories"
        aria-describedby="search-hint"
      />
    </div>
  );
}