import React, {useState} from "react";
import Navbar from "../components/Navbar_psy";
import Footer from "../components/Footer";
import '../pages/Home.css';
import './BlogForm.css'; 
  


function PsyBlog(){
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    tags: '',
    description: '',
    subtitle: '',
    body: '',
    image: null,
  });

  const ImageUploader = ({ onUploadSuccess }) => {
    
    const [isResponseSuccessful, setIsResponseSuccessful] = useState(false);
    const handleImageUpload = async () => {
      try {
        const file = await getSelectedFile();
        const base64String = await convertToBase64(file);
        sessionStorage.setItem("b64string",base64String);
        console.log(sessionStorage.getItem("b64string"));
        const image=sessionStorage.getItem("b64string");
        setFormData({ ...formData, image });
        // await saveImageToBackend(base64String);
      } catch (error) {
        console.error(error);
      }
    };
  
    const getSelectedFile = () => {
      return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.required = true;
        input.onchange = (event) => {
          const file = event.target.files[0];
          resolve(file);
        };
  
        input.click();
      });
    };
  
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
          resolve(base64String);
        };
  
        if (file) {
          reader.readAsDataURL(file);
        }
      });
    };
  
    /*const saveImageToBackend = async (base64String) => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/putPost`;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          image: base64String
        })
        .then((resp)=> resp.json())
      };
  
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(base64String);
        console.log(result);
        if (result ) {
          const emotions = result.body.detected_faces[0].info.emotions;
          const maxEmotion = Object.keys(emotions).reduce((prevEmotion, currEmotion) => {
            return emotions[currEmotion] > emotions[prevEmotion] ? currEmotion : prevEmotion;
          });
          console.log(maxEmotion);
          sessionStorage.setItem("Mood",maxEmotion);
          setIsResponseSuccessful(true);
          onUploadSuccess(); 
        } else {
          setIsResponseSuccessful(false);
        }
      } catch (error) {
        console.error(error);
      }
    };*/
  
    return (
      <>
        <button className="startButton" onClick={handleImageUpload} type="button">
          Upload
        </button>
        {isResponseSuccessful && <span>Upload successful!</span>}
      </>
    );
  };
  
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    /*
      const handleImageChange = (e) => {
        const image = e.target.files[0];
        setFormData({ ...formData, image });
      };
    */
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/putPost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          credentials: 'include',
          body: JSON.stringify({...formData }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      };
    return(
        <div>
            <Navbar />
            <div className="blog-form-container">
      <form onSubmit={handleSubmit} className="blog-form">
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </div>

        <div>
          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleInputChange} />
        </div>

        <div>
          <label>Tags:</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} />
        </div>

        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} />
        </div>

        <div>
          <label>Subtitle:</label>
          <input type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} />
        </div>

        <div>
          <label>Body:</label>
          <textarea name="body" value={formData.body} onChange={handleInputChange} />
        </div>

        <div>
          <label>Image:</label>
          {/* <input type="file" name="image" onChange={handleImageChange} accept="image/jpeg, image/png" /> */}
          <ImageUploader /> 
          {/* <button onClick={ImageUploader.handleImageUpload} type="button">Upload Image</button> */}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
            <Footer />  
        </div>
    )
}

export default PsyBlog