import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import './CareerTests.css';
import './MoodTest.css';

const App = () => {
  const data = [
    { id: 0, label: 'Logical Reasoning', value: parseInt(sessionStorage.getItem('LR_Score')) },
    { id: 1, label: 'Verbal Ability', value: parseInt(sessionStorage.getItem('VA_Score')) },
    { id: 2, label: 'Numerical Ability', value: parseInt(sessionStorage.getItem('AR_Score')) },
    { id: 3, label: 'Memory', value: parseInt(sessionStorage.getItem('Mem_Score')) }
  ];

  var ar1 = sessionStorage.getItem('career');
  ar1 = ar1.substring(1, ar1.length - 2).split(',');
  var ar2 = sessionStorage.getItem('career2');
  ar2 = ar2.substring(1, ar2.length - 2).split(',');
  const careers = [
    ...ar1,
    ...ar2
  ];

  return (
    <div>
      <Navbar />
      <span className="mtheading">Pie Chart</span>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.value} %`,
            arcLabelMinAngle: 45,
            data,
            innerRadius: 30,
            outerRadius: 300
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold',
          },
        }}
        width={800}
        height={750}
      />
      <span className="mtheading">Careers Suggested according to the test scores and likes</span>
      {careers.map((career) => (
        <section className="TestSection" key={career}>
          <button className="startButton1" style={{ marginTop: '1vmax' }}>
            {career}
          </button>
        </section>
      ))}
      <Footer />
    </div>
  );
};

export default App;
