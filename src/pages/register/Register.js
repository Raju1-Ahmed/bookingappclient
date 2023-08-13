import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Loading from "../../components/loading/Loading";
// import Loading from "../../components/loading/Loading";
import './register.css'
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Register = ({ inputs, title }) => {
    
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };


  const handleClick  = async (e) => {
    e.preventDefault();

    if (!info.name) {
      setErrorMessage("Please enter a name.");
      return;
    }

    setIsLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dmrxamgbh/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("https://villaverse.onrender.com/api/auth/register", newUser);

      setInfo({});
      setFile("");

      // dispatch({ type: 'YOUR_ACTION_TYPE', payload: newUser });
      
      await dispatch({ type: 'YOUR_ACTION_TYPE', payload: newUser });

      
      console.log('User registered successfully.');

      // Save user data to local storage
      localStorage.setItem('userDetails', JSON.stringify(newUser));

      navigate('/'); // Navigate to the home route after successful insertion
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message;
        setErrorMessage(errorMessage);
        console.log(errorMessage);
      } else if (err.request) {
        const errorMessage = "Request error. Please try again.";
        setErrorMessage(errorMessage);
        console.log(err.request);
      } else {
        const errorMessage = "An unexpected error occurred.";
        setErrorMessage(errorMessage);
        console.log(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  
    return (
        <div className="container">
            <div className="inputForm">
                <div className="left">
                    <img className="img"
                        src={
                            file
                                ? URL.createObjectURL(file)
                                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                    />
                </div>
                <div className="right">                 
                    <form>   
                        <div className="formInput">
                        <label htmlFor="file">
                            Image: <img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/48/open-file-under-cursor.png" alt="open-file-under-cursor" />
                        </label>
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                    </div>
                        <div className="formRow">
                            {inputs.slice(0, 3).map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        id={input.id}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="formRow">
                            {inputs.slice(3, 6).map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        id={input.id}
                                    />
                                </div>
                            ))}
                        </div>
                        <button onClick={handleClick}>Send</button>
                    </form>
                </div>
            </div>

            {errorMessage && <p className="error">{errorMessage}</p>}
            {/* {successMessage && (
          <div className="popup">
            <p>{successMessage}</p>
          </div>
        )} */}
            {isLoading && <Loading />} {/* Render the loading spinner while isLoading is true */}
        </div>
    );
};

export default Register;



