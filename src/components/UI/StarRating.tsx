import { FC, useState } from "react"


interface IStarRating {
    starsNum: number
}

// onDoubleClick={() => {
// setRating(0);
// setHover(0);
// }}

const StarRating:FC<IStarRating> = ({starsNum}) => {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    return (
        <div className='star-rating'>
            {[...Array(starsNum)].map((star, index) => {
                index += 1
                return (
                    <button
                        type='button'
                        key={index}
                        className={
                            index <= ((rating && hover) || hover) ? 'on' : 'off'
                        }
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className='star'>&#9733;</span>
                    </button>
                )
            })}
        </div>
    )
}

export default StarRating