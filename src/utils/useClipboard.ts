import { openMessageBox } from "@/composables/useMessageBox";

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    openMessageBox("អត្ថបទត្រូវបានចម្លង");
  } catch (err) {
    openMessageBox(err as string, 'error')
    console.error("Failed to copy: ", err)
    return false
  }
}

export const pasteFromClipboard = async (): Promise<string | null> => {
  try {
    const text = await navigator.clipboard.readText()
    return text
  } catch (err) {
    openMessageBox(err as string, 'error')
    console.error("Failed to paste: ", err)
    return null
  }
}
