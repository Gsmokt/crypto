import React from 'react';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import {  Line } from 'react-chartjs-2';
Chart.register(CategoryScale);

const HistoryCoin = ({historyCoin}) => {

    return (

        <Line data={{labels: historyCoin.prices.map(coin => {
            const data = new Date(coin[0]).toLocaleDateString();
            return data;
}),
                    datasets: [{data: historyCoin.prices.map(coin => coin[1]),label: `Price for the previous 30 days in Euros`, borderColor: 'green', borderWidth: 1}]
                    }} options={{elements: {point : {radius: 1}}}} />
            
       
    );
};

export default HistoryCoin;