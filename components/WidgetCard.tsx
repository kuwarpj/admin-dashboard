import { DeleteIcon, PlusIcon, XIcon } from "lucide-react";
import React, { useState } from "react";

type WidgetCardProps = {
  category: string;
  widgets: { title: string; content: string }[];
  onAdd: (widget: { title: string; content: string }) => void;
  onRemove: (index: number) => void;
};

const WidgetCard = ({
  category,
  widgets,
  onAdd,
  onRemove,
}: WidgetCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addWidget = () => {
    if (title && content) {
      onAdd({ title, content });
      setTitle("");
      setContent("");
      setShowModal(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full gap-[70px] h-[257px]">
      <div className="flex flex-col h-full ">
        <div className="flex flex-wrap gap-2">
          {widgets.map((widget, i) => (
            <div
              key={i}
              className="relative w-[120px] bg-white border border-gray-200 rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <button
                onClick={() => onRemove(i)}
                className="absolute cursor-pointer top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <DeleteIcon className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-800">
                  {widget.title}
                </p>
                <p className="text-xs text-gray-500">{widget.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center items-center h-full">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center cursor-pointer gap-2 text-gray-400 border p-2 rounded-lg text-sm"
          >
            <PlusIcon />
            <span>Add Widget</span>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-xs flex items-center justify-center z-50 transition-opacity duration-300">
          <div
            className="bg-white rounded-xl p-6 shadow-lg transform transition-all duration-300 scale-100 opacity-100"
            style={{
              animation: "fadeInUp 0.3s ease-out",
            }}
          >
            <button
              className="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              <XIcon className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4 mt-2 text-gray-800">
              Add Widget to <span className="text-blue-500">{category}</span>
            </h2>

            <div className="flex flex-col gap-3">
              <input
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                onClick={addWidget}
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white text-sm px-4 py-2 rounded transition duration-200"
              >
                Add Widget
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WidgetCard;
