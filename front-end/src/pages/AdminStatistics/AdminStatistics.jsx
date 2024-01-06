import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./admin-statistics.css";

const AdminStatistics = () => {
  const [statistics, setStatistics] = useState({});
  const [revenueChartData, setRevenueChartData] = useState({});
  const [productSoldChartData, setProductSoldChartData] = useState({});
  const [selectedView, setSelectedView] = useState("byweek"); // Default view
  const generateData = () => {
    const weeks = ["week 1", "week 2", "week 3", "week 4", "week 5", "week 6", "week 7"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = ["2020", "2021", "2022", "2023", "2024"];

    const specificData = {
      byweekRevenue: [1000, 149, 1500, 700, 6900, 200, 100],
      byweekProductSold: [2123, 4056, 12692, 23098, 38690, 50210, 60373],
      byMonthRevenue: [2200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      byMonthProductSold: [230, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      byYearRevenue: [10, 20, 30, 33, 40],
      byYearProductSold: [2123, 4056, 12692, 23098, 38690],
    };

    setStatistics(specificData);

    // Prepare data for Chart.js based on selected view
    if (selectedView === "byweek") {
      const revenueData = {
        labels: weeks,
        datasets: [
          {
            label: "Revenue Gain (by week)",
            data: specificData.byweekRevenue,
            borderColor: "#007BFF",
            fill: false,
          },
        ],
      };

      const productSoldData = {
        labels: weeks,
        datasets: [
          {
            label: "Product Sold Gain (by week)",
            data: specificData.byweekProductSold,
            borderColor: "#b8860b",
            fill: false,
          },
        ],
      };

      setRevenueChartData(revenueData);
      setProductSoldChartData(productSoldData);
    } else if (selectedView === "byMonth") {
      const revenueData = {
        labels: months,
        datasets: [
          {
            label: "Revenue Gain (by month)",
            data: specificData.byMonthRevenue,
            borderColor: "#007BFF",
            fill: false,
          },
        ],
      };

      const productSoldData = {
        labels: months,
        datasets: [
          {
            label: "Product Sold Gain (by month)",
            data: specificData.byMonthProductSold,
            borderColor: "#b8860b",
            fill: false,
          },
        ],
      };

      setRevenueChartData(revenueData);
      setProductSoldChartData(productSoldData);
    } else if (selectedView === "byYear") {
      const revenueData = {
        labels: years,
        datasets: [
          {
            label: "Revenue Gain (by year)",
            data: specificData.byYearRevenue,
            borderColor: "#007BFF",
            fill: false,
          },
        ],
      };

      const productSoldData = {
        labels: years,
        datasets: [
          {
            label: "Product Sold Gain (by year)",
            data: specificData.byYearProductSold,
            borderColor: "#b8860b",
            fill: false,
          },
        ],
      };

      setRevenueChartData(revenueData);
      setProductSoldChartData(productSoldData);
    }
  };

  useEffect(() => {
    generateData();
  }, [selectedView]);

  return (
    <>
      <div className="admin-statistics-container">
        <div className="admin-statistics-row">
          <div className="admin-statistics-col">
            <div className="admin-statistics-card">
              <div className="admin-statistics-card-body">
                <div className="admin-statistics-text-xs admin-statistics-font-weight-bold admin-statistics-text-success admin-statistics-text-uppercase mb-1">
                  Total Revenue
                </div>
                <div className="admin-statistics-h5 admin-statistics-font-weight-bold">
                  $ 100000
                </div>
              </div>
            </div>
          </div>

          <div className="admin-statistics-col">
            <div className="admin-statistics-card">
              <div className="admin-statistics-card-body">
                <div className="admin-statistics-text-xs admin-statistics-font-weight-bold admin-statistics-text-success admin-statistics-text-uppercase mb-1">
                  Total Product Sold
                </div>
                <div className="admin-statistics-h5 admin-statistics-font-weight-bold">
                  23000
                </div>
              </div>
            </div>
          </div>

        </div>





        <div className="admin-statistics-row">
          <div className="admin-statistics-col">
            <div className="line-chart-container">
              {revenueChartData && revenueChartData.labels ? (
                <Line data={revenueChartData} />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
          </div>

          <div className="admin-statistics-col">
            <div className="line-chart-container">
              {productSoldChartData && productSoldChartData.labels ? (
                <Line data={productSoldChartData} />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
          </div>
        </div>
        <div className="admin-statistics-buttons">
          <button onClick={() => setSelectedView("byweek")}>By week</button>
          <button onClick={() => setSelectedView("byMonth")}>By Month</button>
          <button onClick={() => setSelectedView("byYear")}>By Year</button>
        </div>
      </div>
    </>
  );
};

export default AdminStatistics;
