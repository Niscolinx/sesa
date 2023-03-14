import React from 'react'

interface GroupThreeImages {
    images: string[]
}

export function GroupThreeImages({ images }: GroupThreeImages) {
    return (
        <div className='relative w-[15rem] flex items-center justify-between'>
            {images.map((item, i) => {
                console.log({item})
                return (
                    <img
                        key={i + item}
                        src={item}
                        alt=''
                        className={`w-[3rem] h-[3rem] object-cover rounded-full border border-color-white absolute left-[${
                            i * 20
                        }%] z-${i + 1 + 10}`}
                    />
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
