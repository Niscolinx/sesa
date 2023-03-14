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
                        {images.length <= 3 ? (
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
                        ) : (
                            <span
                               
                              
                                className={`w-[3rem] h-[3rem] object-cover rounded-full border border-color-white absolute z-${
                                    i + 1 + 10
                                }`}
                                style={{
                                    left: `${i * 20}%`,
                                }}
                            >
                                {' '}
                                + {images.length - 3}
                            </span>
                        )}
                    </Fragment>
                )
            })}
            {/* <img
                    src='/img/avatar1.png'
                    alt=''
                    className='w-[3rem] h-[3rem] object-cover rounded-full border border-color-white absolute left-0 z-10'
                />
                <img
                    src='/img/avatar2.png'
                    alt=''
                    className='w-[3rem] h-[3rem] object-cover rounded-full border border-color-white absolute left-[20%] z-20'
                />
                <img
                    src='/img/avatar3.png'
                    alt=''
                    className='w-[3rem] h-[3rem] object-cover rounded-full border border-color-white absolute left-[40%] z-30'
                />
            </div> */}
        </div>
    )
}

export default GroupThreeImages
