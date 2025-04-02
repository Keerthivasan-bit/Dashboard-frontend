import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { addItem, updateItem } from "../services/apiService";

const FormModal = ({ visible, setVisible, selectedItem, fetchData }) => {
  const initialState = {
    firstName: "",
    lastName: "",
    age: "",
    department: "",
    phoneNumber: "",
    image: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        firstName: selectedItem.firstName || "",
        lastName: selectedItem.lastName || "",
        age: selectedItem.age || "",
        department: selectedItem.department || "",
        phoneNumber: selectedItem.phoneNumber || "",
        image: null, // Image will be handled separately
      });

      // Show the existing image if available
      setPreview(selectedItem.image ? `http://localhost:5000${selectedItem.image}` : null);
    } else {
      setFormData(initialState);
      setPreview(null);
    }
  }, [selectedItem, visible]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("department", formData.department);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    if (selectedItem) {
      await updateItem(selectedItem._id, formDataToSend);
    } else {
      await addItem(formDataToSend);
    }

    fetchData();
    setVisible(false);
  };

  return (
    <Dialog
      visible={visible}
      onHide={() => setVisible(false)}
      header={selectedItem ? "Edit Item" : "Add Item"}
      className="w-full max-w-md rounded-lg shadow-lg"
      headerStyle={{
        backgroundColor: "#75ba75",
        color: "white",
        padding: "1rem",
        fontWeight: "bold",
      }}
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="flex flex-col gap-4 p-6 bg-white">
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">First Name</label>
          <InputText
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75ba75] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">Last Name</label>
          <InputText
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75ba75] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">Age</label>
          <InputText
            type="number"
            placeholder="Enter Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75ba75] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">Department</label>
          <InputText
            placeholder="Enter Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75ba75] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">Phone Number</label>
          <InputText
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75ba75] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />

          {preview && (
            <img 
              src={preview} 
              alt="Preview" 
              className="w-32 h-32 object-cover mt-2 rounded-lg shadow border"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 mt-2 bg-[#75ba75] hover:bg-[#5f9b5f] text-white font-semibold rounded-md transition-colors"
        >
          Save
        </button>
      </div>
    </Dialog>
  );
};

export default FormModal;
