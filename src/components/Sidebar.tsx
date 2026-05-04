import { getUserInfo } from "@/utils/getUserInfo";
import {
  DatabaseIcon,
  LayoutDashboard,
  User2,
  ChevronDown,
  ChevronRight,
  TruckIcon,
  FactoryIcon,
  CarIcon,
  CarFrontIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Routes = [
  {
    url: "/",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Data Analysis",
    icon: DatabaseIcon,
    children: [
      { url: "/brand-list", name: "All Brands", icon: TruckIcon },
      { url: "/manufacture-list", name: "Manufacture List", icon: FactoryIcon },
      { url: "/vehicle-type-list", name: "Vehicle Type List", icon: CarIcon },
      { url: "/model-list", name: "Model List", icon: CarFrontIcon },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUserInfo();

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const isCurrentPath = (url: string) => location.pathname === url;

  return (
    <div className="text-black font-medium bg-white shadow-xl w-64 h-screen border-r pt-15">
      <div className="flex flex-col w-full">
        {/* User Info Section */}
        <div className="border-b flex items-center gap-3 py-6 px-4 bg-gray-50">
          <div className="border bg-white rounded-full p-2 w-12 h-12 flex items-center justify-center shadow-sm">
            <User2 className="text-gray-600" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{user.username}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase font-bold">
              {user.role.id === 1 ? "Admin" : "Viewer"}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 mt-4">
          {Routes.map((route) => {
            const hasChildren = route.children && route.children.length > 0;
            const isOpen = openMenus[route.name];

            return (
              <div key={route.name} className="border-b border-gray-100">
                {/* Main Menu Item */}
                <button
                  className={`flex items-center justify-between px-4 py-4 w-full text-left transition-colors hover:bg-gray-50 ${
                    isCurrentPath(route.url || "")
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-700"
                  }`}
                  onClick={
                    hasChildren
                      ? () => toggleMenu(route.name)
                      : () => navigate(route.url!)
                  }
                >
                  <div className="flex items-center gap-3">
                    <route.icon size={20} />
                    <span>{route.name}</span>
                  </div>
                  {hasChildren &&
                    (isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    ))}
                </button>

                {hasChildren && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 ${
                      isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="py-2">
                      {route.children?.map((child) => {
                        return (
                          <button
                            key={child.url}
                            onClick={() => navigate(child.url)}
                            className={`flex items-center gap-3 w-full pl-12 py-3 text-sm transition-colors hover:text-blue-600 ${
                              isCurrentPath(child.url)
                                ? "text-blue-600 font-bold"
                                : "text-gray-500"
                            }`}
                          >
                            <child.icon />
                            {child.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
