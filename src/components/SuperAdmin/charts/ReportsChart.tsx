import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
    {
        name: 'Mon',
        pv: 25_000,
    },
    {
        name: 'Tue',
        pv: 30_000,
    },
    {
        name: 'Wed',
        pv: 18_000,
    },
    {
        name: 'Thur',
        pv: 15_000,
    },
    {
        name: 'Fri',
        pv: 22_000,
    },
    {
        name: 'Sat',
        pv: 21_000,
    },
    {
        name: 'Sun',
        pv: 22_000,
    },
]



interface ReportChart {
    width?: number
    height?: number
}

export default function ReportChart({
    width = 300,
    height = 300,
}: ReportChart) {
    return (
        <BarChart
            width={width}
            height={height}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <XAxis dataKey='name' />
            <YAxis
                tickCount={7}
                tickFormatter={(tick) => {
                    return '₦' + tick
                }}
            />
            <Tooltip />

            <Bar dataKey='pv' fill='#08D231' barSize={40} />
            <Bar dataKey='pv' fill='#EA0B90' barSize={40} />
        </BarChart>
    )
}
