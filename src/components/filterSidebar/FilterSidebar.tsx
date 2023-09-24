import React, { useState } from "react";
import "./style.css";
import DownArrow from "../../assets/icons/DownArrow";
import { FILTER_DATA } from "../../constants/SidebarFilterData";
import StarRating from "../StarRating/StarRating";
import UpArrow from "../../assets/icons/UpArrow";

interface FilterSidebarProps {
    initialOpenFilters?: boolean[];
}
const FilterSidebar: React.FC<FilterSidebarProps> = ({
    initialOpenFilters = [],
}) => {
    const [openFilters, setOpenFilters] = useState<boolean[]>(
        new Array(FILTER_DATA.length).fill(true) // Initially, all filters are open
    );

    const toggleFilter = (index: number) => {
        const updatedFilters = [...openFilters];
        updatedFilters[index] = !updatedFilters[index];
        setOpenFilters(updatedFilters);
    };
    return (
        <div className="filterSidebarContainer">
            <h2 className="filterSidebarHeading">Search Results</h2>
            {FILTER_DATA.map((filterData, index) => {
                return (
                    <div className="filterBrands">
                        <div
                            className="filterLabelContaner"
                            onClick={() => toggleFilter(index)}
                        >
                            <h2 className="filterTitle">{filterData.category}</h2>
                            {openFilters[index] ? <DownArrow /> : <UpArrow />}
                        </div>
                        {openFilters[index] && (
                            <div className="filterInputs">
                                {FILTER_DATA[index].items.map((checkText, inputIndex) => {
                                    console.log(checkText);
                                    return (
                                        <label className="inputLabel" key={inputIndex}>
                                            <input
                                                className="inputCheckbox"
                                                type="checkbox"
                                                value={checkText}
                                            // checked={selectedBrands.includes(checkText)}
                                            // onChange={() => handleBrandSelection(checkText)}
                                            />
                                            {index === 2 ? (
                                                <StarRating value={checkText} />
                                            ) : (
                                                checkText
                                            )}
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                        {(index !== 2 && openFilters[index]) && <div className="seperateLine"></div>}
                    </div>
                );
            })}
        </div>
    );
};

export default FilterSidebar;
