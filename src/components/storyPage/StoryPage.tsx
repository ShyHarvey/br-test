import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { fetchComment, fetchStory } from '../../helpers/fetchers'
import { Comment } from '../comments/Comment'


export const StoryPage: React.FC<{}> = () => {

    let { id } = useParams()
    const navigate = useNavigate()

    let storyId = id ? +id : 1


    const { data, isLoading, isValidating, error, mutate } = useSWR(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`, async () => {
        let story = await fetchStory(storyId)
        const comments = await Promise.all(
            story.kids.map(async (commentId) => {
                const comment = await fetchComment(commentId);
                return comment
            })
        )
        return { story, comments }
    })

    const { story, comments } = data ?? {}

    const timeFormat = new Date(story?.time ? story.time * 1000 : 0);
    const displayDate = `${timeFormat.getDate()}.${timeFormat.getMonth() + 1}.${timeFormat.getFullYear()}`;

    if (error) {
        return <div className='container mx-auto'>
            <p>Error</p>
            <div className='flex items-center gap-2 mb-3'>
                <button onClick={() => mutate()} className='px-4 py-1 text-lg font-bold text-white transition rounded-lg bg-slate-700 hover:bg-red-700'>Refresh</button>
                {isValidating && <p>Refreshing...</p>}
            </div>
            <button className='px-2 text-lg font-bold text-white transition rounded-lg bg-slate-700 hover:bg-red-700'
                onClick={() => navigate(-1)}>
                &lt;--Go back
            </button>
        </div>
    }
    if (isLoading) {
        return <div className='container mx-auto'>
            <p>Loading...</p>
        </div>
    }

    return (
        <div className='container py-5 mx-auto'>
            <button className='px-2 text-lg font-bold text-white transition rounded-lg bg-slate-700 hover:bg-red-700'
                onClick={() => navigate(-1)}>
                &lt;--Go back
            </button>
            <p className='text-4xl font-bold'>{story?.title}</p>
            <a className='text-blue-700 underline hover:text-blue-500' target='_blank' href={story?.url}>Link to original</a>
            <p className='text-slate-500'>Author: <span className='font-bold text-black'> {story?.by}</span></p>
            <p className='text-slate-500'>Created: <span className='font-bold text-black'>{displayDate}</span></p>
            <p className='text-slate-500'>Comments: <span className='font-bold text-black'>{story?.kids ? story?.kids.length : 0}</span></p>
            <div className='flex items-center gap-2 mb-3'>
                <button onClick={() => mutate()} className='px-4 py-1 text-lg font-bold text-white transition rounded-lg bg-slate-700 hover:bg-red-700'>Refresh comments</button>
                {isValidating && <p>Refreshing comments...</p>}
            </div>
            <div>
                {comments !== undefined && comments?.length > 0 ? comments.map(i => <Comment key={i.id} commentId={i.id} />) : <p>No comments yet</p>}
            </div>
        </div>
    )
}