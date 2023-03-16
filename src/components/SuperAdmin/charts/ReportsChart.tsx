import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
    {
        name: 'Mon',
        v: Math.floor(Math.random() * 15 + 5),
        u: Math.floor(Math.random() * 15 + 5),
    },
    {
        name: 'Tue',
        v: Math.floor(Math.random() * 15 + 5),
        u: Math.floor(Math.random() * 15 + 5),
    },
    {
        name: 'Wed',
        v: Math.floor(Math.random() * 15 + 5),
        u: Math.floor(Math.random() * 15 + 5),
    },
    {
        name: 'Thur',
        v: Math.floor(Math.random() * 15 + 5),
        u: Math.floor(Math.random() * 15 + 5),
    },
    {
        name: 'Fri',
        v: Math.floor(Math.random() * 15 + 5),
        u: Math.floor(Math.random() * 15 + 5),
    },
    {
        name: 'Sat',
        v: Math.floor(Math.random() * 15 + 5),
        u: Math.floor(Math.random() * 15 + 5),
    },
    {
        name: 'Sun',
        v: Math.floor(Math.random() * 15 + 5),
        u: Math.floor(Math.random() * 15 + 5),
    },
]



interface ReportChart {
    width?: number
    height?: number
}

export default function ReportChart({
    width = 600,
    height = 200,
}: ReportChart) {
    return (
        <BarChart
            width={width}
            height={height}
            data={data}
            barGap={0}
           
        >
            <XAxis dataKey='name' />
            <YAxis
                tickCount={5}
                
            />
            <Tooltip />

            <Bar dataKey='v' fill='#08D231' barSize={20} />
            <Bar dataKey='u' fill='#EA0B90' barSize={20} />
        </BarChart>
    )
}
