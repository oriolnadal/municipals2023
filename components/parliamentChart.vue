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
registerables,
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
                parties = [...this.parties, { name: 'Empty', seats: emptySeats, color:'#fff'}]
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
                        padding: 12,
                        usePointStyle: true,
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        titleColor: '#334155',
                        titleFont: {size: 16},
                        bodyFont: {size: 18},
                        bodyColor: '#334155',
                        borderWidth: 0,
                        displayColors: true,
                        caretSize: 0,
                        cornerRadius: 8,
                        filter: function (tooltipItem) {
                            return tooltipItem.label !== 'Empty';
                        },
                        callbacks: {
                            // title: (data) => {
                            //     let tooltipItem = data[0];
                            //     return tooltipItem.label + ', ' +  tooltipItem.parsed;
                            // },
                            labelPointStyle: () => {
                                return {pointStyle: 'circle', radius:5, borderWidth:5, borderColor:'rgba(0,0,0)', hoverBorderWidth:0};
                            }
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
