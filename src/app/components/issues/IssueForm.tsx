'use client';
import { Issue } from '@prisma/client'
import React from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes';
import  { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { createIssueSchema, editIssueSchema } from '@/schema/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
type Props={
    issueForm?:Issue;
}

const IssueForm = ({issueForm}:Props) => {
    const [isError,setIsError]=useState(false);
    const router=useRouter();
      type createIssueFormType=z.infer<typeof createIssueSchema>;
      type editIssueFormType=z.infer<typeof editIssueSchema>;
      const {register,handleSubmit,formState:{errors,isSubmitting},control}=useForm<createIssueFormType>({
          resolver:zodResolver(createIssueSchema)
      });
      const submitHandler=async(formData:createIssueFormType |editIssueFormType )=>{
         try {
          if(issueForm) {
            const res=await axios.put(`/api/issues/${issueForm.id}`,formData);
            const data=await res.data;
          }else {
            const res=await axios.post('/api/issues',formData);
            const data=await res.data;
          }
           router.push('/issues/list');
           router.refresh();
         } catch (error) {
            setIsError(true);
            console.log(error);
         }
      }
  return (<>
    {isError &&  <Callout.Root className='mb-4' color="red">
    <Callout.Text>
     An unexpected error has occurred!
    </Callout.Text>
  </Callout.Root> }
    <form onSubmit={handleSubmit(submitHandler)} className='lg:w-[40%]'>
        {errors.title && <small className="text-red-500">{errors.title?.message}</small>}
      <TextField.Root className='mb-4'>
        <TextField.Input placeholder="Title…" defaultValue={issueForm?.title}  {...register('title')}  />
    </TextField.Root>
    {errors.description && <small className="text-red-500">{errors.description?.message}</small>}
    <Controller
          name="description"
          control={control}
          defaultValue={issueForm?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
    <Button disabled={isSubmitting}>
      {isSubmitting && 'Loading.....'}
      {issueForm && 'Update Issue'}
      {!issueForm && 'Create new Issue'}
    </Button>
    </form>
    </>
  )
}

export default IssueForm
