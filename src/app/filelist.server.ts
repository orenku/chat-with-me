// import { getServerSideProps } from 'next';
// import fs from 'fs'; // Assuming Node.js environment

// export async function getServerSideProps(context) {
//     // Replace 'path/to/files' with the actual directory path on your server
//     const directoryPath = 'path/to/files';

//     try {
//         const files = fs.readdirSync(directoryPath).map((fileName) => ({
//             name: fileName,
//             // You can add additional logic to get file size or other details
//             size: 0, // Placeholder for file size (can be retrieved using fs.statSync)
//         }));

//         return {
//             props: {
//                 files,
//             },
//         };
//     } catch (error) {
//         console.error('Error fetching files:', error);
//         return {
//             props: {
//                 files: [], // Return empty array in case of errors
//             },
//         };
//     }
// }
