import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate(); // ✅ Initialize navigation

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-[#75ba75] text-white transform mr-3 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex items-center justify-between p-4 border-b border-[#5f9b5f]">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          <i className="fa-solid fa-times text-2xl"></i>
        </button>
      </div>

      <nav className="mt-4">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-left bg-[#5f9b5f] hover:bg-[#1c611c] transition-colors rounded-md"
          onClick={() => navigate("/dashboard")}
        >
          <i className="fa-solid fa-user"></i>
          <span>User</span>
        </button>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-left bg-[#5f9b5f] hover:bg-[#1c611c] transition-colors rounded-md"
          onClick={() => navigate("/attendance")}
        >
          <i className="fa-solid fa-user"></i>
          <span>Attendance</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
