import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'



const Last: FC = () => {
   

    return (
        <main className='bg-color-white rounded-lg'>
           
          <section className='capitalize'>
            <p className='text-[2rem] font-Satoshi-Medium'>Election Title</p>
            <p>Peace Estate 2023 General Election</p>
          </section>

          <section>
            <p className='text-[2rem] font-Satoshi-Medium'>Election Categories</p>

            <div className='grid gap-8'>
                <div>
                    <p>President</p>
                    <div>
                        
                    </div>
                </div>
            </div>
          </section>
        </main>
    )
}

export default Last
