import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); // Temporary storage
export default upload;
