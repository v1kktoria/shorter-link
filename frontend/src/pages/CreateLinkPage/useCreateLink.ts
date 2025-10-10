import { useState, useEffect } from 'react';
import { createLink, clearCreated, clearError } from '../../entities/link/model/linksSlice';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/hooks';

export const useCreateLink = () => {
  const dispatch = useAppDispatch();
  const { created, loading, error } = useAppSelector(state => state.links);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const onCreate = () => {
    if (!url.trim()) {
      toast.error("Введите URL");
      return;
    }
    dispatch(createLink(url));
  };

  const onClear = () => {
    setUrl("");
    dispatch(clearCreated());
    dispatch(clearError());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onCreate();
  };

  return { url, setUrl, created, loading, onCreate, onClear, handleKeyDown };
};
