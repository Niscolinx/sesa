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
            { category: 'Mon', value: 14 },
            { category: 'Tue', value: 20 },
            { category: 'Wed', value: 5 },
            { category: 'Thur', value: 12 },
            { category: 'Fri', value:  18},
            { category: 'Sat', value: 10 },
            { category: 'Sun', value: 8 },
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
