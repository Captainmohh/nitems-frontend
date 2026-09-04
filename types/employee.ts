export interface Employee {
  id: string;
  name: string;
  email: string;
  staffId: string;
  department: string;
  status: "Active" | "Pending" | "Terminated";
}
