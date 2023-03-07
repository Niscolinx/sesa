import {
    Fragment,
    useState,
    createContext,
    Dispatch,
    SetStateAction,
} from 'react'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'

import AddResident from './AddResident'
import AddProperty from './AddProperty'
import { useLocation } from 'react-router'
import AddRFID from './AddRFID'

const paths = [
    {
        name: 'add Property',
        id: 1,
    },
    {
        name: 'add resident',
        id: 2,
    },
    {
        name: 'add RFID',
        id: 3,
    },
    {
        name: 'add accessCard',
        id: 4,
    },
]

type T = string | null
type D = Dispatch<SetStateAction<T>>
export interface HouseholdContext {
    selectedPropertyCode: T
    setSelectedPropertyCode: D
    tenancyType: T
    setTenancyType: D
    selectLandLord: T
    setSelectLandLord: D
    careTaker: T
    setCareTaker: D
    alphaPropertyCode: T
    setAlphaPropertyCode: D
    alphaResident: T
    setAlphaResident: D
    addResidentUser: { [key: string]: string } | null
    setAddResidentUser: Dispatch<
        SetStateAction<{
            [key: string]: string
        } | null>
    >
    vehicleType: T
    setVehicleType: D
}

export const HouseholdContext = createContext<HouseholdContext>(null as any)

function CreateHousehold() {
    const location = useLocation()
    const propertyCode = location.state?.propertyCode

    const [pathToSwitch, setPathToSwitch] = useState(1)
    const [selectedPropertyCode, setSelectedPropertyCode] = useState<T>(
        propertyCode || null
    )
    const [tenancyType, setTenancyType] = useState<T>(null)
    const [selectLandLord, setSelectLandLord] = useState<T>(null)
    const [careTaker, setCareTaker] = useState<T>(null)
    const [vehicleType, setVehicleType] = useState<T>(null)
    const [alphaPropertyCode, setAlphaPropertyCode] = useState<T>(
        'Alice James/SO-2345CDGK'
    )

    const [alphaResident, setAlphaResident] = useState<T>(
        'Osaji Valentine/SE-73'
    )

    const [addResidentUser, setAddResidentUser] = useState<{
        [key: string]: string
    } | null>(null)

    const handlePathSwitch = new Map<number, JSX.Element>([
        [1, <AddProperty />],
        [2, <AddResident />],
        [3, <AddRFID/>],
        [4, <></>],
    ])
    return (
        <>
            <HouseholdContext.Provider
                value={{
                    selectedPropertyCode,
                    setSelectedPropertyCode,
                    tenancyType,
                    setTenancyType,
                    selectLandLord,
                    setSelectLandLord,
                    careTaker,
                    setCareTaker,
                    alphaPropertyCode,
                    setAlphaPropertyCode,
                    alphaResident,
                    setAlphaResident,
                    addResidentUser,
                    setAddResidentUser,
                    vehicleType,
                    setVehicleType,
                }}
            >
                <div className='bg-white p-16 rounded-lg min-h-[90vh] relative'>
                    <div
                        className='estateDetail__radioBox'
                        style={{
                            marginTop: '0',
                        }}
                    >
                        <>
                            {paths.map((item) => {
                                return (
                                    <Fragment key={item.name}>
                                        <input
                                            type='radio'
                                            name='household'
                                            id={item.name}
                                            checked={item.id === pathToSwitch}
                                            className='hidden'
                                            onChange={() =>
                                                setPathToSwitch(item.id)
                                            }
                                        />
                                        <label
                                            htmlFor={item.name}
                                            className='capitalize'
                                        >
                                            {item.name}
                                        </label>
                                    </Fragment>
                                )
                            })}
                        </>
                    </div>
                    <section className='bg-color-white rounded-lg mt-[5rem] mb-[10rem] '>
                        {handlePathSwitch.get(pathToSwitch)}
                    </section>
                    <div className='absolute bottom-0 right-0 flex items-center gap-16 m-10'>
                        <button
                            className='flex gap items-center cursor-pointer gap-4 disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={pathToSwitch === 1}
                            onClick={() =>
                                setPathToSwitch((prev) => {
                                    return prev === 1 ? prev : prev - 1
                                })
                            }
                        >
                            <TfiArrowCircleLeft className='w-[3rem] h-[3rem] text-color-blue' />
                            <span>Previous</span>
                        </button>
                        <button
                            className='flex gap items-center cursor-pointer gap-4 disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={pathToSwitch === 4}
                            onClick={() =>
                                setPathToSwitch((prev) => {
                                    console.log({ prev })
                                    return prev === 4 ? prev : prev + 1
                                })
                            }
                        >
                            {' '}
                            <TfiArrowCircleRight className='w-[3rem] h-[3rem] text-color-blue' />
                            <span className=''>Next</span>
                        </button>
                    </div>
                </div>
            </HouseholdContext.Provider>
        </>
    )
}

export default CreateHousehold
