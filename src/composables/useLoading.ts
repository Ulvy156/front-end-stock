import { ElLoading } from "element-plus";
import type { LoadingInstance } from "element-plus/es/components/loading/src/loading";

let loadingInstance: LoadingInstance | null = null;

export function startLoading(text = "Loading") {
  if (!loadingInstance) {
    loadingInstance = ElLoading.service({
      lock: true,
      text,
      background: "rgba(0, 0, 0, 0.7)",
    });
  }
}

export function stopLoading() {
  if (loadingInstance) {
    loadingInstance.close();
    loadingInstance = null;
  }
}
