"use client";
import React, { useState } from "react";
import PieChart from "./PieChart";
import {
  cloudAccount,
  imageRiskAssessment,
  imageSecurityIssues,
  riskAssessment,
} from "@/mockdata";
import WidgetCard from "./WidgetCard";
import ProgressBar from "./ProgressBar";
import { getStoredWidgets, saveWidgets, WidgetMap } from "@/helper";
import WidgetDrawer from "./WidgetDrawer";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  EllipsisVertical,
  PlusIcon,
  RefreshCcw,
  Search,
} from "lucide-react";

const Dashboard = () => {
  const [widgets, setWidgets] = useState<WidgetMap>(getStoredWidgets());

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddWidget = (
    category: string,
    widget: { title: string; content: string }
  ) => {
    const updated = {
      ...widgets,
      [category]: [...(widgets[category] || []), widget],
    };
    setWidgets(updated);
    saveWidgets(updated);
  };

  const handleRemoveWidget = (category: string, index: number) => {
    const updated = {
      ...widgets,
      [category]: widgets[category].filter((_: any, i: any) => i !== index),
    };
    setWidgets(updated);
    saveWidgets(updated);
  };
  return (
    <div>
      <div className="flex items-center justify-between px-10 py-2">
        <div className=" flex items-center">
          <div className="text-xs font-semibold text-gray-400 ">Home </div>
          <div className="text-xs text-gray-400">
            <ChevronRight width={18} />
          </div>
          <div className="text-xs font-semibold text-[#2684FC]">
            Dashboard V2
          </div>
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 w-full max-w-sm bg-white shadow-sm">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none text-sm text-gray-700 bg-transparent placeholder:text-gray-400"
          />
        </div>
      </div>
      <div className="bg-[#F0F5FA] pb-10 px-10">
        <div className="flex flex-row justify-between  pt-3">
          <div className="font-semibold text-base text-black">
            CNAPP Dashboard
          </div>
          <div className="flex flex-row gap-1">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className=" cursor-pointer flex items-center gap-2 bg-white border  border-gray-200 rounded-sm text-black text-sm px-4 py-2  transition duration-200"
            >
              <span>Add Category</span>
              <span className="">
                <PlusIcon width={18} />
              </span>
            </button>
            <div className="cursor-pointer flex items-center gap-2 bg-white border  border-gray-200 rounded-sm text-black text-xs px-2  transition duration-200">
              <RefreshCcw width={18} />
            </div>
            <div className="cursor-pointer flex items-center gap-2 bg-white border  border-gray-200 rounded-sm text-black text-xs px-2  transition duration-200">
              <EllipsisVertical width={18} />
            </div>
            <div className="flex items-center gap-2 border border-[#050F3C] text-[#050F3C] font-semibold rounded-sm p-2 text-sm">
              <div>
                <Clock width={18} stroke="#050F3C" />
              </div>
              <div>Last 2 days</div>
              <div>
                <ChevronDown width={18} stroke="#050F3C" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-3">
          <span className="text-black font-semibold text-sm">
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
              <WidgetCard
                category="CSPM Executive Dashboard"
                widgets={widgets["CSPM Executive Dashboard"] || []}
                onAdd={(widget: any) =>
                  handleAddWidget("CSPM Executive Dashboard", widget)
                }
                onRemove={(index: any) =>
                  handleRemoveWidget("CSPM Executive Dashboard", index)
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-3">
          <span className="text-black font-semibold text-sm">
            CWPP Dashboard
          </span>

          <div className="flex flex-row gap-4">
            <div className="w-[470px]">
              <PieChart title="Top 5 Namespace Specific Alerts" />
            </div>

            <div className="w-[470px]">
              <PieChart title="Workloads Alerts" />
            </div>
            <div className="w-[470px]">
              <WidgetCard
                category="CWPP Dashboard"
                widgets={widgets["CWPP Dashboard"] || []}
                onAdd={(widget) => handleAddWidget("CWPP Dashboard", widget)}
                onRemove={(index) =>
                  handleRemoveWidget("CWPP Dashboard", index)
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-3">
          <span className="text-black font-semibold text-sm">
            Registry Scan
          </span>

          <div className="flex flex-row gap-4">
            <div className="w-[470px]">
              <ProgressBar
                title="Image Risk Assessment"
                type="Total Vulnerabillities"
                labels={imageRiskAssessment.riskLable}
                values={imageRiskAssessment.riskValue}
                colors={imageRiskAssessment.riskColors}
              />
            </div>

            <div className="w-[470px]">
              <ProgressBar
                title="Image Security Issues"
                type="Total Images"
                labels={imageSecurityIssues.riskLable}
                values={imageSecurityIssues.riskValue}
                colors={imageSecurityIssues.riskColors}
              />
            </div>
            <div className="w-[470px]">
              <WidgetCard
                category="Registry Scan"
                widgets={widgets["Registry Scan"] || []}
                onAdd={(widget) => handleAddWidget("Registry Scan", widget)}
                onRemove={(index) => handleRemoveWidget("Registry Scan", index)}
              />
            </div>
          </div>
        </div>

        <div>
          <WidgetDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            widgets={widgets}
            onConfirm={(updatedWidgets: any) => {
              setWidgets(updatedWidgets);
              saveWidgets(updatedWidgets);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
