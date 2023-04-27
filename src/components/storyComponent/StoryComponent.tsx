import React from 'react'
import { Link } from "react-router-dom";
import { TStory } from '../../types/storyModel'




export const StoryComponent: React.FC<{ story: TStory }> = ({ story }) => {

    const timeFormat = new Date(story.time ? story.time * 1000 : 0);
    const displayDate = `${timeFormat.getDate()}.${timeFormat.getMonth() + 1}.${timeFormat.getFullYear()}`;

    return (
        <li className='px-2 mb-3 transition-all border-l border-yellow-700 rounded hover:bg-slate-600/30'>
            <Link to={`/story/${story.id}`}>
                <p className='text-lg font-bold underline'>{story?.title}</p>
                <div className='flex gap-2'>
                    <p className='text-slate-500'>Author: <span className='font-bold text-black'> {story.by}</span></p>
                    <p className='text-slate-500'>Comments: <span className='font-bold text-black'>{story?.kids?.length || 0}</span></p>
                    <p className='text-slate-500'>Score: <span className='font-bold text-black'>{story.score}</span></p>
                    <p className='text-slate-500'>Created: <span className='font-bold text-black'>{displayDate}</span></p>
                </div>
            </Link>
        </li>
    )
}