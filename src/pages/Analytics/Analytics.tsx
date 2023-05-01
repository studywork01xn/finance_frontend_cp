import React, { useMemo, useEffect } from "react";
import styles from "./Analytics.module.scss";
import { categories } from "../../utils/categories";
import { BarChart, Bar, Cell, XAxis, Tooltip, PieChart, Pie } from "recharts";
import axios from "axios";
import { useState } from "react";

interface MonthlyTotal {
  _id: number;
  totalAmount: number;
  month_name: string;
}

interface CategoryTotal {
  totalAmount: number;
  category: string;
}

type MonthlyTotals = MonthlyTotal[];

export default function Expenses() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [barData, setBarData] = useState<MonthlyTotals>([]);
  const [pieData, setPieData] = useState<CategoryTotal[]>([]);

  const piedata = useMemo(() => {
    return pieData.map((data, index) => ({
      name: data.category,
      value: data.totalAmount,
      color: `hsl(${(index * 360) / pieData.length}, 70%, 50%)`,
    }));
  }, [pieData]);

  const onMouseOver = (barData: any, index: number) => setActiveIndex(index);

  const formatTooltip = (value: any) => {
    return `$${value}`;
  };

  useEffect(() => {
    getBarData();
    getPieData();
  }, []);

  const getBarData = async () => {
    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyTotals: MonthlyTotals = allMonths.map((month) => ({
      _id: 0,
      totalAmount: 0,
      month_name: month,
    }));

    const result = await axios.get(
      `${process.env.REACT_APP_API}/getBarChartData`,
      {
        params: {
          email: localStorage.getItem("email"),
        },
      }
    );

    result.data.forEach(
      ({
        month_name,
        totalAmount,
      }: {
        month_name: string;
        totalAmount: number;
      }) => {
        const index = allMonths.indexOf(month_name);
        if (index !== -1) {
          monthlyTotals[index].totalAmount = totalAmount;
        }
      }
    );

    setBarData(monthlyTotals);
  };

  const getPieData = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_API}/getPieChartData`,
      {
        params: {
          email: localStorage.getItem("email"),
        },
      }
    );

    setPieData(result.data);
  };

  return (
    <>
      <div className={styles.expenses}>
        <div className={styles.expensesCard}>
          <div className={styles.expensesOverview}>
            <div className={styles.expensesHeader}>
              <p className={styles.expensesTitle}>Analytics</p>
            </div>

            <div className={styles.mainBody}>
              <BarChart data={barData} width={530} height={300}>
                <XAxis
                  dataKey="month_name"
                  axisLine={{ stroke: "transparent" }}
                  tickLine={{ stroke: "transparent" }}
                />
                <Bar
                  dataKey="totalAmount"
                  fill="rgba(21, 122, 255, .2)"
                  onMouseOver={onMouseOver}
                >
                  {barData.map((entry, index) => (
                    <Cell
                      cursor="pointer"
                      fill={
                        index === activeIndex
                          ? "rgb(21, 122, 255)"
                          : "rgba(21, 122, 255, .2)"
                      }
                      key={index}
                    />
                  ))}
                </Bar>
                <Tooltip formatter={formatTooltip} />
              </BarChart>
              <PieChart width={400} height={400}>
                <Pie
                  data={piedata}
                  cx={200}
                  cy={200}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {piedata.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
