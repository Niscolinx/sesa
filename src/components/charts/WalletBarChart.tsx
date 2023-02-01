import './styles.css'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const data = [
    {
        name: 'Mon',
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Tue',
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Wed',
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Thur',
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Fri',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Sat',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Sun',
        uv: 3490,
        pv: 4300,
        amt: 2100,
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
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />

            <Bar dataKey='pv' fill='#8884d8' />
        </BarChart>
    )
}
