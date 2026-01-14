import { useState } from "react";

interface SearchInputProps {
  onSearch: (value: string) => void;
  delay?: number;
  initialValue?: string;
}

export function SearchInput({
  onSearch,
  initialValue = ""
}: SearchInputProps) {
  const [value, setValue] = useState(initialValue);
  return (
    <input
      type="text"
      value={value}
      placeholder="Search…"
      onChange={(e) => {
        setValue(e.target.value);
        onSearch(e.target.value.trim());
      }}
      style={{
        padding: "10px",
        width: "100%",
        maxWidth: "500px",
        fontSize: "16px"
      }}
    />
  );
}
