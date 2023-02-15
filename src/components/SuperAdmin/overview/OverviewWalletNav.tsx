import { TfiArrowCircleRight, TfiArrowCircleLeft } from 'react-icons/tfi'
import { BiRadioCircleMarked } from 'react-icons/bi'
import { BiRadioCircle } from 'react-icons/bi'
import { Fragment } from 'react'

interface OverviewWalletNav {
    currentSwiperIndex: number
    prev: () => void
    next: () => void
    max: number
}

const OverviewWalletNav: React.FC<OverviewWalletNav> = ({
    currentSwiperIndex,
    prev,
    next,
    max
}) => {
  

    const bullets: number[] = Array.from({ length: max }, (_, i) => i + 1)

    return (
        <div className='overviewWalletNav'>
            <TfiArrowCircleLeft
                onClick={prev}
                className='overviewWalletNav__toggle'
            />
            <div className='overviewWalletNav__bullets'>
                {bullets.map((number:number) => {
                    return (
                        <Fragment key={number}>
                            {currentSwiperIndex === number ? (
                                <BiRadioCircleMarked  className='overviewWalletNav__bullets--active'/>
                            ) : (
                                <BiRadioCircle className='overviewWalletNav__bullets--stale' />
                            )}
                        </Fragment>
                    )
                })}
            </div>
            <TfiArrowCircleRight
                onClick={next}
                className='overviewWalletNav__toggle'
            />
        </div>
    )
}

export default OverviewWalletNav
