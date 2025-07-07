// import { Client, Permission, Role, Storage, ID } from 'appwrite';

// const client = new Client()
//   .setEndpoint("https://fra.cloud.appwrite.io/v1")
//   .setProject("6866bcda0018e9492236");

// const storage = new Storage(client);

// export const uploadToAppwrite = async (file) => {
//   try {
//     const uploaded = await storage.createFile(
//       '6866bcfe00025e952214', // ✅ Bucket ID
//       ID.unique(),            // ✅ Unique file ID
//       file,                   // ✅ File object
//       [Permission.read(Role.any())] // ✅ Public access
//     );

//     const url = `https://fra.cloud.appwrite.io/v1/storage/buckets/6866bcfe00025e952214/files/${uploaded.$id}/view?project=6866bcda0018e9492236`;

//     return url;
//   } catch (error) {
//     console.error("Appwrite upload failed:", error);
//     throw error;
//   }
// };


import { Client, Permission, Role, Storage, ID } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT);

const storage = new Storage(client);

export const uploadToAppwrite = async (file) => {
  try {
    const uploaded = await storage.createFile(
      process.env.REACT_APP_APPWRITE_BUCKET,
      ID.unique(),
      file,
      [Permission.read(Role.any())]
    );

    const url = `${process.env.REACT_APP_APPWRITE_ENDPOINT}/storage/buckets/${process.env.REACT_APP_APPWRITE_BUCKET}/files/${uploaded.$id}/view?project=${process.env.REACT_APP_APPWRITE_PROJECT}`;

    return url;
  } catch (error) {
    console.error("Appwrite upload failed:", error);
    throw error;
  }
};
