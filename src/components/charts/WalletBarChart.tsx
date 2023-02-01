import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const data = [
    {
        name: 'Mon',
        pv: 25_000,
        amt: 25_000,
    },
    {
        name: 'Tue',
        pv: 30_000,
        amt: 30_000,
    },
    {
        name: 'Wed',
        pv: 20_000,
        amt: 20_000,
    },
    {
        name: 'Thur',
        pv: 15_000,
        amt: 15_000,
    },
    {
        name: 'Fri',
        pv: 10_000,
        amt: 10_000,
        
    },
    {
        name: 'Sat',
        pv: 5_000,
        amt: 5_000,
    },
    {
        name: 'Sun',
        pv: 0,
        amt: 0,
    },
]

export default function WalletBarChart() {
    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeOpacity={0} />
            <XAxis dataKey='name'  />
            <YAxis />
            <Tooltip />

            <Bar dataKey='amt' fill='#08D231' />
        </BarChart>
    )
}
