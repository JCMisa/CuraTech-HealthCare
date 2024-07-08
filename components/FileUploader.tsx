"use client"

import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void,
}

const FileUploader = ({files, onChange}: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles : File[]) => {
    onChange(acceptedFiles)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt='uploaded image'
            className='max-h-[400px] overflow-hidden object-cover'
        />
      ) : (
        <>
            <Image
                src="/assets/icons/upload.svg"
                width={40}
                height={40}
                alt='upload'
            />
            <div className='file-upload-label'>
                <p className='text-14-regular text-gray-400'>
                    <span className='text-green-500'>
                        Click here to upload
                    </span>
                    {""} or drop them here.
                </p>
                <p className='text-gray-400'>
                    SVG, PNG, JPG or GIF (max 800x400)
                </p>
            </div>
        </>
      )}
    </div>
  )
}

export default FileUploader