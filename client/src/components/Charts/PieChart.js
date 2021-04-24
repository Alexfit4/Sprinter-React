import React, { useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import Item from "../Item/Item.js";
import axios from "axios";
let data;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

export default function CustomPieChart() {
	// static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';





	const [opened, setOpened] = useState();

	const [inProgress, setInProgress] = useState()

	const [inReview, setInReview] = useState()

	const [done, setDone] = useState()


	useEffect(() => {
		axios
			.get("http://localhost:5000/projects/")
			.then((sprints) => {
				// console.log(sprints.data.filter((data) => data.status === "open").length);
				setOpened(sprints.data.filter((data) => data.status === "open").length);
				setInProgress(sprints.data.filter((data) => data.status === "in progress").length)
				setInReview(sprints.data.filter((data) => data.status === "in review").length)
				setDone(sprints.data.filter((data) => data.status === "done").length)
				return opened

				console.log(opened);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);





	let info = [
		{ name: "Open", value: opened },
		{ name: "In Progress", value: inProgress },
		{ name: "In Review", value: inReview },
		{ name: "Done", value: done },
	];

	const [data, setData] = useState(info)

	console.log(data);


	return (

		<PieChart width={400} height={400}>
			<Pie
				data={info}
				cx="50%"
				cy="50%"
				labelLine={false}
				label={renderCustomizedLabel}
				outerRadius={80}
				fill="#8884d8"
				dataKey="value"
			>
				{info.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
		</PieChart>

	);
}
