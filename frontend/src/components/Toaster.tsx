"use client"

import * as ToastPrimitives from "@radix-ui/react-toast"

export function Toaster() {
  return (
    <ToastPrimitives.Provider>
      <ToastPrimitives.Root />
      <ToastPrimitives.Viewport className="fixed top-0 right-0 z-50 w-full max-w-sm p-4" />
    </ToastPrimitives.Provider>
  )
}

// Export the toast function for use in the app
export const toast = {
  success: (_message: string) => {
    // Implementation for success toast
    console.log("Success:", _message)
  },
  error: (_message: string) => {
    // Implementation for error toast
    console.error("Error:", _message)
  },
}
