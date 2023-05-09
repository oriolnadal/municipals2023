<template>
    <div>
        <Doughnut :data="chartData" :options="chartOptions"></Doughnut>
    </div>
</template>
  
<script>
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    components:{ Doughnut},
    props: {
        totalSeats: {
            type: Number,
            required: true
        },
        parties: {
            type: Array,
            required: true
        },
    },
    computed: {
        totalSeatsparties() {
            return this.parties.reduce((sum, party) => sum + party.seats, 0)
        },
        chartData() {
            let parties = this.parties
            if (this.totalSeatsparties !== this.totalSeats) {
                const emptySeats = this.totalSeats - this.totalSeatsparties
                parties = [...this.parties, { name: 'Empty', seats: emptySeats, color:'#eee'}]
            }
            return {
                labels: parties.map(party => party.name),
                datasets: [{
                    data: parties.map(party => party.seats),
                    backgroundColor: parties.map(party => party.color)
                }]
            }
        },
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        filter: function (tooltipItem) {
                            return tooltipItem.label !== 'Empty';
                        },
                        callbacks: {
                            // label: (tooltipItem, data) => {
                            //     const dataset = data.datasets[tooltipItem.datasetIndex];
                            //     const total = dataset.data.reduce((sum, value) => sum + value, 0);
                            //     const value = dataset.data[tooltipItem.index];
                            //     const percent = Math.round(value / total * 100);
                            //     return `${data.labels[tooltipItem.index]}: ${value} (${percent}%)`
                            // }
                        }
                    }
                },
                cutout: '50%',
                circumference: 180,
                rotation: -90,
                elements: {
                    arc: { borderWidth: 0 },
                },
            }
        }
    }
}
</script>