import { getUserInfo } from "@/utils/getUserInfo";
import { handleLogout } from "@/utils/handleLogout";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastProvider";
import Car from "@/assets/svgs/car.png";

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = getUserInfo();
  const { showToast } = useToast();

  return (
    <div className="bg-gray-800 min-w-full items-center h-15 fixed top-0 text-md font-bold p-2 px-10 flex justify-between z-10">
      <div className="flex gap-2 items-center">
        <img src={Car} alt="Car" className="w-8 h-8 text-white" />
        Vehicle Dashboard
      </div>
      <div className="flex gap-5 items-center">
        <button
          onClick={() => {
            handleLogout();
            showToast("Logout success!", "success");
            queryClient.removeQueries({ queryKey: ["all-tickets"] });
            navigate("/login");
          }}
          className="rounded-4xl items-center flex"
        >
          <div className="text-[12px] text-white hover:text-red-400 hover:border hover:border-red-400 hover:rounded-2xl w-20 py-1">
            <p>Logout</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
