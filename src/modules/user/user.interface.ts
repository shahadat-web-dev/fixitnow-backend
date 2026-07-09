export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  image?: string;
}