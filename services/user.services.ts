'use client';


export const createUser = async (userObject: {}) => {
    const  url = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${url}/user`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(userObject)
        });

        if (!response.ok) {
            throw new Error(`Error creating user: ${response.statusText}`);
        }

        const dataFetched = await response.json();
        return dataFetched;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

export const getUserByEmail = async (userEmail: string) => {
    const  url = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${url}/user/email/${userEmail}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        
        const dataFetched = await response.json();
        return [response, dataFetched];
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return null;
    }
}

export const addMovieToUser = async (userId: string, movieData: any) => {
    const  url = process.env.NEXT_PUBLIC_API_URL;
    console.log("movieData", movieData);
    console.log("userId", userId);
    try {
      const response = await fetch(`${url}/movie/${userId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(movieData),
      });
  
      if (!response.ok) {
        console.error(`Error adding movie to user: ${response.statusText}`);
        return null;
      }
  
      const dataFetched = await response.json();
      return  dataFetched;
    } catch (error) {
      console.error("Error adding movie to user:", error);
      return null;
    }
};
