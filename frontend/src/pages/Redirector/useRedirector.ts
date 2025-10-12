import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { redirectLinkApi } from "../../entities/link/api/linkApi";

export const useRedirect = (shortCode?: string) => {
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!shortCode || hasRedirected.current) return;
    
    hasRedirected.current = true;
    
    const handleRedirect = async () => {
      try {
        const data = await redirectLinkApi(shortCode);
        window.location.replace(data.url);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    handleRedirect();
  }, [shortCode]);
};