import { FC, useState } from 'react'

interface IStarRating {
    starsNum: number
}

// onDoubleClick={() => {
// setRating(0);
// setHover(0);
// }}

const StarRating: FC<IStarRating> = ({ starsNum }) => {
    const TOTAL_STAR_COUNT = 5
    return (
        <div>
            {[...Array(TOTAL_STAR_COUNT)].map((_, index) =>
                index <= starsNum ? (
                    <span className='text-[#E69B55]'>&#9733;</span>
                ) : (
                    <span className='text-gray-200'>&#9733;</span>
                )
            )}
        </div>
    )
}

export default StarRating
