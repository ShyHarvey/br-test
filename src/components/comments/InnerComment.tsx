import React from 'react'
import useSWR from 'swr'
import { fetchComment } from '../../helpers/fetchers'


//вложенный комментарий
export const InnerComment: React.FC<{ commentId: number }> = ({ commentId }) => {

    const { data: comment } = useSWR(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`, async () => {
        let comment = await fetchComment(commentId)
        return comment
    })

    if (comment === undefined) return <></>

    return (
        <div className='p-2 my-3 border-l-2 border-black'>
            <p>Author: {comment.by}</p>
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />
            <div className='pl-3'>
                {(comment?.kids?.length !== undefined && comment?.kids?.length > 0) && comment?.kids.map(i => <InnerComment key={i} commentId={i} />)}
            </div>
        </div>
    )
}