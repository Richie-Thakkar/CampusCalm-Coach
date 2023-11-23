import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Logical_Reasoning.css";
import {NavLink} from "react-router-dom";
import {useState } from "react";

function Memory()
{
	const [memory,setMemory] = useState(0)
	const AR_Score = sessionStorage.getItem("AR_Score")
	const LR_Score = sessionStorage.getItem("LR_Score")
	const VA_Score = sessionStorage.getItem("VA_Score")
	const mem = Math.round(memory*100/142)
	const report = {LR_Score,AR_Score,VA_Score,mem}
	const func = () => {

	}
	return(
		<>
		<Navbar/>
		<div className="flexwrapper">
		<iframe src="https://practicalpie.com/free-memory-test/#memorytest" frameborder="100" className="memoryquiz"></iframe>
		</div>
		<div style={{"display":"flex","flexDirection":"column","alignItems":"center"}}>
		<input
		type="text"
		style={{"height":"2.5vmax","textAlign":"center","padding":"1vmax"}}
		placeholder="Give your Score..."
		value={memory}
		onChange={(e) => setMemory(e.target.value)}
		onKeyPress={(e)=>{if(e.key === "Enter"){sessionStorage.setItem('Mem_Score',mem);
			fetch(`${process.env.REACT_APP_BACKEND_URL}/career`,{
				method: "POST",
				headers:{
					"Content-Type": "application/json",
					Authorization:"Bearer" + sessionStorage.getItem("token"),
				},
				body: JSON.stringify(report),
				credentials: 'include',
			})
				.then((response)=>{
					if(!response.ok) throw new Error('Network response was not ok')
					return response.json()
				})
				.then((data) => sessionStorage.setItem("career2",JSON.stringify(data)))
				.catch((error) => console.error(error))
		}}
		}
		/>

		<div className='btdiv'><NavLink to='/user/career_test/likes'><button type='submit' className='startButton'>Go to next Assesment</button></NavLink></div>
		</div>
		<Footer/>
		</>
	)
}
export default Memory;
