import React, { useState, ChangeEvent } from 'react';
import './style.css'
interface SearchBarProps {
    onSearch: (term: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="searchbar">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <img src='' alt="search" />
        </div>
    );
}

export default SearchBar;

