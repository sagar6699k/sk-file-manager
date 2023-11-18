import "./homepage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const Homepage = () => {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  let list = ["Natural things1", "Natural things2"];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = () => {
    if (file) {
      // Update the file list with the new file
      setFileList((prevList) => [...prevList, file]);

      // Clear the file input and file state
      setFile(null);
    }
  };

  const handleDelete = (index) => {
    setFileList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <div className="homepage_container">
      <div className="input_section">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload the required file</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} file={file} />
        </Form.Group>

        <Button variant="secondary" onClick={handleSubmit}>
          Upload
        </Button>
      </div>
      <div className="list_section">
        {fileList.map((file, index) => (
          <div key={index} className="list_item">
            <div className="list_item_content">
              <div className="item_image_div">
                <img src={file} alt={`uploaded-${index}`} />
              </div>
              <div className="item_name_div">{`Image ${index + 1}`}</div>
            </div>
            <div
              className="list_item_action_btn"
              onClick={() => handleDelete(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
