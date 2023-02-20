import { PieChart, Pie, Cell } from 'recharts'
import { overviewChart_data, overviewChart_colors } from '../../../pages/SuperAdmin/dashboard/Overview'


interface OverviewChart {
    currentSwiperIndex?: number
}

export const estateChart_data = [
    { name: 'security guard', value: 10 },
    { name: 'sesa', value: 10 },
   
]

export const estateChart_colors = ['#08d231', '#23C375', '#098DFF', '#404243']

export const EstateChart = () => {


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
