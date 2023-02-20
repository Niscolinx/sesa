import { PieChart, Pie, Cell } from 'recharts'
import { overviewChart_data, overviewChart_colors } from '../../../pages/SuperAdmin/dashboard/Overview'


interface OverviewChart {
    currentSwiperIndex?: number
}

export const estateChart_data = [
    { name: 'Resident Wallet', value: 10 },
    { name: 'Security Company Wallet', value: 10 },
    { name: 'Estate Wallet', value: 45 },
    { name: 'Commission Wallet', value: 17 },
]

export const estateChart_colors = ['#EA0B90', '#23C375', '#098DFF', '#404243']

export const estateChart = ({ currentSwiperIndex }: OverviewChart) => {


    return (
        <PieChart width={253} height={253} className='relative'>
            <Pie
                data={overviewChart_data}
                className='overviewChart__pie'
                innerRadius={68}
                outerRadius={80}
                fill='#8884d8'
                paddingAngle={5}
                dataKey='value'
            >
                {overviewChart_data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={
                            overviewChart_colors[
                                index % overviewChart_colors.length
                            ]
                        }
                    />
                ))}
            </Pie>
        </PieChart>
    )
}
export default function OverviewChart({ currentSwiperIndex }: OverviewChart) {


    return (
        <PieChart width={253} height={253} className='relative'>
            <Pie
                data={overviewChart_data}
                className='overviewChart__pie'
                innerRadius={68}
                outerRadius={80}
                fill='#8884d8'
                paddingAngle={5}
                dataKey='value'
            >
                {overviewChart_data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={
                            overviewChart_colors[
                                index % overviewChart_colors.length
                            ]
                        }
                    />
                ))}
            </Pie>
        </PieChart>
    )
}
