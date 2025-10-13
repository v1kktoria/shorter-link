import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getClicksSummary, getStats } from "../../entities/link/model/linksSlice";
import { AppDispatch, RootState } from "../../app/store";
import { ChartDatum } from "../../entities/link/types/click";

export const useStats = (shortCode: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, summary, loading, error } = useSelector((state: RootState) => state.links);

  const [page, setPage] = useState(1);
  const [showCountries, setShowCountries] = useState(true);
  const limit = 10;

  useEffect(() => {
    if (!shortCode) return;
    dispatch(getStats({ shortCode, page }));
    dispatch(getClicksSummary(shortCode));
  }, [dispatch, shortCode, page]);

  useEffect(() => { if (error) toast.error(error) }, [error]);

  const geoData: ChartDatum[] = useMemo(() => showCountries ? summary?.country ?? [] : summary?.region ?? [], [summary, showCountries]);
  const browsers: ChartDatum[] = useMemo(() => summary?.browser ?? [], [summary]);
  const os: ChartDatum[] = useMemo(() => summary?.os ?? [], [summary]);

  return {
    stats, loading, error,
    page, setPage, totalPages: stats ? Math.ceil(stats.total / limit) : 0,
    showCountries, setShowCountries,
    geoData, browsers, os
  };
};
