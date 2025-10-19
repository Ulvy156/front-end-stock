// useNotification.ts
import { ElNotification } from "element-plus";

type NotifyType = "success" | "warning" | "info" | "error";

interface NotifyOptions {
  title?: string;
  message: string;
  type?: NotifyType;
  duration?: number; // in ms
}

export function notify({ title, message, type = "info", duration = 3000 }: NotifyOptions) {
  ElNotification({
    title: title || type.charAt(0).toUpperCase() + type.slice(1),
    message,
    type,
    duration,
  });
}
