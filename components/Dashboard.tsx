"use client";
import React from "react";
import PieChart from "./PieChart";
import { cloudAccount, riskAssessment } from "@/mockdata";
import WidgetCard from "./WidgetCard";

const Dashboard = () => {
  return (
    <div className="bg-[#F0F5FA] pb-10 px-10">
      <div className="flex flex-row justify-between px-3">
        <div>CNAPP Dashboard</div>
        <div className="flex flex-row gap-3">
          <div>Widget</div>
          <div>ref</div>
          <div>::</div>
          <div>Filter</div>
        </div>
      </div>

      <div className="flex flex-col gap-1 pt-3">
        <span className="text-black font-semibold text-[18px]">
          CSPM Executive Dashboard
        </span>

        <div className="flex flex-row gap-4">
          <div className="w-[470px]">
            <PieChart
              title="Cloud Accounts"
              labels={cloudAccount?.cloudAccountLabel}
              data={cloudAccount?.cloudAccountValue}
              colors={cloudAccount?.cloudAccountColors}
            />
          </div>

          <div className="w-[470px]">
            <PieChart
              title="Cloud Account Risk Assessment"
              labels={riskAssessment?.riskLable}
              data={riskAssessment?.riskValue}
              colors={riskAssessment?.riskColors}
            />
          </div>
          <div className="w-[470px]">
            <WidgetCard />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 pt-3">
        <span className="text-black font-semibold text-[18px]">
          CWPP Dashboard
        </span>

        <div className="flex flex-row gap-4">
          <div className="w-[470px]">
            <PieChart
              title="Top 5 Namespace Specific Alerts"
            //   labels={cloudAccount?.cloudAccountLabel}
            //   data={cloudAccount?.cloudAccountValue}
            //   colors={cloudAccount?.cloudAccountColors}
            />
          </div>

          <div className="w-[470px]">
            <PieChart
              title="Workloads Alerts"
            
            />
          </div>
          <div className="w-[470px]">
            <WidgetCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
