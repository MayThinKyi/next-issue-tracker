import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes';
import React from 'react'
type Props={
    status:Status;
}
const StatusBadge = ({status}:Props) => {
    const color=status === 'OPEN' ? 'purple' : status==='IN_PROGRESS' ? 'green' : 'red'
  return (
    <Badge color={color}>{status}</Badge>
  )
}

export default StatusBadge
