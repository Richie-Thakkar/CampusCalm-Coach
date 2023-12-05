import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import './CareerTests.css';
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';

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

    const contentRef = useRef(null);

  const handleDownloadPDF = () => {
    const content = contentRef.current;

    // html2pdf()
    //   .from(content)
    //   .save('career_report.pdf');
    html2pdf().from(content).set({ scale: 0.4 }).save('career_report.pdf');

  };

  return (
    <div >
      <Navbar />
      <div ref={contentRef} className='printdiv'>
	  <div className="flexwrapper">
      <span className="mtheading">Skill Distribution</span>
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
	  </div>
      <span className="mtheading">Careers Suggested according to the test scores and likes</span>
      <div className="reports">
	  {careers.map((career) => (
        <section className="TestSection" key={career}>
          <button className="startButton1" style={{ marginTop: '1vmax' }}>
            {career}
          </button>
        </section>
      ))}
      </div>
      	  </div>
          <button className='submit btn' onClick={handleDownloadPDF}>Download Report</button>
      <Footer />
    </div>
  );
};

export default App;