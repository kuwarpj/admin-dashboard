import { PlusIcon } from "lucide-react";
import React from "react";

const WidgetCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center gap-[70px] h-[257px]">
      <button className="flex items-center cursor-pointer gap-2 text-gray-400 border p-2 rounded-lg text-sm ">
        <div>
          <PlusIcon />
        </div>
        <div>Add Widget</div>
      </button>
    </div>
  );
};

export default WidgetCard;
