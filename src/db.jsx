import { useEffect, useState } from 'react';
import Dexie from 'dexie';

export const db = new Dexie('todo-photos');
db.version(1).stores({
  photos: 'id',
});

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

async function deletePhoto(id) {
  try {
    await db.photos.delete(id);
  } catch (error) {
    console.log('Failed to delete photo');
  }
}

function usePhotoSrc(id) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    db.photos
      .where('id')
      .equals(id)
      .toArray()
      .then((imgs) => {
        if (imgs.length > 0) {
          setImgSrc(imgs[0].imgSrc);
        } else {
          setImgSrc(null);
        }
      })
      .catch((error) => {
        console.log('Failed to get photo source', error);
        setImgSrc(null);
      });
  }, [id]);

  return imgSrc;
}

export { addPhoto, deletePhoto, usePhotoSrc };
