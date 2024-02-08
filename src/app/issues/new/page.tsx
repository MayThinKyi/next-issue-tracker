'use client';

import dynamic from 'next/dynamic';
const CreateIssuePage = () => {
 // remove ssr, otherwise will cause ReferenceError: navigator is not defined

const IssueForm = dynamic(() => import('@/app/components/issues/IssueForm'), {
  ssr: false
})
  return (
    <>
    <IssueForm/>
    </>
  )
}

export default CreateIssuePage
