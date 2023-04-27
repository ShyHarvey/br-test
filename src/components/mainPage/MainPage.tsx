import React from 'react'
import useSWR from 'swr'
import { fetchStoriesId, fetchStory } from '../../helpers/fetchers';
import { StoryComponent } from '../storyComponent/StoryComponent';
import { TStory } from '../../types/storyModel';

export const MainPage: React.FC<{}> = () => {
    const { data: stories, isLoading, isValidating, error, mutate } = useSWR<TStory[]>('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
        async () => {
            const storyIds = await fetchStoriesId()
            const top100StoryIds = storyIds.slice(0, 100);
            const top100Stories = await Promise.all(
                top100StoryIds.map(async (storyId) => {
                    const story = await fetchStory(storyId);
                    return story
                })
            );
            return top100Stories.sort((a, b) => b.time - a.time);
        }
        , {
            refreshInterval: 60_000,
            dedupingInterval: 60_000
        })

    if (error) {
        return <div className='container py-5 mx-auto'>
            <p className='text-2xl font-bold text-red-700'>Error</p>
            <button onClick={() => mutate()} className='px-4 py-1 text-lg rounded bg-slate-400'>Reload</button>
        </div>;
    }

    if (isLoading) {
        return <div className='container py-5 mx-auto'>Loading...</div>;
    }

    return (
        <div>
            <div className='container py-5 mx-auto'>
                <div className='flex items-center gap-2 mb-3'>
                    <button onClick={() => mutate()} className='px-4 py-1 text-lg font-bold text-white transition rounded-lg bg-slate-700 hover:bg-red-700'>Refresh</button>
                    {isValidating && <p>Refreshing in progress...</p>}
                </div>

                <ul>
                    {stories?.map(i => (
                        <StoryComponent key={i.id} story={i} />
                    ))}
                </ul>

            </div>
        </div>
    )
}