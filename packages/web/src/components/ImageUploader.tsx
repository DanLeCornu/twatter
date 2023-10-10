import * as React from "react"
import type { DropzoneOptions, FileRejection } from "react-dropzone"
import { useDropzone } from "react-dropzone"
import type { BoxProps } from "@chakra-ui/react"
import { AspectRatio } from "@chakra-ui/react"
import { Box, Button, Image, useDisclosure } from "@chakra-ui/react"

import { useS3Upload } from "lib/hooks/useS3"
import { useToast } from "lib/hooks/useToast"

import { ButtonGroup } from "./ButtonGroup"
import { Modal } from "./Modal"

interface Props extends Omit<BoxProps, "onSubmit"> {
  path: string
  onSubmit: (key: string) => Promise<any> | any
  type?: "avatar" | "box"
  dropzoneOptions?: Omit<DropzoneOptions, "multiple" | "onDrop">
  isDisabled?: boolean
  children?: React.ReactNode
}

export function ImageUploader({
  path,
  onSubmit,
  type = "box",
  dropzoneOptions,
  isDisabled,
  children,
  ...props
}: Props) {
  const modalProps = useDisclosure()
  const toast = useToast()
  const [image, setImage] = React.useState<{ file: File; preview: string } | null>(null)

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
          // TODO: add remaining error handlers
          toast({ status: "error", description: "Invalid file, please try another" })
        }
        return
      }
      if (files.length === 0) return
      setImage({ file: files[0], preview: window.URL.createObjectURL(files[0]) })
      modalProps.onOpen()
    },
    [toast, modalProps, dropzoneOptions],
  )
  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 5000000, // 5MB
    ...dropzoneOptions,
    onDrop,
    multiple: false,
  })
  const [upload, { loading }] = useS3Upload({ path })

  const handleSubmitImage = async () => {
    if (!image || !image.file) return
    try {
      const uploadedFile = (await upload(image.file)).fileKey
      await onSubmit(uploadedFile)
      handleClose()
    } catch (e) {
      console.log(e)
      toast({ status: "error", description: "Error uploading image, please try again." })
    }
  }

  const handleClose = () => {
    modalProps.onClose()
    setImage(null)
  }

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
      <Modal {...modalProps} onClose={handleClose} title="Upload new image">
        {image && (
          <AspectRatio ratio={1}>
            <Image
              alt="image preview"
              objectFit="contain"
              w="100%"
              p={6}
              maxH="400px"
              src={image.preview}
              rounded={type === "avatar" ? "full" : undefined}
            />
          </AspectRatio>
        )}
        <ButtonGroup>
          <Button variant="ghost" isDisabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button colorScheme="primary" isLoading={loading} isDisabled={loading} onClick={handleSubmitImage}>
            Submit
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
