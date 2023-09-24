import React, { useEffect, useState } from "react";
import "./style.css";
import { useProductData } from "../../services/ProductData";

const SuggestionBox = () => {
    const productData: any = useProductData();
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);

    function getRandomProducts(count: number) {
        // Make sure 'count' is not greater than the length of 'productData'
        if (count >= productData.products?.length) {
            return productData.products;
        }

        const shuffledProducts = [...productData.products]; // Create a copy of the original array
        for (let i = shuffledProducts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledProducts[i], shuffledProducts[j]] = [
                shuffledProducts[j],
                shuffledProducts[i],
            ];
        }

        return shuffledProducts.slice(0, count);
    }

    const randomProducts: any = getRandomProducts(5);
    console.log(randomProducts);
    useEffect(() => {
        const imageElement = new Image();
        imageElement.src = randomProducts.image;
        imageElement.onload = () => {
            setIsLoadingImage(false); // Image loaded successfully
        };
        imageElement.onerror = () => {
            setTimeout(() => {
                setIsLoadingImage(false);
            }, 500);
            // Image loading failed
        };
    }, [randomProducts.image]);
    return (
        <div className="suggestionBoxMain">
            <div className="suggestionContainer">
                <h3 className="latestTrendsLabel">Latest Trends</h3>
                <div className="productData">
                    {randomProducts.map((data: any, index: number) => {
                        return (
                            <div className="suggestedCard">
                                {isLoadingImage ? (
                                    <>
                                        <div className="imageSkeleton"></div>
                                        <p className="discriptionSkeleton"></p>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={data.image}
                                            alt=""
                                            onLoad={() => setIsLoadingImage(false)}
                                            onError={() => setIsLoadingImage(false)}
                                        />
                                        <p>
                                            {data?.description?.slice(0, 21)}
                                            {data?.description?.length > 22 && ".."}
                                        </p>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="suggestionContainer">
                <h3 className="latestTrendsLabel">Popular suggestions</h3>
                <div className="suggestedNames">
                    {randomProducts.map((data: any, index: number) => {
                        return (
                            <>
                                {isLoadingImage ? (
                                    <p className="suggestedNameSkeleton"></p>
                                ) : (
                                    <p className="suggestedName">{data?.name}</p>
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SuggestionBox;
