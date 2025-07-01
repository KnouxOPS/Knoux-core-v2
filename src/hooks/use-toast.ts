import { useState, useCallback } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  duration?: number;
}

export interface ToastState {
  toasts: Toast[];
}

let toastCount = 0;

function generateId() {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
  return toastCount.toString();
}

const toastListeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

function dispatch(action: { type: string; toast?: Toast; toastId?: string }) {
  switch (action.type) {
    case "ADD_TOAST":
      if (action.toast) {
        memoryState.toasts.push(action.toast);
      }
      break;
    case "UPDATE_TOAST":
      if (action.toast) {
        memoryState.toasts = memoryState.toasts.map((t) =>
          t.id === action.toast!.id ? { ...t, ...action.toast } : t,
        );
      }
      break;
    case "REMOVE_TOAST":
      if (action.toastId) {
        memoryState.toasts = memoryState.toasts.filter(
          (t) => t.id !== action.toastId,
        );
      }
      break;
  }

  toastListeners.forEach((listener) => {
    listener(memoryState);
  });
}

function toast({ ...props }: Omit<Toast, "id">) {
  const id = generateId();

  const update = (props: Partial<Toast>) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });

  const dismiss = () => dispatch({ type: "REMOVE_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      duration: props.duration ?? 5000,
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = useState<ToastState>(memoryState);

  useState(() => {
    toastListeners.push(setState);
    return () => {
      const index = toastListeners.indexOf(setState);
      if (index > -1) {
        toastListeners.splice(index, 1);
      }
    };
  });

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "REMOVE_TOAST", toastId }),
  };
}

export { useToast, toast };
