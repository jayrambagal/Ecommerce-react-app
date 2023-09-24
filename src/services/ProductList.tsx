import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Fuse from 'fuse.js';
import ProductCard from '../components/card/ProductCard';
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

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // Define an array of clothing brands
  const clothingBrands = ['H&M', 'MangoMan', 'Zara', 'Nike', 'Adidas', 'Puma', 'Levi\'s', 'Gap', 'Uniqlo'];

  // Arrays of clothing product names, descriptions, and images
  const clothingProductNames = ['Cotton T-Shirt', 'Jeans', 'Hoodie', 'Sneakers', 'Jacket', 'Dress', 'Shorts', 'Polo Shirt', 'Sweater'];
  const clothingProductDescriptions = ['Comfortable and stylish', 'Classic denim jeans', 'Warm and cozy hoodie', 'Sporty sneakers', 'Trendy jacket', 'Elegant dress', 'Cool shorts', 'Casual polo shirt', 'Soft and warm sweater'];
  const clothingProductImages = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg'];

  // Function to randomly select an item from an array
  function getRandomItemFromArray<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  // Define a function to generate a random clothing product
  function randomClothingProduct(): Product {
    const brand = getRandomItemFromArray(clothingBrands); // Randomly select a brand from the array
    const productType = getRandomItemFromArray(clothingProductNames); // Randomly select a product type
    const imageUrl = `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`; // Use Lorem Picsum for placeholder images
    return {
      id: faker.datatype.uuid(),
      name: `${productType} - ${brand}`,
      brand: brand,
      category: 'Clothing',
      description: `${getRandomItemFromArray(clothingProductDescriptions)} (${brand})`,
      price: parseFloat(faker.commerce.price()),
      rating: parseFloat((faker.datatype.number({ min: 1, max: 5, precision: 0.1 }) as number).toFixed(1)), // Generates a rating between 1 and 5
      image: faker.image.urlLoremFlickr({ category: brand }), // Use the constructed image URL
    };
  }

  // Define a method to generate clothing products up to 'maxSize' amount
  function generateClothingProducts(maxSize: number): Product[] {
    const clothingProducts: Product[] = [];
    for (let index = 0; index < maxSize; index++) {
      clothingProducts.push(randomClothingProduct());
    }
    return clothingProducts;
  }

  // Load 10 random clothing products when the component mounts
  useEffect(() => {
    const clothingProducts: Product[] = generateClothingProducts(100);
    setProducts(clothingProducts);
  }, []);

  // Filter products based on the search term
  const fuse = new Fuse(products, {
    keys: ['brand', 'name', 'description'],
    threshold: 0.4, // Adjust the threshold for fuzzy matching
  });

  // Function to perform a more flexible search
  function performFlexibleSearch(query: string): Product[] {
    const queryWords = query.toLowerCase().split(' ');
    return products.filter((product) => {
      const brandLower = product.brand.toLowerCase();
      const descriptionLower = product.description.toLowerCase();
      return queryWords.some((word) => {
        return brandLower.includes(word) || descriptionLower.includes(word);
      });
    });
  }

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/womens-dresses')
      .then(res => res.json())
      .then(json => console.log(json))
    const filteredProducts =
      searchTerm.trim() === '' ? products : performFlexibleSearch(searchTerm);
    // Update the filtered products in real-time
    setFilteredProducts(filteredProducts);
  }, [searchTerm, products]);

  // State to store filtered products

  return (
    <div>
      <h2>Clothing Products</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredProducts.map((product, index) => (
          <ProductCard product={product} />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
