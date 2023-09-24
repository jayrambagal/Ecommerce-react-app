import React from "react";
import "./style.css";

function ProductCardSkeleton() {
    return (
        <div className="cardContainterSkeleton">
            <div className="productImageSkeleton"></div>
            <div className="productDetailsSkeleton">
                <div className="productTitleSkeleton"></div>
                <div className="productPriceSkeleton">
                    <span className="originalPriceSkeleton"></span>
                    <span className="discountedPriceSkeleton"></span>
                </div>
            </div >
        </div >
    );
}

export default ProductCardSkeleton;
