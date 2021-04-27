import React, { useState, useEffect } from "react";
import { PieChart, Pie,  Cell } from "recharts";
import axios from "axios";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent
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
			.get("https://sprinter-v2.herokuapp.com/projects/")
			.then((sprints) => {
				
				setOpened(sprints.data.filter((data) => data.status === "open").length);
				setInProgress(sprints.data.filter((data) => data.status === "in progress").length)
				setInReview(sprints.data.filter((data) => data.status === "in review").length)
				setDone(sprints.data.filter((data) => data.status === "done").length)
				

				
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

	const [data] = useState(info)

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
				isAnimationActive={false}
			>
				{info.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
		</PieChart>

	);
}
