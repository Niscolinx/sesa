import React, { Fragment } from 'react'

interface GroupThreeImages {
    images: string[]
}

export function GroupThreeImages({ images }: GroupThreeImages) {
    return (
        <div className='relative w-[12rem] flex items-center justify-between'>
            {images.map((item, i) => {
                return (
                    <Fragment key={i}>
                        {i + 1 <= 3 && (
                            <img
                                src={item}
                                alt=''
                                className={`w-[3rem] h-[3rem] object-cover rounded-full border border-color-white absolute z-${
                                    i + 1 + 10
                                }`}
                                style={{
                                    left: `${i * 20}%`,
                                }}
                            />
                        )}
                    </Fragment>
                )
            })}
            {images.length > 3 && (
                <span
                    className={`w-[3rem] h-[3rem] object-cover rounded-full border border-color-white absolute bg-[#0556E5] text-white z-${14}`}
                    style={{
                        left: `60%`,
                    }}
                >
                    
                    + {images.length - 3}
                </span>
            )}
        </div>
    )
}

export default GroupThreeImages
