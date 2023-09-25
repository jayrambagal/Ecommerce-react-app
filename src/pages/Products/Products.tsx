import React, { useState } from 'react'
// @ts-ignore
import Logo from '../../assets/images/ZiviLogo.png'
import SearchBar from '../../components/searchBar/SearchBar'
import FilterSidebar from '../../components/filterSidebar/FilterSidebar'
import { useProductData } from '../../services/ProductData'
import ProductCard from '../../components/card/ProductCard'
import './style.css'
import Search from '../../assets/icons/Search'

const Products = () => {
    const ProductsData = useProductData()
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = () => {
        console.log(searchTerm);

    };
    return (
        <div className='productsMainContainer'>
            <img src={Logo} alt="logo" className="ziviLogo" />
            <div className='productDataContainer'>
                <div className='searchBarContainer'>
                    <div className="productSearchBar">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                        // onChange={handleInputChange}
                        />
                        <div className='searchIcon'><Search /></div>
                    </div>
                </div>
                <div className='productsDataContainer'>
                    <FilterSidebar />
                    <div className='productsCardsData'>
                        {
                            ProductsData.products.map((data: any, index: number) => {
                                return (
                                    <ProductCard product={data} />
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Products
