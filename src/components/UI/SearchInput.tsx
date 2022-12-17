import React from "react";
import { useEffect } from "react";
import { useState } from "react";

interface SearchInputProps {
  search: (field: string, searchQuery: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ search }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("name");

  useEffect(() => {
    search(searchField, searchQuery);
  }, [searchField, searchQuery]);

  return (
    <form className="search_form">
      <select
        defaultValue="name"
        onChange={(e) => setSearchField(e.target.value)}
        name="select"
      >
        <option value="name">Название</option>
        <option value="sum">Сумма</option>
        <option value="qty">Количество</option>
        <option value="volume">Объем</option>
        <option value="delivery_date">Дата</option>
        <option value="currency">Валюта</option>
      </select>
      <input
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setSearchField(
            (e.target.previousElementSibling as HTMLInputElement).value
          );
        }}
        value={searchQuery}
        type="text"
        placeholder="Поиск..."
      />
    </form>
  );
};

export default SearchInput;
