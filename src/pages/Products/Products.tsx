import React, { useEffect, useState } from 'react'
// @ts-ignore
import Logo from '../../assets/images/ZiviLogo.png'
import FilterSidebar from '../../components/filterSidebar/FilterSidebar'
import { useProductData } from '../../services/ProductData'
import ProductCard from '../../components/card/ProductCard'
import './style.css'
import Search from '../../assets/icons/Search'
import { useParams } from 'react-router-dom';

interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    description: string;
    price: number;
    rating: number;
    image: string;
}
const Products = () => {
    const ProductsData = useProductData()
    const [searchText, setSearchText] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const { searchTerm } = useParams();
    const ProductDataLength = ProductsData.products.length
    const handleSearch = async (searchData: any) => {
        // @ts-ignore
        const filtered = ProductsData?.products.filter((data: any) => data.description.toLowerCase().includes(searchData.toLowerCase()) ||
            data.brand.toLowerCase().includes(searchData.toLowerCase())
        );
        setFilteredProducts(filtered);
    };
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch(searchTerm);
        }
    };
    const handleTypeSearch = (searchValue: any) => {
        setSearchText(searchValue)
        handleSearch(searchValue)
    }

    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm, ProductDataLength])

    return (
        <div className='productsMainContainer'>
            <img src={Logo} alt="logo" className="ziviLogo" />
            <div className='productDataContainer'>
                <div className='searchBarContainer'>
                    <div className="productSearchBar">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => handleTypeSearch(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                        <div className='searchIcon'><Search /></div>
                    </div>
                </div>
                <div className='productsDataContainer'>
                    <FilterSidebar />
                    <div className='productsCardsData'>
                        {
                            filteredProducts.map((data: any, index: number) => {
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
