import React from 'react'

interface GroupThreeImages {
    images: string[]
}

const imgArr = ['/img/avatar1.png', '/img/avatar2.png', '/img/avatar3.png']

function GroupThreeImages({ images = imgArr }: GroupThreeImages) {
    return (
        <div className='relative w-[10rem] flex items-center justify-between'>
            {images.map((item, i) => (
                <img
                    key={i+item}
                    src={item}
                    alt=''
                    className={`w-[3rem] h-[3rem] object-cover rounded-full border border-color-white absolute left-${
                        i * 20
                    } z-${i + 1 + 10}`}
                />
            ))}
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
