
export const isUserAuthenticated = () => {
    if (localStorage.getItem("token")){
        return true;
    }
    return false;
}