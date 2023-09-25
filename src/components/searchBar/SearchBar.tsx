import React, { useState, ChangeEvent } from 'react';
import './style.css'
import Search from '../../assets/icons/Search';
import SuggestionBox from '../suggestionBox/SuggestionBox';
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
        <>
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <div className='searchIcon'><Search /></div>
            </div>
            {searchTerm && <SuggestionBox />}
        </>
    );
}

export default SearchBar;

