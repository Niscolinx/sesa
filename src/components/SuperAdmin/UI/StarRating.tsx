import { FC, useState } from 'react'

interface IStarRating {
    starsNum: number
}

// onDoubleClick={() => {
// setRating(0);
// setHover(0);
// }}

const StarRating: FC<IStarRating> = ({ starsNum }) => {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    return (
        <div>
            {[...Array(5)].map((star, index) => {
              
                return <span className='text-[#E69B55]'>&#9733;</span>
            })}
        </div>
    )
}

export default StarRating
