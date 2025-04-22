"use client";
import React from "react";
import PieChart from "./PieChart";
import { cloudAccount, riskAssessment } from "@/mockdata";

const Dashboard = () => {
  return (
    <div className="bg-[#F0F5FA] pb-10">
      <div className="flex flex-row justify-between px-3">
        <div>CNAPP Dashboard</div>
        <div className="flex flex-row gap-3">
          <div>Widget</div>
          <div>ref</div>
          <div>::</div>
          <div>Filter</div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span>CSPM Executive Dashboard</span>

        <div className="flex flex-row gap-4">
          <div>
            <PieChart
              title="Cloud Accounts"
              labels={cloudAccount?.cloudAccountLabel}
              data={cloudAccount?.cloudAccountValue}
              colors={cloudAccount?.cloudAccountColors}
            />
          </div>

          <div>
            <PieChart
              title="Cloud Account Risk Assessment"
              labels={riskAssessment?.riskLable}
              data={riskAssessment?.riskValue}
              colors={riskAssessment?.riskColors}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
