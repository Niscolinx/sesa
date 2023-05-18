import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from 'react-query'
import useAxios from 'src/components/hooks/UseAxios'

function api() {
  
    
    const axiosInstance = useAxios()

     const [responseMessage, setResponseMessage] =
         useState<ResponseMessage | null>(null)

     const postAdmin = (data: Inputs) => {
         return axiosInstance({
             url: '/admin/create',
             method: 'post',
             data,
             headers: { 'Content-Type': 'multipart/form-data' },
         })
     }

     const queryClient = useQueryClient()
     const { mutate, isLoading } = useMutation(postAdmin, {
         onSuccess: () => {
             handleOpen()
         },
         onError: (err: any) => {
             setResponseMessage({
                 className: 'text-red-600',
                 displayMessage: err?.response.data.message,
             })
         },
         onSettled: () => {
             queryClient.invalidateQueries('admin')
         },
     }) as any

    return {api}
}

export default api