import { useRouteError } from 'react-router-dom'

function ErrorBoundary() {
    let error: any = useRouteError()
    console.error({ error })

    console.log('The Error->', { error })

    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <section className='grid place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                <img src='/icons/admins/errorSvg.svg' alt='' />
                <p className='text-[2rem] font-Satoshi-Medium'>
                    Ooops, there's an error... You can try refreshing
                </p>
                {/* <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                        >
                           
                            Add Message
                        </button> */}
            </section>
        </div>
    )
}

export default ErrorBoundary
