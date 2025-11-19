import { getAdminDb } from './firebaseAdmin'
import { Collection } from '@/types/collection'

export async function getCollections(limit: number = 20): Promise<Collection[]> {
  try {
    const adminDb = await getAdminDb()
    if (!adminDb) {
      return []
    }

    let collectionsSnapshot
    try {
      collectionsSnapshot = await adminDb
        .collection('collections')
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get()
    } catch (error) {
      collectionsSnapshot = await adminDb
        .collection('collections')
        .limit(limit)
        .get()
    }

    const collections: Collection[] = []
    collectionsSnapshot.forEach((doc) => {
      collections.push({
        id: doc.id,
        ...doc.data(),
      } as Collection)
    })

    return collections
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const adminDb = await getAdminDb()
    if (!adminDb) {
      return null
    }

    const collectionsSnapshot = await adminDb
      .collection('collections')
      .where('slug', '==', slug)
      .limit(1)
      .get()

    if (collectionsSnapshot.empty) {
      return null
    }

    const doc = collectionsSnapshot.docs[0]
    return { id: doc.id, ...doc.data() } as Collection
  } catch (error) {
    console.error('Error fetching collection:', error)
    return null
  }
}

