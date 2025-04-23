"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChartProps = {
  title?: string;
  labels?: string[];
  data?: number[];
  colors?: string[];
};

const PieChart = ({
  title,
  labels = [],
  data = [],
  colors = [],
}: PieChartProps) => {
  const chartColors = colors || ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"];

  const hasData = labels?.length > 0 && data?.length > 0;

  if (!hasData) {
    return (
      <div className="bg-white flex flex-col justify-center items-center gap-3 p-6 rounded-lg shadow text-center text-sm text-gray-500 h-[257px]">
        <div>
          <img src="image.png" width={30} />
        </div>

        <div>No workspace data available</div>
      </div>
    );
  }

  const centerTextPlugin: Plugin = {
    id: "centerTextPlugin",
    beforeDraw(chart) {
      const { width, height, ctx } = chart;
      const dataset = chart.data.datasets[0];
      if (!ctx || !dataset || !dataset.data) return;

      const total = dataset.data.reduce(
        (acc: number, val: any) => acc + Number(val),
        0
      );

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";

      ctx.font = "bold 16px Arial";
      ctx.fillText(`${total}`, width / 2, height / 2 - 6);

      ctx.font = "normal 12px Arial";
      ctx.fillText("Total", width / 2, height / 2 + 12);

      ctx.restore();
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Data",
        data,
        backgroundColor: chartColors,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "65%", 
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col ">
      {title && <h3 className="text-sm font-semibold">{title}</h3>}

      <div className="flex gap-[70px] items-center">
        <div style={{ width: "200px" }}>
          <Doughnut
            data={chartData}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </div>

        <div className="flex flex-col gap-2 pr-10">
          {labels.map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: chartColors[index] }}
              ></span>
              <span className="text-xs text-gray-800 font-semibold">
                {label} [{data[index]}]
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
