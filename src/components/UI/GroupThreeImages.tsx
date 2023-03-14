import React from 'react'

interface GroupThreeImages {
    images: string[]
}

const imgArr = ['/img/avatar1.png', '/img/avatar2.png', '/img/avatar3.png']


function GroupThreeImages({ images = imgArr}: GroupThreeImages) {
    return (
        <div className='flex gap-16 '>
            <div className='relative w-[10rem] flex items-center justify-between'>
                <img
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
            </div>
            <button className='text-color-blue'>View Candidates</button>
        </div>
    )
}

export default GroupThreeImages
