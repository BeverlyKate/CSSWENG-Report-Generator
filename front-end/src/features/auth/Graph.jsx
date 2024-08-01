import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

export function Graph({ label, graphData }) {
    const data = {
        labels: label,
        datasets: [
            {
                label: 'Sample Graph',
                data: graphData,
                fill: true,
                backgroundColor: "#FFD26F"
            }
        ]
    }
    
  return (
    <div className="chart">
        <Bar data={data}/>
    </div>
  )
}
