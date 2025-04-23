import { WidgetMap } from "@/helper";
import {  X } from "lucide-react";
import React, { useEffect, useState } from "react";

type WidgetDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  widgets: WidgetMap;
  onConfirm: (updatedWidgets: any) => void;
};

const categories = [
  { label: "CSPM", value: "CSPM Executive Dashboard" },
  { label: "CWPP", value: "CWPP Dashboard" },
  { label: "Registry", value: "Registry Scan" },
];

const WidgetDrawer: React.FC<WidgetDrawerProps> = ({
  isOpen,
  onClose,
  widgets,
  onConfirm,
}) => {

  const [selectedTab, setSelectedTab] = useState<string>(categories[0].value);

  const [checkedState, setCheckedState] = useState(widgets);
  useEffect(() => {
    setCheckedState(widgets);
  }, [widgets]);

  const handleCheck = (category: string, index: number) => {
    const newWidgets = { ...checkedState };
    newWidgets[category][index].checked = !newWidgets[category][index].checked;
    setCheckedState(newWidgets);
  };

  const handleConfirm = () => {
    const cleaned = Object.fromEntries(
      categories.map((cat) => [
        cat.value,
        (checkedState[cat.value] || []).filter((widget: any) => widget.checked),
      ])
    );
    onConfirm(cleaned);
    setCheckedState(cleaned);
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-50 transition-transform flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-2 bg-blue-600 text-white border-b flex justify-between items-center">
        <h2 className="text-sm font-semibold">Add Widgets</h2>
        <button onClick={onClose} className="cursor-pointer">
          <X />
        </button>
      </div>

      <span className="text-gray-700 text-sm px-1 pt-2">
        Personalise your dashboard by adding the following widget
      </span>

      <div className="flex p-3 gap-4 border-b border-gray-200">
        {categories.map((cat) => (
          <div
            key={cat.value}
            onClick={() => setSelectedTab(cat.value)}
            className={`cursor-pointer pb-2 transition-all duration-200 text-sm font-medium
        ${
          selectedTab === cat.value
            ? "border-b-2 border-[#050F3C] text-[#050F3C]"
            : "border-b-2 border-transparent text-gray-600"
        }`}
          >
            {cat.label}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {(checkedState[selectedTab] || []).map((widget: any, index: number) => (
          <div
            key={index}
            className="flex gap-2 items-center border border-gray-200 rounded-lg px-4 py-2 mb-1"
          >
            <input
              type="checkbox"
              checked={widget.checked ?? true}
              onChange={() => handleCheck(selectedTab, index)}
            />
            <span className="text-red-600 text-sm font-semibold">
              {widget.title}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 items-center px-3 py-3 ">
        <button
          onClick={onClose}
          className="px-3 cursor-pointer py-1 border border-[#050F3C] rounded "
        >
          Cancle
        </button>
        <button
          className="bg-[#050F3C] cursor-pointer text-white px-3 py-1 rounded"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default WidgetDrawer;
