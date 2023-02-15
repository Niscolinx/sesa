import { PieChart, Pie, Cell } from 'recharts'
import { overviewChart_colors, overviewChart_data } from '../../pages/dashboard/Overview'




interface OverviewChart {
    currentSwiperIndex?: number
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
