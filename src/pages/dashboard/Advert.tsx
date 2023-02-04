import { useState } from 'react'
import { useNavigate } from 'react-router'
import RenderAdverts from '../../components/advert/RenderAdverts'

function Advert() {

    return (
        <div>
            <h1 className='heading2'>Artisan</h1>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                <RenderAdverts />
            </div>
        </div>
    )
}

export default Advert
