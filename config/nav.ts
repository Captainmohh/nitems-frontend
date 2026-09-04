export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "layout-dashboard" },
  { label: "Employee Records", href: "/employee-records", icon: "users" },
  { label: "Onboarding", href: "/onboarding", icon: "user-plus" },
  { label: "Data Update", href: "/data-update", icon: "refresh-cw" },
  { label: "User Management", href: "/user-management", icon: "shield" },
  { label: "Settings", href: "/settings", icon: "settings" },
];
