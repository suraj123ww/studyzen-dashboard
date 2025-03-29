
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookText, 
  SquarePen, 
  Clock, 
  Settings 
} from 'lucide-react';

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Flashcards",
    href: "/flashcards",
    icon: <BookText className="h-5 w-5" />,
  },
  {
    title: "Quizzes",
    href: "/quizzes",
    icon: <SquarePen className="h-5 w-5" />,
  },
  {
    title: "Study Timer",
    href: "/timer",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="fixed inset-y-0 left-0 w-16 md:w-64 bg-primary text-primary-foreground flex flex-col border-r border-primary/10">
      <div className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white text-primary rounded-md w-8 h-8 flex items-center justify-center font-bold">
            S
          </div>
          <h1 className="text-xl font-bold hidden md:block">StudyZen</h1>
        </Link>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  "hover:bg-primary-foreground/10",
                  location.pathname === item.href
                    ? "bg-primary-foreground/10 font-medium"
                    : "transparent"
                )}
              >
                {item.icon}
                <span className="hidden md:inline-block">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-xs">US</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">User</p>
            <p className="text-xs opacity-70">student@college.edu</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
