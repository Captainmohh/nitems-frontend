export interface OnboardingRequest {
  id: string;
  name: string;
  email: string;
  dueDate: string;
  status: "pending" | "active";
}
