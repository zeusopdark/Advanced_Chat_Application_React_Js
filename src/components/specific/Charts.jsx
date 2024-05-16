import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js"; // Import the Chart component

// Import Chart.js elements
import {
  ArcElement,
  CategoryScale,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { green, lighterGreen, orange } from "../../constants/color";
import { getLast7days } from "../../lib/features";

const labels = getLast7days();

Chart.register(
  CategoryScale,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};
const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
};

export const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: value,
        fill: true,
        borderColor: green,
        backgroundColor: lighterGreen,
      },
    ],
  };

  return <Line data={data} options={lineChartOptions} />;
};

export const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Total Chats vs Group Chats",
        data: value,
        borderColor: [green, orange],
        backgroundColor: [lighterGreen, orange],
        offset: 30,
      },
    ],
  };

  return (
    <Doughnut
      style={{ zIndex: 2 }}
      data={data}
      options={doughnutChartOptions}
    />
  );
};
