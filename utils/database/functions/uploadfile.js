import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/utils/database/firebase/firebaseConfig";
import { v4 as uuidv4 } from 'uuid';

const uploadfile = async (file, directory) => {
	if (!file) return null;
	const fileType = file
		.name
		.split(".")
		.pop()
	const imagePath = `${directory}/${uuidv4()}.${fileType}`
	// upload image
	const storageRef = ref(storage, imagePath);
	// 'file' comes from the Blob or File API
	await uploadBytes(storageRef, file);
	const imageUrl = await getDownloadURL(storageRef);
	return imageUrl
}

export default uploadfile