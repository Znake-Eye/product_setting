<template>
    <Navigation />
    <h1>Contact page vue for beginner</h1>
    <div>
        <apexchart widht="70%" height="400"  type="area" :options="options" :series="series"></apexchart>
    </div>
</template>
<script>
    // import VueApexCharts from 'vue-apexcharts'

    export default{
        data(){
            return {
                options: {
                    chart: {
                        id: 'vuechart-example'
                    },
                    xaxis: {
                        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sep","Oct","Nov","Dec"]
                    },
                    stroke: {
                        width : 1,
                        curve: 'smooth',
                    },
                    colors: ['#2E93fA', '#66DA26']
                    
                },
                series: [
                    {
                        name: 'series-1',
                        data: [3000, 4000, 4500, 5000, 4900, 6000, 7000, 9100,1000,1500,3500,2300]
                    },
                    {
                        name: 'series-2',
                        data: [7000,2000,4000,5000,3000,7000,8000,9000,2500,1500,4500,3000]
                    }
                ]
            }
        }
    }

</script>