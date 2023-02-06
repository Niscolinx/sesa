import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const series = [
    {
        name: 'Click Rate',
        data: [
            { category: 'Mon', value: 14 },
            { category: 'Tue', value: 17 },
            { category: 'Wed', value: 5 },
            { category: 'Thur', value: 12 },
            { category: 'Fri', value: 16 },
            { category: 'Sat', value: 13 },
            { category: 'Sun', value: 18 },
        ],
    },
]

export default function ClickRateChart() {
    return (
        <LineChart width={1000} height={300}>
            <XAxis
                dataKey='category'
                type='category'
                allowDuplicatedCategory={false}
            />
            <YAxis dataKey='value' fill='#fff' />
            <Tooltip />
            {series.map((s) => (
                <Line
                    fill='#08D231'
                    dataKey='value'
                    data={s.data}
                    name={s.name}
                    key={s.name}
                />
            ))}
        </LineChart>
    )
}
