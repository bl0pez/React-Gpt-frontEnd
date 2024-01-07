import { Outlet } from "react-router-dom";
import { menuRoutes } from "../router/router";
import { SidebarMenuItem } from "../components/sidebar/SidebarMenuItem";

export const DashboardLayout = () => {
  return (
    <main className="flex flex-row bg-body">
      <nav className="md:w-[400px] flex flex-col h-screen bg-primary">
        <div className="pt-5 px-5 hidden md:block">
          <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
            ReactGPT<span className="text-indigo-500">.</span>
          </h1>
          {/* <span className="text-xl">Bienvenido</span> */}

          <div className="border-gray-700 border my-3" />
        </div>

        {/* Opciones del menú */}
        <div className="flex-1 md:px-5 px-1 overflow-y-auto flex flex-col gap-y-1 justify-center md:justify-normal">
          {menuRoutes.map((option) => (
            <SidebarMenuItem {...option} key={option.to} />
          ))}
        </div>
      </nav>

      <section className="flex flex-col w-full p-5 h-screen overflow-hidden">
        <div className="flex flex-row bg-primary rounded h-full">
          <Outlet />
        </div>
      </section>
    </main>
  );
};
