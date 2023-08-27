import axios from "axios";
class FileService {
    static uploadAvatar(avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        formData.append("upload_preset", "rw6uoocp");
        return axios.post('https://api-ap.cloudinary.com/v1_1/dxkqbieog/image/upload', formData)
    }
}
export default FileService;