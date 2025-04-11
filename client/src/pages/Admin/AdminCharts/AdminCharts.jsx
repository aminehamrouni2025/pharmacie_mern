import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Card, CardContent } from "@mui/material";

import axios from "axios";

const AdminCharts = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPharmacies: 0,
    totalProducts: 0,
    totalSupplies: 0,
  });
  const token = localStorage.getItem("token");
  const barData = [
    { label: "Users", value: stats.totalUsers },
    { label: "Pharmacies", value: stats.totalPharmacies },
    { label: "Supplies", value: stats.totalSupplies },
    { label: "Products", value: stats.totalProducts },
  ];

  const pieData = [
    { id: 0, value: stats.totalUsers, label: "Users" },
    { id: 1, value: stats.totalPharmacies, label: "Pharmacies" },
    { id: 2, value: stats.totalSupplies, label: "Supplies" },
    { id: 3, value: stats.totalProducts, label: "Products" },
  ];

  const colors = ["#019641", "#a855f7", "#f59e0b", "#ef4444"]; // blue, purple, amber, red
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: { Authorization: token },
          }
        );
        setStats(response.data.stats);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div style={{ padding: "24px" }}>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "24px",
          color: "#374151",
        }}
      >
        Statistics Overview
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "24px",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {/* Bar Chart */}
        <Card
          style={{
            flex: "1 1 400px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "16px",
          }}
        >
          <CardContent>
            <h3
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "500",
                marginBottom: "16px",
              }}
            >
              Entity Distribution
            </h3>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: barData.map((item) => item.label),
                },
              ]}
              series={[
                {
                  data: barData.map((item) => item.value),
                  color: "#019641", // blue
                },
              ]}
              width={400}
              height={300}
            />
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card
          style={{
            flex: "1 1 400px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "16px",
          }}
        >
          <CardContent>
            <h3
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "500",
                marginBottom: "16px",
              }}
            >
              Entity Breakdown
            </h3>
            <PieChart
              series={[
                {
                  data: pieData.map((item, index) => ({
                    ...item,
                    color: colors[index],
                  })),
                  innerRadius: 0,
                  outerRadius: 100,
                  paddingAngle: 4,
                  cornerRadius: 4,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: { additionalRadius: -20, color: "#e5e7eb" },
                },
              ]}
              width={400}
              height={300}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCharts;
