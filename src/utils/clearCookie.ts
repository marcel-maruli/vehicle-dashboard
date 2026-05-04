export const deleteCookie = (name:string, path?:string, domain?:string) =>{
    // Set a past expiration date (any past date works, Jan 1 1970 is common)
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=" + (path || "/") + "; domain=" + (domain || "");
}
