// productData.ts

import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

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

export function useProductData() {
  const [products, setProducts] = useState<Product[]>([]);
  // Define an array of clothing brands
  const clothingBrands = [
    "H&M",
    "MangoMan",
    "Zara",
    "Nike",
    "Adidas",
    "Puma",
    "Levi's",
    "Gap",
    "Uniqlo",
  ];

  // Arrays of clothing product names, descriptions, and images
  const clothingProductNames = [
    "Cotton T-Shirt",
    "Jeans",
    "Hoodie",
    "Sneakers",
    "Jacket",
    "Dress",
    "Shorts",
    "Polo Shirt",
    "Sweater",
  ];
  const clothingProductDescriptions = [
    "Comfortable and stylish",
    "Classic denim jeans",
    "Warm and cozy hoodie",
    "Sporty sneakers",
    "Trendy jacket",
    "Elegant dress",
    "Cool shorts",
    "Casual polo shirt",
    "Soft and warm sweater",
  ];

  function getRandomItemFromArray<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  useEffect(() => {
    const clothingProducts: Product[] = generateClothingProducts(1000);
    setProducts(clothingProducts);
  }, []);

  // Function to generate a random clothing product
  function randomClothingProduct(): Product {
    const brand = getRandomItemFromArray(clothingBrands); // Randomly select a brand from the array
    const productType = getRandomItemFromArray(clothingProductNames); // Randomly select a product type
    const imageUrl = `https://picsum.photos/200/200?random=${Math.floor(
      Math.random() * 1000
    )}`; // Use Lorem Picsum for placeholder images
    return {
      id: faker.datatype.uuid(),
      name: `${productType} - ${brand}`,
      brand: brand,
      category: "Clothing",
      description: `${getRandomItemFromArray(
        clothingProductDescriptions
      )} (${brand})`,
      price: parseFloat(faker.commerce.price()),
      rating: parseFloat(
        (
          faker.datatype.number({ min: 1, max: 5, precision: 0.1 }) as number
        ).toFixed(1)
      ), // Generates a rating between 1 and 5
      image: faker.image.urlLoremFlickr({ category: brand }), // Use the constructed image URL
    };
  }

  // Function to generate clothing products up to 'maxSize' amount
  function generateClothingProducts(maxSize: number): Product[] {
    const clothingProducts: Product[] = [];
    for (let index = 0; index < maxSize; index++) {
      clothingProducts.push(randomClothingProduct());
    }
    return clothingProducts;
  }

  return { products };
}

// Function to fetch products from an API
export async function fetchProductsFromAPI(): Promise<Product[]> {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category/womens-dresses"
    );
    if (response.ok) {
      const data = await response.json();
      return data; // Modify this to match the API response structure
    }
    throw new Error("Failed to fetch products from the API");
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
