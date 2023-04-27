import React, { useState } from 'react'
import useSWR from 'swr'
import { fetchComment } from '../../helpers/fetchers'
import { InnerComment } from './InnerComment'
import { Transition } from '@headlessui/react'

export const Comment: React.FC<{ commentId: number }> = ({ commentId }) => {

    const [showInnerComments, setShowInnerComments] = useState(false)

    const { data: comment } = useSWR(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`, async () => {
        let comment = await fetchComment(commentId)
        return comment
    })

    if (comment === undefined) return <></>

    return (
        <div onClick={() => setShowInnerComments(p => !p)} className={`p-2 my-3 border-l-2 border-black 
        ${(comment?.kids?.length !== undefined && comment?.kids?.length > 0) && 'cursor-pointer hover:bg-slate-600/30'}`}>

            <p className='font-bold'>Author: {comment.by}</p>
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />
            {(comment?.kids?.length !== undefined && comment?.kids?.length > 0) && <p className='inline-block p-1 mt-1 border border-red-600 rounded'>Click to open/close the answers</p>}
            <Transition
                show={showInnerComments}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className={`pl-3`}>
                    {(comment?.kids?.length !== undefined && comment?.kids?.length > 0) && comment?.kids.map(i => <InnerComment key={i} commentId={i} />)}
                </div>
            </Transition>
        </div>
    )
}