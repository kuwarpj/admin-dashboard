const DASHBOARD_WIDGETS_KEY = "dashboard_widgets";

export const getStoredWidgets = () => {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem(DASHBOARD_WIDGETS_KEY);
  return data ? JSON.parse(data) : {};
};

export const saveWidgets = (data: any) => {
  localStorage.setItem(DASHBOARD_WIDGETS_KEY, JSON.stringify(data));
};


export type Widget = {
    title: string;
    content: string;
    checked?: boolean;
  };
  
  export type WidgetMap = {
    [category: string]: Widget[];
  };
