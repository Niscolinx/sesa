import React from 'react'

function CommissionDialog() {
  return (
    <>
    <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => handleClose()}
                        />

                        <h3
                            className='text-[2rem] font-Satoshi-Medium border-b '
                            style={{
                                fontFamily: 'Satoshi-Medium',
                            }}
                        >
                            {isWithdrawal ? 'Withdrawal' : 'Request For Funds'}
                        </h3>

                        {isWithdrawal ? (
                            <form
                                className='grid gap-12'
                                onSubmit={handleFormSubmit}
                            >
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
                        ) : (
                            <form
                                className='grid gap-12'
                                onSubmit={handleFormSubmit}
                            >
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

                                <div className='w-full grid gap-4'>
                                    <label
                                        htmlFor='commissionWalletAttachment'
                                        className='text-[1.4rem] font-semibold'
                                    >
                                        Attach An Item
                                    </label>

                                    <input
                                        type='file'
                                        id='commissionWalletAttachment'
                                        name='commissionWalletAttachment'
                                        required
                                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] appearance-none'
                                    />
                                </div>

                                <div className='relative grid gap-4'>
                                    <p className='text-[1.4rem] font-semibold'>
                                        SendTo
                                    </p>
                                    <div className='relative flex items-center w-[20rem]'>
                                        <p
                                            className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                                            onClick={sendToMenuToggle}
                                        >
                                            {sendTo}
                                        </p>
                                        {sendToMenu ? (
                                            <GrUp className='absolute right-4' />
                                        ) : (
                                            <GrDown className='absolute right-4' />
                                        )}
                                    </div>

                                    {sendToMenu && (
                                        <div className='absolute top-[-2rem]  left-[22rem] border border-color-primary-light  bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                            {sendToArr.map((item, index) => (
                                                <p
                                                    className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                                    key={index}
                                                    onClick={() =>
                                                        handleSendTo(item)
                                                    }
                                                >
                                                    {item}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                                    Request
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </dialog>


            <div className='grid self-stretch justify-start'>
                        <div className='grid items-end'>
                            <OverviewWallet
                                amount={4_000_832}
                                title={'Commission Wallet'}
                                isWalletScreen
                                bgImgUri='/icons/overview/card/bgC.svg'
                                lefIconUri='/icons/overview/card/leftC.svg'
                                bgColor='bg-[#333333]'
                            />
                        </div>
                        <div className='flex justify-center mt-auto gap-4'>
                            <button
                                className='btn text-white bg-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={() => handleOpen('withdraw')}
                            >
                                Withdraw
                            </button>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={() => handleOpen('request')}
                            >
                                Request
                            </button>
                        </div>
                    </div>
    </>
  )
}

export default CommissionDialog