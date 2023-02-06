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
            { category: 'Mon', value: Math.random() },
            { category: 'Tue', value: Math.random() },
            { category: 'Wed', value: Math.random() },
            { category: 'Thur', value: Math.random() },
            { category: 'Fri', value: Math.random() },
            { category: 'Sat', value: Math.random() },
            { category: 'Sun', value: Math.random() },
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
