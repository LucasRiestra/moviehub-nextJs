import { useUser } from "@auth0/nextjs-auth0/client";

const useCustomUser = () => {
    const { user } = useUser();
    return user;
}

export default useCustomUser