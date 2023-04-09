import { useEffect, useState } from 'react';
import Dexie from 'dexie';

// Initialize the IndexedDB database with the 'todo-photos' name
export const db = new Dexie('todo-photos');
db.version(1).stores({
  photos: 'id', // Define the 'photos' object store with 'id' as the primary key
});

// Add a photo to the database
async function addPhoto(id, imgSrc) {
  try {
    const i = await db.photos.add({
      id: id,
      imgSrc: imgSrc,
    });
  } catch (error) {
    console.log('failed to add pic');
  }
  return (
    <>
      <p>
        {imgSrc.length} &nbsp; | &nbsp; {id}
      </p>
    </>
  );
}

// Delete a photo from the database using its ID
async function deletePhoto(id) {
  try {
    await db.photos.delete(id);
  } catch (error) {
    console.log('Failed to delete photo');
  }
}

// Custom hook to get the image source based on the photo ID
function usePhotoSrc(id) {
  const [imgSrc, setImgSrc] = useState(null);

  // Use useEffect to fetch the photo from the database when the id changes
  useEffect(() => {
    db.photos
      .where('id')
      .equals(id)
      .toArray()
      .then((imgs) => {
        if (imgs.length > 0) {
          setImgSrc(imgs[0].imgSrc); // Set the image source if the photo is found
        } else {
          setImgSrc(null); // Set the image source to null if no photo is found
        }
      })
      .catch((error) => {
        console.log('Failed to get photo source', error);
        setImgSrc(null);
      });
  }, [id]);

  return imgSrc; // Return the image source
}

export { addPhoto, deletePhoto, usePhotoSrc };
