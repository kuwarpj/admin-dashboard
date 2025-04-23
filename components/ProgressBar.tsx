import React from "react";

type ProgressBarProps = {
  labels: string[];
  values: number[];
  colors: string[];
  title: string;
  type: string;
};

const ProgressBar = ({
  labels,
  values,
  colors,
  title,
  type,
}: ProgressBarProps) => {
  const total = values.reduce((sum, val) => sum + val, 0);

  return (
    <div className="w-full max-w-xl p-4 bg-white rounded-lg shadow h-[257px]">
      <div className="flex flex-col gap-3 pb-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="flex flex-row gap-1">
          <span className="text-sm font-semibold">{total}</span>
          <span className="text-xs font-medium text-gray-700">{type}</span>
        </div>
      </div>
      <div className="flex w-full h-4 overflow-hidden rounded-full border border-gray-200">
        {values.map((value, index) => {
          const percentage = total ? (value / total) * 100 : 0;
          return (
            <div
              key={labels[index]}
              style={{
                width: `${percentage}%`,
                backgroundColor: colors[index],
              }}
              title={`${labels[index]}: ${value} (${percentage.toFixed(1)}%)`}
            />
          );
        })}
      </div>

      <div className="flex justify-between mt-3 flex-wrap gap-2">
        {labels.map((label, index) => (
          <div
            key={label}
            className="flex items-center gap-2 text-sm text-gray-800"
          >
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ backgroundColor: colors[index] }}
            />
            {label}: {values[index]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
