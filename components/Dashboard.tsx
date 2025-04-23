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

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    { category: string; title: string }[]
  >([]);
  const [showDropdown, setShowDropdown] = useState(false);


  console.log("This is clean",widgets)
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const results: { category: string; title: string }[] = [];
    Object.entries(widgets).forEach(([category, widgetList]) => {
      widgetList.forEach((widget: any) => {
        if (widget.title.toLowerCase().includes(term.toLowerCase())) {
          results.push({ category, title: widget.title });
        }
      });
    });

    setSearchResults(results);
    setShowDropdown(true);
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
        <div className="relative w-full max-w-sm">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 bg-white shadow-sm">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none text-sm text-gray-700 bg-transparent placeholder:text-gray-400"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {showDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto text-sm">
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <span className="font-semibold">{result.title}</span>{" "}
                    <span className="text-gray-500">({result.category})</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No result found</div>
              )}
            </div>
          )}
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
