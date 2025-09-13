import { ElMessage } from 'element-plus'
type MessageBoxType = "success" | "warning" | "info" | "error";


export const openMessageBox = (msg: string = '', type: MessageBoxType = 'success') => {
  ElMessage({
    message: msg,
    type: type,
  })
}
