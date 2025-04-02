import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import FormModal from "./FormModal";
import { getItems, deleteItem } from "../services/apiService";
import Sidebar from "./Sidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const DataTablePage = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    getItems().then(items => setData(items));
  }, []);
  
  const fetchData = async () => {
    const items = await getItems();
    console.log(items);
    console.log(items.rowData);
    setData(items);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchData();
  };

  const exportToExcel = () => {
    const exportData = data.map((item) => ({
      "First Name": item.firstName,
      "Last Name": item.lastName,
      Age: item.age,
      Department: item.department,
      "Phone Number": item.phoneNumber,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "DataTable_Export.xlsx");
  };

  const header = (
    <div className="flex justify-between items-center px-4 py-2 bg-[#75ba75] text-white rounded-t-lg mb-8">
      <h2 className="text-xl font-bold">Data Table</h2>
      <div className="flex gap-2">
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 px-4 py-2 bg-[#5f9b5f] hover:bg-[#4d804d] text-white rounded-md transition-colors"
        >
          <i className="fa-solid fa-file-excel"></i>
          Export to Excel
        </button>
        <button
          onClick={() => setVisible(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#5f9b5f] hover:bg-[#4d804d] text-white rounded-md transition-colors"
        >
          <i className="fa-solid fa-plus"></i>
          Add Item
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 md:pl-0 p-4 md:p-0">
        <button
          className="md:hidden p-2 bg-[#75ba75] text-white rounded-md"
          onClick={() => setSidebarOpen(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="w-full overflow-x-auto">
        <DataTable
  value={data}
  paginator
  rows={5}
  stripedRows
  header={header}
  className="shadow-lg rounded-b-lg bg-white border border-gray-200 text-center"
  paginatorClassName="p-4 bg-gray-100 rounded-b-lg"
  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
  rowsPerPageOptions={[5, 10, 25, 50]}
  tableStyle={{
    width: "100%",
    height: "100%",
    textAlign: "center",
    margin: 0,
    padding: 0,
  }}
  responsiveLayout="scroll"
>
  {[
    { field: "firstName", header: "First Name", minWidth: "120px" },
    { field: "lastName", header: "Last Name", minWidth: "120px" },
    { field: "age", header: "Age", minWidth: "80px" },
    { field: "department", header: "Department", minWidth: "150px" },
    { field: "phoneNumber", header: "Phone Number", minWidth: "150px" },
  ].map((col) => (
    <Column
      key={col.field}
      field={col.field}
      header={col.header}
      sortable
      style={{
        backgroundColor: "#f9fafb",
        minWidth: col.minWidth,
        textAlign: "center",
        padding: 0,
        margin: 0,
      }}
      headerStyle={{
        backgroundColor: "#75ba75",
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        padding: "0.5rem",
      }}
      headerClassName="text-center"
      bodyStyle={{
        padding: "0.5rem",
        borderBottom: "1px solid #e5e7eb",
        textAlign: "center",
        margin: 0,
      }}
    />
  ))}

  {/* Image Column - Placed Before Actions */}
  <Column
    header="Image"
    body={(rowData) =>
      rowData.image ? (
        <img
          src={`http://localhost:5000${rowData.image}`}
          alt="Profile"
          className="w-16 h-16 object-cover rounded-full border border-gray-300 shadow-sm"
        />
      ) : (
        <span className="text-gray-500">No Image</span>
      )
    }
    headerStyle={{
      backgroundColor: "#75ba75",
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      padding: "0.5rem",
    }}
    bodyStyle={{
      padding: "0.5rem",
      borderBottom: "1px solid #e5e7eb",
      textAlign: "center",
    }}
  />

  {/* Actions Column - Appears After Image */}
  <Column
    header="Actions"
    headerStyle={{
      backgroundColor: "#75ba75",
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      padding: "0.5rem",
    }}
    headerClassName="text-center"
    bodyStyle={{
      padding: "0.5rem",
      borderBottom: "1px solid #e5e7eb",
      minWidth: "120px",
      textAlign: "center",
      margin: 0,
    }}
    body={(rowData) => (
      <div className="flex justify-center gap-2">
        <button
          onClick={() => {
            setSelectedItem(rowData);
            setVisible(true);
          }}
          className="p-2 bg-[#f4a261] hover:bg-[#e68a41] text-white rounded-full transition-colors"
        >
          <i className="fa-solid fa-pen"></i>
        </button>
        <button
          onClick={() => handleDelete(rowData._id)}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    )}
  />
</DataTable>

        </div>

        <FormModal
          visible={visible}
          setVisible={setVisible}
          selectedItem={selectedItem}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default DataTablePage;
