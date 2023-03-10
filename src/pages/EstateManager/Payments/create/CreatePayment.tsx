import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import HouseholdFilter from './filter/Household'

export type PaymentPlan = 'fixed' | 'flexible'
export type PaymentType = 'full' | 'installment'
type Step = 'initial' | 'list'

const CreatePayment = () => {
   

    const renderPaymentType = new Map([['full', <HouseholdFilter/>]]) satisfies Map<
        PaymentType,
        JSX.Element
    >

    const displayStep = new Map([['initial', <HouseholdFilter/>]]) satisfies Map<
        Step,
        JSX.Element
    >

    return (
        <>
            <ToastContainer />

            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
                
            </div>
        </>
    )
}

export default CreatePayment
