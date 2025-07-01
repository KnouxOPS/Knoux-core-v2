import React from "react";
import { useContext } from "react";
import { NotificationContext } from "@/contexts/NotificationContext";
import { X } from "lucide-react";

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);

  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            p-4 rounded-lg shadow-lg backdrop-blur-sm border
            flex items-center justify-between min-w-[300px] max-w-[400px]
            transition-all duration-300 ease-in-out
            ${notification.type === "success" ? "bg-green-500/90 border-green-400 text-white" : ""}
            ${notification.type === "error" ? "bg-red-500/90 border-red-400 text-white" : ""}
            ${notification.type === "warning" ? "bg-yellow-500/90 border-yellow-400 text-black" : ""}
            ${notification.type === "info" ? "bg-blue-500/90 border-blue-400 text-white" : ""}
          `}
        >
          <span className="text-sm font-medium">{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-3 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
