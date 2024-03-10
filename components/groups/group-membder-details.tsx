import { IMembership } from '@/interface-d'
import React from 'react'

type Props = {
    members: IMembership[], //array of all members
    pendingMembers?: string[], //array of all pending members
    groupCreatorId: string /*display pending members only if the currently sign
    in user is the group creator*/
}

const GroupMemberDetails = (props: Props) => {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>

            </div>
        </div>
    )
}

export default GroupMemberDetails