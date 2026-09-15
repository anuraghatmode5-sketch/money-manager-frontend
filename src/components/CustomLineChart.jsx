import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
} from "recharts";
import "./CustomLineChart.css";

const CustomLineChart = ({ data }) => {
    return (
        <div className="custom-line-chart">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <filter
                            id="lineGlow"
                            x="-50%"
                            y="-50%"
                            width="200%"
                            height="200%"
                        >
                            <feGaussianBlur
                                stdDeviation="5"
                                result="blur"
                            />
                        </filter>
                    </defs>

                    <CartesianGrid
                        stroke="#e5e7eb"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                    />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="none"
                        fill="#ddd6fe"
                        fillOpacity={0.5}
                    />

                    {/* Soft glow behind the line */}
                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#7c3aed"
                        strokeWidth={8}
                        strokeOpacity={0.25}
                        filter="url(#lineGlow)"
                        dot={false}
                        activeDot={false}
                    />

                    {/* Main line */}
                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#7c3aed"
                        strokeWidth={2.5}
                        dot={{
                            r: 3,
                            fill: "#7c3aed",
                        }}
                        activeDot={{
                            r: 5,
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;