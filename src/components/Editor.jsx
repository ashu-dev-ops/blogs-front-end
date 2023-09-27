import { Button, Box, Tooltip, IconButton, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { saveBlog, updateBlog } from "../slice/blog";
import { useNavigate } from "react-router-dom";
import ImageResize from "quill-image-resize-module-react";
import QuillToolbar, { modules, formats } from "./QuillToolbar";
import PublishIcon from "@mui/icons-material/Publish";
import fileUploadPng from "../assets/images/file-upload.jpg";
// import EditorToolbar, { modules, formats } ;
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { BASE_URL } from "../constants";
import CustomizedDialogs from "./BlogImageUploadModal";
const Delta = Quill.import("delta");
const Break = Quill.import("blots/break");
const Embed = Quill.import("blots/embed");

Quill.register("modules/imageResize", ImageResize);

export default function Editor({ edit, data }) {
  const [imageFiles, setImagefiles] = useState([]);
  const [titleImage, setTitleImage] = useState(null);
  const [published, setPublished] = useState("");
  // let titleImage = null;
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Update the state with the selected file
    setFile(selectedFile);

    // Generate a preview URL for the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };
  const [open, setOpen] = useState(false);
  const [state, setState] = React.useState(
    "<h1>Title</h1>  <p>Tell your story</p>"
  );
  const [data2, setData2] = useState();
  const getData = async (blogId) => {
    // Pass id as a parameter to getData
    try {
      const response = await axios.get(`${BASE_URL}/blogs/${blogId}`);
      // console.log(response);
      console.log(response.data.data);
      setData2(response.data.data);
      setState(response.data.data.html);
      console.log(response.data.data.html);
      // Get the element with the id "content"
      const mi = response.data.data.title;
      // titleImage = response.data.data.heroImage;
      setTitleImage(response.data.data.heroImage);

      const contentElement = document.getElementsByClassName("content");

      // Insert the HTML content before the existing content
      // contentElement.insertAdjacentHTML("beforebegin", mi + mt);
      console.log(response.data.data.html);
      setState(response.data.data.html);
      // setData2(response.data.data);
      // setState2(contentElement);
      console.log(state);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (edit) {
      getData(data);
    }
  }, []);

  const { user } = useSelector((store) => store.user);
  console.log(user.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quillRef = useRef();

  if (edit) {
    console.log("below");
    console.log(data);
    // setState(data.html);
  }
  const handleChange = (value) => {
    setState(value);
  };
  let urls = [];
  const handleSave = (action) => {
    setPublished(action);
    console.log("running>>>>>>>>>. our action");
    let published = false;
    if (action === "publish") {
      console.log("running>>>>>>>>>. our action");
      console.log(action);
      published = true;
    }
    // const text = quillRef.getText();
    // setSavedText(text);
    const quill = quillRef.current.getEditor(); // Access the Quill instance
    // const text = quill.getText();
    const text = quill.root.innerHTML;
    // const delta = quill.g;
    console.log(text);
    // setSavedText(text);
    // saveBlog({ text, urls });
    console.log(edit);
    setOpen(true);
  };
  const handleSave2 = async () => {
    console.log("handle save 2 running>>>>>>>");
    let titleImageUrl = null;
    try {
      if (!titleImage || file) {
        const formData = new FormData();
        formData.append("file", file);

        // Make a POST request to your server using Axios
        const response = await axios.post(
          `${BASE_URL}/blogs/uploads`,
          formData
        );
        console.log(response);
        titleImageUrl = response.data.url;
      } else {
        titleImageUrl = titleImage;
      }

      const quill = quillRef.current.getEditor(); // Access the Quill instance
      // const text = quill.getText();
      const text = quill.root.innerHTML;

      if (!edit) {
        console.log("running save draft");
        dispatch(
          saveBlog({
            text,
            urls,
            writtenBy: user.user.id,
            published,
            heroImage: titleImageUrl,
          })
        ).then(() => {
          if (!published) {
            navigate("/user/read-all");
          } else {
            navigate("/user/published");
          }
        });
      } else {
        console.log("publish blog");
        dispatch(
          updateBlog({
            html: text,
            urls,
            id: data,
            published,
            heroImage: titleImageUrl,
          })
        ).then(() => {
          if (!published) {
            navigate("/user/read-all");
          } else {
            navigate("/user/published");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className=""
        style={{ minHeight: "80vh", width: "75%", margin: "auto" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 3,
            right: "30px",
            boxShadow: 3,
            borderRadius: "16px",
          }}
        >
          <Tooltip title="Publish">
            <IconButton onClick={() => handleSave(true)}>
              <PublishIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={`${edit ? "update draft" : "save as draft"}`}>
            <IconButton onClick={() => handleSave(false)}>
              <SaveAsIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <QuillToolbar quillRef={quillRef} />
        <ReactQuill
          ref={quillRef}
          // // modules={modules}
          // theme="snow"
          // value={initialContent}
          theme="snow"
          value={state}
          onChange={handleChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
        />
      </div>
      <CustomizedDialogs
        open={open}
        setOpen={setOpen}
        title={titleImage ? "Check title image " : "choose an title image"}
        handleSaveImage={handleSave2}
      >
        {titleImage ? (
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              maxWidth={500}
              maxHeight={400}
              src={previewUrl || titleImage}
              sx={{ margin: "auto", display: "block", height: 300 }}
              onClick={() => {
                // Trigger file input click on image click
                document.getElementById("fileInput").click();
              }}
            ></Box>
            {/* Hidden file input */}
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div
              className="div"
              style={{
                position: "absolute",
                bottom: "30px",
                left: "25%",
                color: "gray",
                fontWeight: "bold",
              }}
            >
              Double tap image to update it
            </div>
          </Box>
        ) : (
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              maxWidth={500}
              sx={{ margin: "auto", display: "block", height: 300 }}
              src={previewUrl || fileUploadPng}
              onClick={() => {
                // Trigger file input click on image click
                document.getElementById("fileInput").click();
              }}
            ></Box>
            {/* Hidden file input */}
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div
              className="div"
              style={{
                position: "absolute",
                bottom: "30px",
                left: "25%",
                color: "gray",
                fontWeight: "bold",
              }}
            >
              Click here to upload an image
            </div>
          </Box>
        )}
      </CustomizedDialogs>
    </>
  );
}
