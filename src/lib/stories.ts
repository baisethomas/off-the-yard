import { getAdminDb } from './firebaseAdmin'
import { Story } from '@/types/story'

export async function getStories(limit: number = 20): Promise<Story[]> {
  try {
    const adminDb = await getAdminDb()
    if (!adminDb) {
      return []
    }

    let storiesSnapshot
    try {
      storiesSnapshot = await adminDb
        .collection('stories')
        .orderBy('publishedAt', 'desc')
        .limit(limit)
        .get()
    } catch (error) {
      storiesSnapshot = await adminDb
        .collection('stories')
        .limit(limit)
        .get()
    }

    const stories: Story[] = []
    storiesSnapshot.forEach((doc) => {
      stories.push({
        id: doc.id,
        ...doc.data(),
      } as Story)
    })

    return stories
  } catch (error) {
    console.error('Error fetching stories:', error)
    return []
  }
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  try {
    const adminDb = await getAdminDb()
    if (!adminDb) {
      return null
    }

    const storiesSnapshot = await adminDb
      .collection('stories')
      .where('slug', '==', slug)
      .limit(1)
      .get()

    if (storiesSnapshot.empty) {
      return null
    }

    const doc = storiesSnapshot.docs[0]
    return { id: doc.id, ...doc.data() } as Story
  } catch (error) {
    console.error('Error fetching story:', error)
    return null
  }
}

