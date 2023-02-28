
import React from 'react';

interface DialogWithdrawalStepsProps {
    handleWithdrawal: (event: React.FormEvent<HTMLFormElement>) => void;
}


export default function DialogWithdrawalSteps({handleWithdrawal}: DialogWithdrawalStepsProps) {
  return (
      <>
          <form className='grid gap-12' onSubmit={handleWithdrawal}>
              <div className='w-full grid gap-4'>
                  <label
                      htmlFor='amount'
                      className='text-[1.4rem] font-semibold'
                  >
                      Amount
                  </label>
                  <div className='relative flex items-center'>
                      <img
                          src='/icons/Naira.svg'
                          alt=''
                          className='absolute left-3'
                      />
                      <input
                          type='number'
                          required
                          id='amount'
                          className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                      />
                  </div>
              </div>
              <div className='w-full grid gap-4'>
                  <label
                      htmlFor='description'
                      className='text-[1.4rem] font-semibold'
                  >
                      Description
                  </label>

                  <input
                      type='text'
                      required
                      id='description'
                      className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                  />
              </div>

              <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                  Withdraw
              </button>
          </form>
      </>
  )
}
