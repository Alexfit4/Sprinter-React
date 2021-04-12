import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import Devs from './components/Devs/Devs'
import Employee from './components/Employees/Employee'
import Sprints from './components/Sprints/Sprints'
import PersonList from './components/testing'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Switch>
					<Route path='/' exact component={Dashboard} />
					<Route path='/employees' component={Employee} />
					<DndProvider backend={HTML5Backend}>
						<Route path='/sprints' component={Sprints} />
					</DndProvider>
					<Route path='/devs' component={Devs} />
				</Switch>
			</Router>
			<PersonList />
		</div>
	);
}

export default App;
