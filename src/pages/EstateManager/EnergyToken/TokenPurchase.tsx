import OverviewChart from '../../../components/SuperAdmin/charts/OverviewChart'
import WalletBarChart from '../../../components/SuperAdmin/charts/WalletBarChart'

function TokenPurchase() {
    return (
        <div>
            <section
                className=' text-[1.4rem] grid gap-8 bg-white '
                style={{
                    gridTemplateColumns: '60% auto',
                }}
            >
                <div className='border-l border-l-color-grey bg-white rounded-lg p-8 grid gap-10'>
                    <p className='font-Satoshi-Medium text-[2rem] mb-10'>
                        Amount
                    </p>
                    <WalletBarChart />
                </div>

                <div className='overviewChart grid justify-center'>
                    <div className='overviewChart__box'>
                        <OverviewChart />

                        <div className='overviewChart__label'>
                            <p className='overviewChart__label--percentage'>
                                62
                                <span>%</span>
                            </p>
                            <p className='overviewChart__label--title'>
                                Total Denomination Count
                            </p>
                        </div>
                    </div>
                </div>
            </section>
                <section className='grid text-[1.6rem] bg-white pt-10 rounded-2xl'>
                    <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                        <div className='relative flex items-center'>
                            <img
                                src='/icons/admins/search.svg'
                                alt=''
                                className='absolute left-4 text-[4rem]'
                            />
                            <input
                                type='text'
                                placeholder='Search Parameters'
                                className='pl-16 w-[20rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                            />
                        </div>
                        <div className='relative flex items-center'>
                            <select className=' cursor-pointer w-[20rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                                <option hidden value=''>
                                    Sort By
                                </option>
                                <option value='date'>date</option>
                                <option value='alpha'>Alpha</option>
                            </select>
                            <GrDown className='absolute right-4 text-[1.3rem]' />
                        </div>
                        <div className='ml-auto flex items-center gap-16'>
                            <button className='border text-color-blue-1 border-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'>
                                Print
                                <img src='/icons/print.svg' alt='' />
                            </button>
                            <button className='border text-color-blue-1 border-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'>
                                Download
                                <img src='/icons/file_download.svg' alt='' />
                            </button>
                        </div>
                    </div>

                    <div className='grid'>
                        <div
                            className='grid justify-between text-color-dark-1 bg-gray-100 p-8 grid-cols-6 gap-6'
                            style={{
                                fontSize: '1.6rem',
                            }}
                        >
                            <p className='flex items-center gap-2'>
                                <input
                                    type='checkbox'
                                    className='cursor-pointer'
                                />
                                <p>Token Serial No.</p>
                            </p>
                            <p>Token Code</p>
                            <p>Denomination(N)</p>
                            <p>Customer Notification</p>
                            <p>Convenience Fee</p>
                            <p>Message</p>
                        </div>

                        <div className='grid gap-8 mt-8 p-8'>
                            {slicedPages && slicedPages.length > 0 ? (
                                React.Children.toArray(
                                    slicedPages[paginate.index].map(
                                        ({
                                            id,
                                            tokenSerialNo,
                                            tokenCode,
                                            customNotification,
                                            message,
                                            convenienceFee,
                                            denomination,
                                        }) => {
                                            return (
                                                <div className='grid justify-between border-b grid-cols-6 gap-8 py-4 capitalize'>
                                                    <p className='flex items-center gap-4'>
                                                        <input
                                                            type='checkbox'
                                                            className='cursor-pointer'
                                                        />

                                                        <span>
                                                            {tokenSerialNo}
                                                        </span>
                                                    </p>
                                                    <p>{tokenCode}</p>
                                                    <p>{denomination}</p>
                                                    <p>{customNotification}</p>

                                                    <p>{convenienceFee}</p>
                                                    <p>{message}</p>
                                                </div>
                                            )
                                        }
                                    )
                                )
                            ) : (
                                <div>
                                    <div className='relative'>
                                        <div className='absolute w-full grid place-content-center'>
                                            <CgSpinnerTwo className='animate-spin text-[#0660FE] text-4xl' />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <footer className='flex items-center p-4 mt-4 bg-color-white rounded-lg'>
                        <div className='flex gap-8 items-center'>
                            <p>View</p>
                            <select
                                name=''
                                id=''
                                className='flex items-center border px-4 rounded-lg outline-none cursor-pointer'
                                onChange={handleItemsPerPage}
                            >
                                {itemsPerPageArr.map((item, index) => (
                                    <option
                                        value={item}
                                        key={index}
                                        selected={item === itemsPerPage}
                                        className='capitalize cursor-pointer bg-white'
                                    >
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <p className='text'>List per page</p>
                        </div>
                        <ul className='flex items-center gap-5 ml-10'>
                            <HiOutlineChevronLeft
                                onClick={handlePrev}
                                className='cursor-pointer'
                            />

                            {slicedPages?.map((item, index) => {
                                return (
                                    <li key={index}>
                                        {index + 1 === currentPage ? (
                                            <span className='bg-color-primary text-white grid place-content-center w-[3rem] h-[3rem] cursor-pointer'>
                                                {index + 1}
                                            </span>
                                        ) : (
                                            <span
                                                className='text-color-primary bg-white grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'
                                                onClick={(e) =>
                                                    jumpToPage(e, index)
                                                }
                                            >
                                                {index + 1}
                                            </span>
                                        )}
                                    </li>
                                )
                            })}

                            <HiOutlineChevronRight
                                onClick={handleNext}
                                className='cursor-pointer'
                            />
                        </ul>
                    </footer>
              
            </section>
        </div>
    )
}

export default TokenPurchase
