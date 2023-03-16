import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
    {
        name: 'Mon',
        v: 25,
    },
    {
        name: 'Tue',
        v: 20,
    },
    {
        name: 'Wed',
        v: 5,
    },
    {
        name: 'Thur',
        v: 10,
    },
    {
        name: 'Fri',
        v: 12,
    },
    {
        name: 'Sat',
        v: 21,
    },
    {
        name: 'Sun',
        v: 9,
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

            <Bar dataKey='v' fill='#08D231' barSize={20} />
            <Bar dataKey='v' fill='#EA0B90' barSize={20} />
        </BarChart>
    )
}
