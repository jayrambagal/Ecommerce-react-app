import { useEffect, useState } from "react";
import Favorite from "../../assets/icons/Favorite";
import "./style.css";
import StarRating from "../StarRating/StarRating";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    image: string;
}
interface ProductCardProps {
    product: Product;
}


function ProductCard({ product }: ProductCardProps) {
    const [favoriteColor, setFavoriteColor] = useState<string>("white");
    const [isViewButton, setIsViewButton] = useState<boolean>(false);
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);

    useEffect(() => {
        const imageElement = new Image();
        imageElement.src = product.image;
        imageElement.onload = () => {
            setIsLoadingImage(false); // Image loaded successfully
        };
        imageElement.onerror = () => {
            setIsLoadingImage(false); // Image loading failed
        };
    }, [product.image]);

    return (
        <div
            className="cardContainter"
            onMouseEnter={() => setIsViewButton(true)}
            onMouseLeave={() => setIsViewButton(false)}
        >
            {isLoadingImage ? (
                <ProductCardSkeleton />
            ) : (
                <>
                    <div className="productImage">
                        <img
                            src={product.image}
                            alt={product.name}
                            onLoad={() => setIsLoadingImage(false)}
                            onError={() => setIsLoadingImage(false)}
                            className="imageSelf"
                        />
                        <span
                            className="productFavorite"
                            onClick={() => {
                                favoriteColor === "#D32424"
                                    ? setFavoriteColor("white")
                                    : setFavoriteColor("#D32424");
                            }}
                        >
                            <Favorite color={favoriteColor} />
                        </span>
                        {isViewButton && (
                            <button className="productViewBtn">View Product</button>
                        )}
                    </div>
                    <div className="productDetails">
                        <h1 className="productTitle">{product.description}</h1>
                        <h3 className="productPrice">
                            <span className="originalPrice">{`Rs.${product.price.toFixed(
                                0
                            )}`}</span>
                            <span className="discountedPrice">{`Rs.${product.price.toFixed(
                                0
                            )}`}</span>
                        </h3>
                        <StarRating value={product.rating} />
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductCard;
