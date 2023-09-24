import RatingStar from "../../assets/icons/RatingStar";
interface StarRatingProps {
    value: number | string;
}
function StarRating({ value }: StarRatingProps) {
    console.log(value);

    const maxStars = 5;
    return (
        <div className="star-rating">
            {Array.from({ length: maxStars }, (_, index) => (
                // @ts-ignore
                <RatingStar color={value > index ? "#FDD33D" : "#CDCCC8"} />
            ))}
        </div>
    );
}

export default StarRating;

