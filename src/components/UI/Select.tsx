import React, { useState } from 'react'
import { GrUp, GrDown } from 'react-icons/gr'

const Select = () => {

    type State = 'Lagos' | 'Imo' | 'Abia' | 'FCT'
type Gender = 'Male' | 'Female'

    const state: Array<State> = ['Lagos', 'Imo', 'Abia', 'FCT']
    const gender: Array<Gender> = ['Male', 'Female']

    const [toggleStateMenu, setToggleStateMenu] = useState(false)
    const [toggleGenderMenu, setToggleGenderMenu] = useState(false)
    const [selectedState, setSelectedState] = useState<State | null>(null)
    const [selectedGender, setSelectedGender] = useState<Gender | null>(null)
    const [isWarning, setIsWarning] = useState(true)

    const stateMenuToggler = () => setToggleStateMenu(!toggleStateMenu)
    const genderMenuToggler = () => setToggleGenderMenu(!toggleGenderMenu)

    const handleSelectedState = (item: State) => {
        setSelectedState(item)
        setToggleStateMenu(false)
    }
    const handleSelectedGender = (item: Gender) => {
        setSelectedGender(item)
        setToggleGenderMenu(false)
    }

  return (
      <div className='relative grid gap-4'>
          <p className='text-[1.4rem] font-semibold'>Artisan</p>
          <div className='relative flex items-center'>
              <p
                  className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                  onClick={stateMenuToggler}
              >
                  {selectedState ? (
                      selectedState
                  ) : (
                      <span className='text-gray-500'>Select State</span>
                  )}
              </p>
              {toggleStateMenu ? (
                  <GrUp className='absolute right-4' />
              ) : (
                  <GrDown className='absolute right-4' />
              )}
          </div>

          {toggleStateMenu && (
              <div className='absolute top-[8rem]  left-0 border border-color-primary-light w-[24rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                  {state.map((item, index) => (
                      <p
                          className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                          key={index}
                          onClick={() => handleSelectedState(item)}
                      >
                          {item}
                      </p>
                  ))}
              </div>
          )}
      </div>
  )
}

export default Select