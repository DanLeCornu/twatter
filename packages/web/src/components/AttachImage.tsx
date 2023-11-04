import * as React from "react"
import type { DropzoneOptions, FileRejection } from "react-dropzone"
import { useDropzone } from "react-dropzone"
import type { BoxProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

import { useToast } from "lib/hooks/useToast"

export type AttachedImage = { file: File; preview: string }

interface Props extends Omit<BoxProps, "onSubmit"> {
  image: AttachedImage | null
  setImage: React.Dispatch<
    React.SetStateAction<{
      file: File
      preview: string
    } | null>
  >
  dropzoneOptions?: Omit<DropzoneOptions, "multiple" | "onDrop">
  isDisabled?: boolean
  children?: React.ReactNode
}

export function AttachImage({ children, isDisabled, image, setImage, dropzoneOptions, ...props }: Props) {
  const toast = useToast()

  const onDrop = React.useCallback(
    (files: File[], rejectedFiles: FileRejection[]) => {
      window.URL = window.URL || window.webkitURL
      if (rejectedFiles.length > 0) {
        const rejectedFile = rejectedFiles[0]
        if (rejectedFile.errors[0]?.code.includes("file-too-large")) {
          const description = `File too large, must be under ${
            (dropzoneOptions?.maxSize && `${dropzoneOptions.maxSize / 1000000}MB`) || "5MB"
          }`
          toast({ status: "error", title: "Invalid file", description })
        } else {
          toast({ status: "error", description: "Invalid file, please try another" })
        }
        return
      }
      if (files.length === 0) return
      setImage({ file: files[0], preview: window.URL.createObjectURL(files[0]) })
    },
    [toast, dropzoneOptions, setImage],
  )
  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 5000000, // 5MB
    ...dropzoneOptions,
    onDrop,
    multiple: false,
  })

  const handleRemoveFile = React.useCallback(() => {
    window.URL = window.URL || window.webkitURL
    if (image) window.URL.revokeObjectURL(image.preview)
  }, [image])

  React.useEffect(() => handleRemoveFile, [handleRemoveFile])

  return (
    <>
      <Box
        cursor={isDisabled ? "default" : "pointer"}
        {...getRootProps()}
        position="relative"
        w="fit-content"
        outline={isDisabled ? "none" : undefined}
        _hover={{ opacity: isDisabled ? undefined : 0.8 }}
        transition="200ms opacity"
        {...props}
      >
        <input disabled={isDisabled} {...getInputProps()} />
        {children}
      </Box>
    </>
  )
}
