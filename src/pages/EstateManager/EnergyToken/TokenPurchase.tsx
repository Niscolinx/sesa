import React from 'react'

function TokenPurchase() {
  return (
      <section
          className=' text-[1.4rem] grid gap-8'
          style={{
              gridTemplateColumns: '60% auto',
          }}
      >
          <div className='border-l border-l-color-grey bg-white rounded-lg p-8 grid gap-10'>
              <div className='flex justify-between'>
                  <p className='text-[1.6rem] font-bold p-8'>Wallet Trend</p>

                  <div className='relative grid gap-4'>
                      <div className='relative flex items-center w-[12rem]'>
                          <p
                              className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                              onClick={menuToggler}
                          >
                              {selectedTrend}
                          </p>
                          {toggleMenu ? (
                              <GrUp className='absolute right-4' />
                          ) : (
                              <GrDown className='absolute right-4' />
                          )}
                      </div>

                      {toggleMenu && (
                          <div className='absolute top-[8rem]  left-0 border border-color-primary-light  bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                              {trend.map((item, index) => (
                                  <p
                                      className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                      key={index}
                                      onClick={() => handleSelectedTrend(item)}
                                  >
                                      {item}
                                  </p>
                              ))}
                          </div>
                      )}
                  </div>
              </div>
              <WalletBarChart />
          </div>

          <div className='bg-white p-8 rounded-lg grid justify-center items-baseline'>
              
            
          </div>
      </section>
  )
}

export default TokenPurchase