import React, { useState, ChangeEvent } from 'react';
import './style.css'
import Search from '../../assets/icons/Search';
import SuggestionBox from '../suggestionBox/SuggestionBox';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const navigate = useNavigate()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        navigate(`/products/${searchTerm}`)

    };
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                <div className='searchIcon' onClick={() => handleSearch()}><Search /></div>
            </div>
            {searchTerm && <SuggestionBox />}
        </>
    );
}

export default SearchBar;

