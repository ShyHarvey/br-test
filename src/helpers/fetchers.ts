import { TComment } from "../types/commentModel"
import type { TStory } from "../types/storyModel"

export const fetchStoriesId = (): Promise<number[]> => fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty').then(r => r.json())

export const fetchStory = (id: number): Promise<TStory> => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then(r => r.json())

export const fetchComment = (id: number): Promise<TComment> => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then(r => r.json())