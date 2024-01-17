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
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProductSold, setTotalProductSold] = useState(0);

  const yearsDropdown = ["2021", "2022", "2023", "2024"];

  const fetchData = async (isWeek, year) => {
    const endpoint = isWeek
      ? "http://localhost:8000/api/v1/statistic/transaction?week=true"
      : `http://localhost:8000/api/v1/statistic/transaction?month=true&year=${year}`;

    try {
      const response = await fetch(endpoint, { credentials: "include" });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching transaction data:", error);
      return null;
    }
  };

  const getData = async () => {
    try {
      if (selectedView === "byweek") {
        const weekData = await fetchData(true);
        setStatistics((prevData) => ({
          ...prevData,
          byweek: weekData?.data || {},
        }));

        const labels = Object.keys(weekData?.data || {});
        const revenueData = {
          labels: labels,
          datasets: [
            {
              label: "Revenue Gain (by week)",
              data: Object.values(weekData?.data || {}).map(
                (week) => week.balance
              ),
              borderColor: "#007BFF",
              fill: false,
            },
          ],
        };
        setRevenueChartData(revenueData);

        const totalRevenue = Object.values(weekData?.data || {}).reduce(
          (total, week) => total + week.balance,
          0
        );
        setTotalRevenue(totalRevenue);

        const productSoldData = {
          labels: labels,
          datasets: [
            {
              label: "Product Sold Quantity (by week)",
              data: Object.values(weekData?.data || {}).map(
                (week) => week.quantity
              ),
              borderColor: "#b8860b",
              fill: false,
            },
          ],
        };
        setProductSoldChartData(productSoldData);

        const totalProductSold = Object.values(weekData?.data || {}).reduce(
          (total, week) => total + week.quantity,
          0
        );
        setTotalProductSold(totalProductSold);
      } else if (selectedView === "byMonth") {
        const monthData = await fetchData(false, selectedYear);
        setStatistics((prevData) => ({
          ...prevData,
          byMonth: monthData?.data || {},
        }));

        const labels = Object.keys(monthData?.data || {});
        const revenueData = {
          labels: labels,
          datasets: [
            {
              label: "Revenue Gain (by month)",
              data: Object.values(monthData?.data || {}).map(
                (month) => month.balance
              ),
              borderColor: "#007BFF",
              fill: false,
            },
          ],
        };
        setRevenueChartData(revenueData);

        const totalRevenue = Object.values(monthData?.data || {}).reduce(
          (total, month) => total + month.balance,
          0
        );
        setTotalRevenue(totalRevenue);

        const productSoldData = {
          labels: labels,
          datasets: [
            {
              label: "Product Sold Quantity (by month)",
              data: Object.values(monthData?.data || {}).map(
                (month) => month.quantity
              ),
              borderColor: "#b8860b",
              fill: false,
            },
          ],
        };
        setProductSoldChartData(productSoldData);

        const totalProductSold = Object.values(monthData?.data || {}).reduce(
          (total, month) => total + month.quantity,
          0
        );
        setTotalProductSold(totalProductSold);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedView, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const formatNumber = (number) => {
    return number.toLocaleString('en-US');
  };

  const chartOptionsRevenue = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.formattedValue.replaceAll('.', ',');;
            return `${label}: $${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `$${formatNumber(value)}`,
        },
      },
    },
  };

  const chartOptionsTotalProductSold = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.formattedValue.replaceAll('.', ',');;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `${formatNumber(value)}`,
        },
      },
    },
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
                  $ {formatNumber(totalRevenue)}
                </div>
              </div>
            </div>
          </div>

          <div className="admin-statistics-col">
            <div className="admin-statistics-card">
              <div className="admin-statistics-card-body">
                <div className="admin-statistics-text-xs admin-statistics-font-weight-bold admin-statistics-text-success admin-statistics-text-uppercase mb-1">
                  Total Product Sold Quantity
                </div>
                <div className="admin-statistics-h5 admin-statistics-font-weight-bold">
                  {formatNumber(totalProductSold)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedView === "byMonth" && (
          <div className="admin-statistics-dropdown">
            <label htmlFor="yearDropdown">Select Year: </label>
            <select
              id="yearDropdown"
              value={selectedYear}
              onChange={handleYearChange}
            >
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
                <Line data={revenueChartData} options={chartOptionsRevenue} />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
          </div>

          <div className="admin-statistics-col">
            <div className="line-chart-container">
              {productSoldChartData && productSoldChartData.labels ? (
                <Line data={productSoldChartData} options={chartOptionsTotalProductSold}/>
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
          </div>
        </div>

        <div className="admin-statistics-buttons">
          <button
            onClick={() => setSelectedView("byweek")}
            className={selectedView === "byweek" ? "selected" : ""}
          >
            By Week
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
