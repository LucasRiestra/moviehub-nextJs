export const uploadRequest = async (file: File | undefined): Promise<string | undefined> => {
    try {
        const  url = process.env.NEXT_PUBLIC_API_URL;
        const formData: FormData = new FormData();
        file && formData.append('image', file);

        const response: Response = await fetch(`${url}/uploads/`, {
            method: 'POST',
            body: formData
        });
        console.log("response", response);
        
        const data = await response.json();
        console.log("Data", data);
        return data.image.secure_url; 
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return undefined;
    }
}
