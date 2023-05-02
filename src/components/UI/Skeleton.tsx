import React from 'react'

function Skeleton() {
  return (
      <div className='bg-white rounded-2xl grid p-8'>
          <div className='flex justify-between items-center mb-20'>
              <div
                  className='grid gap-4 cursor-pointer justify-items-center'
              >
                  <div
                      className='object-cover w-[11rem] h-[11rem] rounded-full object-top'
                  />
                  <span className='text-color-blue-1 text-[1.4rem]'>&nbsp;</span>
              </div>
              <input
                  type='file'
                  name='photoUpload'
                  id='photoUpload'
                  accept='image/*'
                  className='hidden'
                  onChange={handlePicture}
              />

              <div className='flex gap-8'>
                  <button
                      className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                      onClick={openDialog}
                  >
                      <img src='/icons/admins/delete.svg' alt='' />
                      <span className='text-red-600 text-[1.4rem] font-semibold'>
                          Deactivate
                      </span>
                  </button>
              </div>
          </div>
          <p className='text-[2rem] font-Satoshi-Medium'>
              Personal Information
          </p>
          {responseMessage?.displayMessage && (
              <p className='text-center'>
                  <span className={responseMessage?.className}>
                      {responseMessage?.displayMessage}
                  </span>
              </p>
          )}
          <form
              onSubmit={onSubmit}
              className='grid max-w-[84rem] gap-16 mt-12 '
              style={{
                  gridTemplateColumns: ' repeat(auto-fit, minmax(35rem, 1fr))',
              }}
          >
              <>
                  {formInputs.map((input, idx) => {
                      const { label, type, name, selectProps } = input

                      return (
                          <Input
                              key={idx + label}
                              label={label}
                              register={register}
                              formErrors={formErrors}
                              type={type}
                              name={name}
                              isSelect={type === 'select'}
                              select={selectProps}
                          />
                      )
                  })}

                  <button
                      className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-[5rem]'
                      style={{ justifySelf: 'start' }}
                  >
                      <span>
                          <img
                              src='/icons/admins/saveDisk.svg'
                              alt=''
                              className='w-[1.7rem] h-[1.7rem]'
                          />
                      </span>{' '}
                      {post_admin_loading ? 'Loading...' : 'Save Changes'}
                  </button>
              </>
          </form>
      </div>
  )
}

export default Skeleton