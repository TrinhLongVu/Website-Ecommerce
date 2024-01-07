import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./admin-statistics.css";

const AdminStatistics = () => {
  const [statistics, setStatistics] = useState({});
  const [revenueChartData, setRevenueChartData] = useState({});
  const [productSoldChartData, setProductSoldChartData] = useState({});
  const [selectedView, setSelectedView] = useState("byweek"); // Default view
  const [selectedYear, setSelectedYear] = useState("2024"); // Default year

  const yearsDropdown = ["2020", "2021", "2022", "2023", "2024"];

  const generateData = () => {
    const weeks = ["2023-01-01", "2023-01-02", "2023-01-03", "2023-01-04", "2023-01-05", "2023-01-06", "2023-01-07"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const specificData = {
      byweekRevenue: [1000, 149, 1500, 700, 6900, 200, 100],
      byweekProductSold: [2123, 4056, 12692, 23098, 38690, 50210, 60373],
      byMonthRevenue: [2200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      byMonthProductSold: [230, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    }
  };

  useEffect(() => {
    generateData();
  }, [selectedView, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

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



        {selectedView === "byMonth" && (
          <div className="admin-statistics-dropdown">
            <label htmlFor="yearDropdown">Select Year: </label>
            <select id="yearDropdown" value={selectedYear} onChange={handleYearChange}>
              {yearsDropdown.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}


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

        {/* Buttons */}
        <div className="admin-statistics-buttons">
          <button
            onClick={() => setSelectedView("byweek")}
            className={selectedView === "byweek" ? "selected" : ""}
          >
            By week
          </button>
          <button
            onClick={() => setSelectedView("byMonth")}
            className={selectedView === "byMonth" ? "selected" : ""}
          >
            By Month
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminStatistics;
