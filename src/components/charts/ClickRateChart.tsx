import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'

const series = [
    {
        name: 'Series 1',
        data: [
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
        ],
    },
]

export default function ClickRateChart() {
    return (
        <LineChart width={500} height={300}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
                dataKey='category'
                type='category'
                allowDuplicatedCategory={false}
            />
            <YAxis dataKey='value' />
            <Tooltip />
            <Legend />
            {series.map((s) => (
                <Line
                    dataKey='value'
                    data={s.data}
                    name={s.name}
                    key={s.name}
                />
            ))}
        </LineChart>
    )
}
