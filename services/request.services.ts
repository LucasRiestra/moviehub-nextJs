export const uploadRequest = async (file: File | undefined): Promise<string | undefined> => {
    try {
        const { VITE_API_URL: url } = process.env;
        const formData: FormData = new FormData();
        file && formData.append('image', file);

        const response: Response = await fetch(`${url}uploads`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        return data.image.secure_url; 
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return undefined;
    }
}
