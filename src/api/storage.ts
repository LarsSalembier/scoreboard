import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
  deleteObject,
} from "@firebase/storage";
import app from "./firebase-config";

const storage = getStorage(app);

const getUrl = (imageRef: StorageReference) => {
  return getDownloadURL(imageRef)
    .then((url: string) => {
      return url;
    })
    .catch((error) => {
      console.error(error.message, "Error getting URL from database.");
    });
};

export const uploadAvatarAndGetUrl = (image: File, userId: string) => {
  const avatarImageRef = ref(storage, "avatars/" + userId);
  console.log(userId);
  return uploadBytes(avatarImageRef, image)
    .then(() => {
      return getUrl(avatarImageRef);
    })
    .catch((error) => {
      console.error(error.message, "Error uploading to database.");
    });
};

export const removeAvatar = async (userId: string) => {
  const avatarImageRef = ref(storage, "avatars/" + userId);
  await deleteObject(avatarImageRef).catch((error) => {
    console.error(error.message, "Error removing from database.");
  });
};
