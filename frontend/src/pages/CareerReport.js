import React from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PieChart,pieArcLabelClasses } from '@mui/x-charts/PieChart';

const App = () =>{
	const data = [
		{id:0,label:'Logical Reasoning',value:parseInt(sessionStorage.getItem("LR_Score"))},
		{id:1,label:'Verbal Ability',value:parseInt(sessionStorage.getItem("VA_Score"))},
		{id:2,label:'Numerical Ability',value:parseInt(sessionStorage.getItem("AR_Score"))},
		{id:3,label:'Memory',value:parseInt(sessionStorage.getItem("Mem_Score"))}
	]
	const ar1 = JSON.parse(sessionStorage.getItem("career"))
	console.log(ar1)
	const careers = [
		...JSON.parse(sessionStorage.getItem("career")),
		...JSON.parse(sessionStorage.getItem("career2"))
	]
	return (
		<div>
		<Navbar />
		<PieChart series={[
			{
				arcLabel:(item) => `${item.value} %`,
				arcLabelMinAngle: 45,
				data,
				innerRadius:30,
				outerRadius:300
			},
		]}
		sx = {{
			[`& .${pieArcLabelClasses.root}`]:{
				fill:'white',
				fontweight:'bold',
			},}}
		width={800} height={750}/>
		{careers.map(career => {<section className="TestSection">
				<button className="startButton1" style={{ marginTop: '1vmax' }}> Logical Reasoning</button>				</section>

		})}		<Footer />
		</div>
	)
}

export default App;
