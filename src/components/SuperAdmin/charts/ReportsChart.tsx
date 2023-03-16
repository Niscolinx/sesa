import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
    {
        name: 'Mon',
        pv: 25,
    },
    {
        name: 'Tue',
        pv: 20,
    },
    {
        name: 'Wed',
        pv: 5,
    },
    {
        name: 'Thur',
        pv: 10,
    },
    {
        name: 'Fri',
        pv: 12,
    },
    {
        name: 'Sat',
        pv: 21,
    },
    {
        name: 'Sun',
        pv: 9,
    },
]



interface ReportChart {
    width?: number
    height?: number
}

export default function ReportChart({
    width = 600,
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
                
            />
            <Tooltip />

            <Bar dataKey='pv' fill='#08D231' barSize={40} />
            <Bar dataKey='pv' fill='#EA0B90' barSize={40} />
        </BarChart>
    )
}
