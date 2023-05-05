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
const recipesImagesFolderName: string = "recipesImages";
const usersProfilePicturesFolderName: string = "usersProfilePicturesImages";
// recipesImages/uuid-1.jpg
// usersProfilePicturesImages/uuid.jpg

function uploadeUserProfilePicture(userId: string, image: Uint8Array): string {
    return uploadImage(createRef(usersProfilePicturesFolderName, userId), image);
}

function uploadeRecipeImages(recipeId: string, images: Uint8Array[]): string[] {
    let isThereMoreImages = "true";
    let imagesUrls: string[] = [];

    for (let index = 0; index < images.length; index++) {
        let imageName: string = recipeId + "-" + index + 1;

        if (index == images.length - 1) {
            isThereMoreImages = "false";
        }

        imagesUrls[index] = uploadImage(
            createRef(recipesImagesFolderName, imageName),
            images[index],
            {
                customMetadata: { isThereMoreImages: isThereMoreImages },
            },
        );
    }

    return imagesUrls;
}

function uploadImage(
    storageRef: StorageReference,
    image: Uint8Array,
    metadata?: SettableMetadata,
): string {
    let imageUrl: string = "";

    uploadBytes(storageRef, image, metadata).then((uploadResult: UploadResult) => {
        console.log("Uploaded an image - " + uploadResult.metadata.name);
        imageUrl = uploadResult.ref.fullPath;
    });

    return imageUrl;
}

function getUserProfilePictureUrl(userId: string): string {
    return getImageUrl(createRef(usersProfilePicturesFolderName, userId));
}

function getRecipeImageUrl(imageName: string): string {
    return getImageUrl(createRef(recipesImagesFolderName, imageName));
}

function getRecipeImagesUrls(recipeId: string): string[] {
    let isThereMoreImages = true;
    let recipeImageIndex = 1;
    let recipeImagesUrls = [];
    let recipesImagesRef: StorageReference = createRef(recipesImagesFolderName, recipeId);

    while (isThereMoreImages) {
        recipeImagesUrls[recipeImageIndex - 1] = getImageUrl(recipesImagesRef);
        getMetadata(recipesImagesRef).then((metadata: FullMetadata) => {
            if (metadata.customMetadata?.isThereMoreImages == "false") {
                isThereMoreImages = false;
            }
        });
    }

    return recipeImagesUrls;
}

function getImageUrl(storageRef: StorageReference): string {
    let imageUrl: string = "";

    getDownloadURL(storageRef)
        .then((url) => {
            imageUrl = url;
        })
        .catch((error) => {
            console.log("Error getting image url from Firebase " + error);
        });

    return imageUrl;
}

function createRef(folderName: string, imageName: string): StorageReference {
    return ref(storage, folderName + "/" + imageName);
}

export {
    uploadeRecipeImages,
    uploadeUserProfilePicture,
    getUserProfilePictureUrl,
    getRecipeImageUrl,
    getRecipeImagesUrls,
};
