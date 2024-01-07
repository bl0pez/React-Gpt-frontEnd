import { NavLink } from "react-router-dom";

interface Props {
  description: string;
  icon: string;
  title: string;
  to: string;
}

export const SidebarMenuItem = ({ description, icon, title, to }: Props) => {
  return (
    <NavLink
      title={title}
      key={to}
      to={to}
      className={({ isActive }) =>
        isActive
          ? "flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors"
          : "flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors"
      }
    >
      <i className={`${icon} text-2xl md:mr-4 text-indigo-400`} />
      <div className="md:flex flex-col flex-grow hidden">
        <span className="text-white text-lg font-semibold">{title}</span>
        <span className="text-gray-400 text-sm">{description}</span>
      </div>
    </NavLink>
  );
};
