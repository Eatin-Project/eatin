import {
    SettableMetadata,
    StorageReference,
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    UploadResult,
    getMetadata,
    FullMetadata,
    FirebaseStorage,
} from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage: FirebaseStorage = getStorage();
const recipesImagesFolderName = "recipesImages";
const usersProfilePicturesFolderName = "usersProfilePicturesImages";
// recipesImages/uuid-1.jpg
// usersProfilePicturesImages/uuid.jpg

function uploadeUserProfilePicture(userId: string, image: Blob | Uint8Array | ArrayBuffer) {
    // return uploadImage(createRef(usersProfilePicturesFolderName, userId), image);
}

async function uploadeRecipeImages(
    recipeId: number,
    images: (Blob | Uint8Array | ArrayBuffer)[],
): Promise<string[]> {
    let isThereMoreImages = "true";
    let imagesUrls: string[] = [];

    for (let index = 0; index < images.length; index++) {
        let imageName = recipesImagesFolderName + "/" + recipeId + "-" + index + 1;

        if (index === images.length - 1) {
            isThereMoreImages = "false";
        }

        imagesUrls[index] = await _uploadImage(createRef(imageName), images[index], {
            customMetadata: { isThereMoreImages: isThereMoreImages },
        });
    }
    console.log("🚀 ~ file: firebase-service.ts:31 ~ imagesUrls:", imagesUrls);

    return getRecipeImagesUrls(imagesUrls[0]);
}

async function _uploadImage(
    storageRef: StorageReference,
    image: Blob | Uint8Array | ArrayBuffer,
    metadata?: SettableMetadata,
): Promise<string> {
    const uploadResult: UploadResult = await uploadBytes(storageRef, image, metadata);
    console.log("Uploaded an image - " + uploadResult.metadata.name, uploadResult.ref.fullPath);

    return uploadResult.ref.fullPath;
}

function getUserProfilePictureUrl(userId: string): Promise<string> {
    return getImageUrl(createRef(usersProfilePicturesFolderName + "/" + userId.concat(".jpg")));
}

// function getRecipeImageUrl(imageName: string): string {
//     return "";
//     // return getImageUrl(createRef(recipesImagesFolderName, imageName));
// }

async function getRecipeImagesUrls(imageName: string): Promise<string[]> {
    let isThereMoreImages = true;
    let recipeImageIndex = 1;
    let recipeImagesUrls = [];
    let recipesImagesRef: StorageReference = createRef(imageName);

    while (isThereMoreImages) {
        recipeImagesUrls[recipeImageIndex - 1] = await getImageUrl(recipesImagesRef);
        const metadata: FullMetadata = await getMetadata(recipesImagesRef);

        if (metadata.customMetadata?.isThereMoreImages == "false") {
            isThereMoreImages = false;
        }
    }
    console.log(
        "🚀 ~ file: firebase-service.ts:76 ~ getRecipeImagesUrls ~ recipeImagesUrls:",
        recipeImagesUrls,
    );

    return recipeImagesUrls;
}

async function getImageUrl(storageRef: StorageReference): Promise<string> {
    try {
        return await getDownloadURL(storageRef);
    } catch (e) {
        console.log("Error getting image url from Firebase " + e);
        return "";
    }
}

function createRef(imageName: string): StorageReference {
    return ref(storage, imageName);
}

export const uploadImage = async (
    recipeId: number | string,
    image: Blob | Uint8Array | ArrayBuffer,
    imageIndex = 0,
) => {
    const imageName = recipesImagesFolderName + "/" + recipeId + "-" + imageIndex + 1;
    const storageRef = createRef(imageName);

    const uploadResult: UploadResult = await uploadBytes(storageRef, image);
    const uploadedImageRef = createRef(uploadResult.ref.fullPath);

    return await getDownloadURL(uploadedImageRef);
};
