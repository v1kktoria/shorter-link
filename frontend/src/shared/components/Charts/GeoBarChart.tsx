import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { ChartDatum } from "../../../entities/link/types/click";

type GeoBarChartProps = {
  data: ChartDatum[];
  height?: number;
};

export const GeoBarChart: React.FC<GeoBarChartProps> = ({ data, height = 350 }) => {
  const series = useMemo(() => [{ name: "Количество", data: data.map(d => d.value) }], [data]);
  const categories = useMemo(() => data.map(d => d.name), [data]);

  const options: ApexCharts.ApexOptions = useMemo(() => ({
    chart: { type: 'bar', height },
    plotOptions: { bar: { borderRadius: 4, borderRadiusApplication: "end", horizontal: true } },
    dataLabels: { enabled: false },
    xaxis: { categories },
    tooltip: { theme: 'dark' }
  }), [categories, height]);

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={height} />
    </div>
  );
};
