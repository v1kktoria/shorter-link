import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { ChartDatum } from "../../../entities/link/types/click";

type DonutChartProps = {
  title: string;
  data: ChartDatum[];
};

export const DonutChart: React.FC<DonutChartProps> = ({ title, data }) => {
  const series = useMemo(() => data.map(d => d.value), [data]);
  const labels = useMemo(() => data.map(d => d.name), [data]);

  const options: ApexCharts.ApexOptions = useMemo(() => ({
    chart: { type: 'donut' },
    labels,
    legend: {
      position: 'right',
      floating: true,
      markers: { size: 6, shape: 'circle' },
      horizontalAlign: 'center'
    },
    title: { text: title, align: "center" },
  }), [labels]);

  return (
    <div style={{ flex: "1 1 300px", minWidth: 280 }}>
      <ReactApexChart options={options} series={series} type="donut" height={250} />
    </div>
  );
};