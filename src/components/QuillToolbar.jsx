import React from "react";
import { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";

import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import axios from "axios";
import { BASE_URL } from "../constants";

Quill.register("modules/imageResize", ImageResize);
// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);
let urls = [];
// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "fair-display",
  "roboto",
  "roboto-serif",
  "poppins",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);
function imageLinkHandler() {
  console.log(this.quill);
  var range = this.quill.getSelection(); // Get the current selection range
  var url = prompt("Enter Image URL: ");
  if (url !== null) {
    this.quill.insertEmbed(range.index, "image", url, "image-custom-class"); // Insert the image at the current cursor position
  }
}
function imageHandler(e) {
  // const editor = quillRef.current.getEditor();
  // console.log(editor);
  console.log(this.quill);
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (/^image\//.test(file.type)) {
      console.log(file);
      const formData = new FormData();
      formData.append("image", file);
      let url = "";
      axios
        .post(`${BASE_URL}/blogs/uploads`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        })
        .then((response) => {
          // Handle the server response
          console.log("File uploaded successfully:", response.data);
          console.log(response.data.url);
          var range = this.quill.getSelection();
          urls.push(response.data.url);
          this.quill.insertEmbed(
            range.index,
            "image",
            response.data.url,
            "image-custom-class"
          );
      
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error uploading file:", error);
        });
   
      console.log(url);
    } else {
      // ErrorToast('You could only upload images.');
      console.log("error occur");
    }
  };
}
// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
      imageLink: imageLinkHandler,
      image: imageHandler,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
  // clipboard: {
  //   matchers: [["BR", lineBreakMatcher]],
  //   matchVisual: false,
  // },

  // keyboard: {
  //   bindings: {
  //     linebreak: {
  //       key: 13,
  //       shiftKey: true,
  //       handler: function (range) {
  //         const currentLeaf = this.quill.getLeaf(range.index)[0];
  //         const nextLeaf = this.quill.getLeaf(range.index + 1)[0];
  //         this.quill.insertEmbed(range.index, "break", true, "user");
  //         // Insert a second break if:
  //         // At the end of the editor, OR next leaf has a different parent (<p>)
  //         if (nextLeaf === null || currentLeaf.parent !== nextLeaf.parent) {
  //           this.quill.insertEmbed(range.index, "break", true, "user");
  //         }
  //         // Now that we've inserted a line break, move the cursor forward
  //         this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
  //       },
  //     },
  //   },
  // },

  // imageResize: {
  //   parchment: Quill.import("parchment"),
  //   modules: ["DisplaySize", "Toolbar"],
  //   // modules: ["Resize", "DisplaySize",],
  // },
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

// Quill Toolbar component
export const QuillToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="fair-display">Fair display</option>
        <option value="roboto">Roboto</option>
        <option value="roboto-serif">roboto-serif</option>
        <option value="poppins">Poppins</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>

      <select className="ql-header" defaultValue="3">
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
        <option value="5">extra small</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>

    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-imageLink">
        <ImageSearchIcon />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span>
  </div>
);

export default QuillToolbar;
