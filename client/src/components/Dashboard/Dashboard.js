import React, { useState, useEffect } from "react";
import CustomPieChart from "../Charts/PieChart";
import "./dashboard.css";
import { Form,  Card, Container, Row, Col } from "react-bootstrap/";
import axios from "axios";

function Dashboard() {

	const [cardData, setCardData] = useState([]);

	const [results, setResults] = useState([]);

	const [id, setId] = useState();

	const [deadline, setDeadline] = useState();

	const [opened, setOpened] = useState();

	const [inProgress, setInProgress] = useState();

	const [inReview, setInReview] = useState();

	const [done, setDone] = useState();



	const calculateDeadline = () => {
		axios.get(`https://sprinter-v2.herokuapp.com/projects/${id}`).then((sprints) => {
			console.log(sprints.data.startDate);
			var date1 = new Date(sprints.data.startDate);
			var date2 = new Date(sprints.data.endDate);

			// To calculate the time difference of two dates
			var Difference_In_Time = date2.getTime() - date1.getTime();

			// To calculate the no. of days between two dates
			var Difference_In_Days = Math.round(
				Difference_In_Time / (1000 * 3600 * 24)
			);

			//To display the final no. of days (result)
			console.log(
				"Total number of days between dates  <br>" +
					date1 +
					"<br> and <br>" +
					date2 +
					" is: <br> " +
					Difference_In_Days
			);
			setDeadline(Difference_In_Days);
			console.log(deadline);
		});
	};

	useEffect(() => {
		axios
			.get("https://sprinter-v2.herokuapp.com/projects/")
			.then((sprints) => {
				console.log(sprints.data[0]._id);
				setResults(sprints.data);
				setOpened(sprints.data.filter((data) => data.status === "open").length);
				setInProgress(
					sprints.data.filter((data) => data.status === "in progress").length
				);
				setInReview(
					sprints.data.filter((data) => data.status === "in review").length
				);
				setDone(sprints.data.filter((data) => data.status === "done").length);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		
		
		setId(e.target.value);
	};

	const handleClick = (e) => {
		e.preventDefault();
		axios
			.get(`https://sprinter-v2.herokuapp.com/projects/${id}`)
			.then((sprints) => {
				let array = [];
				array.push(sprints.data);
				setCardData(array);
				calculateDeadline();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Container className="dashboard pl-5">
				<div className="main__title">
					<div className="main__greeting mx-auto">
						<br />
						<h1>Welcome to your admin dashboard</h1>
					</div>
				</div>
				<Row>
					<Col sm={12} md={2}>
						<Form className="displayProjects" id={id}>
							<Form.Group>
								<Form.Label>Your Projects</Form.Label>
								<Form.Control className="selectProject"
									custom
									as="select"
									multiple
									name="id"
									onChange={handleChange}
									onClick={handleClick}
								>
									{results.map((sprints) => {
										return (
											<option value={sprints._id} key={sprints._id}>
												{sprints.title}{" "}
											</option>
										);
									})}
								</Form.Control>
							</Form.Group>
						</Form>
					</Col>
					<Col sm={12} md={10}>
						{cardData.length > 0
							? cardData.map((data) => {
									return (
										<div>
											<Row>
												<Col md={3} sm={12}>
													<Card className="dashboard-card">
														<Card.Body className="dashboard-card-info">
															<Card.Title className="dashboard-card-title">
																Project: {data.title}
															</Card.Title>
															<Card.Text>{data.description}</Card.Text>
														</Card.Body>
													</Card>
												</Col>
												<Col md={3} sm={12}>
													<Card className="dashboard-card">
														<Card.Body>
															<Card.Title className="dashboard-card-title">
																Employees
															</Card.Title>
															<Card.Text>{data.employee}</Card.Text>
														</Card.Body>
													</Card>
												</Col>
												<Col md={3} sm={12}>
													<Card className="dashboard-card">
														<Card.Body>
															<Card.Title className="dashboard-card-title">
																Managers
															</Card.Title>
															<Card.Text>{data.manager}</Card.Text>
														</Card.Body>
													</Card>
												</Col>
												<Col md={3} sm={12}>
													<Card className="dashboard-card">
														<Card.Body>
															<Card.Title className="dashboard-card-title">
																Deadline / Days Remaining
															</Card.Title>
															<Card.Text>
																{data.endDate}
																<br />
																{deadline}
															</Card.Text>
														</Card.Body>
													</Card>
												</Col>
											</Row>
										</div>
									);
							  })
							: null}
					</Col>

				</Row>

				<br />
			<Row className="charts"> 
					<Col sm={12} md={6} className="charts__left">
						<div className="charts__left__title">
							<div>
								<h1>Pie Chart</h1>
							</div>
						</div>
						<CustomPieChart />
					</Col>

					<Col  className="charts__right">
						<div className="charts__right__title">
							<div>
								<h1>Status Reports</h1>
							</div>
						</div>
						<div className="charts__right__cards">
							<div className="card1">
								<h1>Open</h1>
								<h3>{opened}</h3>
							</div>

							<div className="card2">
								<h1>In progress</h1>
								<h3>{inProgress}</h3>
							</div>

							<div className="card3">
								<h1>In review</h1>
								<h3>{inReview}</h3>
							</div>

							<div className="card4">
								<h1>Done</h1>
								<h3>{done}</h3>
							</div>
						</div>
					</Col>
			</Row>
		
		</Container>
	);
}

export default Dashboard;
