import Dexie from 'dexie';
import {useLiveQuery} from 'dexie-react-hooks';

export const db = new Dexie('todo-photos');
db.version(1).stores({
    photos: 'id'
});

async function addPhoto(id, imgSrc){
    try{
        const i = await db.photos.add({
            id: id,
            imgSrc: imgSrc
        });
    }catch (error){
        console.log("failed to add pic")
    }
    return <>
    <p>
        {imgSrc.length} &nbsp; | &nbsp; {id}
    </p>
    </>
};

async function deletePhoto(id) {
  try {
    await db.photos.delete(id);
  } catch (error) {
    console.log("Failed to delete photo");
  }
}

function usePhotoSrc(id) {
  const img = useLiveQuery(() => db.photos.where("id").equals(id).toArray());

  if (Array.isArray(img) && img.length > 0) {
    return img[0].imgSrc;
  } else {
    return null;
  }
}

export { addPhoto, usePhotoSrc, deletePhoto };
