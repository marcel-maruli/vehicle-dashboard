import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = (props: React.PropsWithChildren) => {
  return (
    <div className="w-screen h-screen bg-gray-300">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="w-full px-10 pt-30 overflow-auto max-h-screen">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
