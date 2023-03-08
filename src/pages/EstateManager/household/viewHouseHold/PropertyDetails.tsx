import React from 'react'

function PropertyDetails() {
  return (
      <div className='flex '>
          <div className='grid gap-8'>
              <div>
                  <p className='text-[1.4rem] text-[#043FA7]'>Property Code</p>
                  <p className='font-[1.6rem] whitespace-nowrap'>
                      ThomasEstate/SO-2345CDGK1
                  </p>
              </div>
              <div>
                  <p className='text-[#043FA7]'>Property Type</p>
                  <p>Duplex</p>
              </div>
              <div>
                  <p className='text-[#043FA7]'>Property Address</p>
                  <p className='max-w-[30rem]'>
                      10, Address Street, Address Avenue, Lagos, Nigeria.
                  </p>{' '}
              </div>
          </div>
          <div className='grid gap-8 auto-rows-max'>
              <div>
                  <p className='text-[1.4rem] text-[#043FA7]'>
                      Property Category
                  </p>
                  <p className='font-[1.6rem] whitespace-nowrap'>Business</p>
              </div>
              <div>
                  <p className='text-[#043FA7]'>Property Name</p>
                  <p>Wale House</p>
              </div>
          </div>
      </div>
  )
}

export default PropertyDetails