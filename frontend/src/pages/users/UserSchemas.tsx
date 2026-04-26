import { z } from "zod";

export const userTableColumns = [
    { key: "email", label: "Email" },
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "mobile_number", label: "Mobile Number" },
  ];


export const userFields = [
    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Enter email' },
    { name: 'first_name', label: 'First Name', type: 'text', required: true, placeholder: 'Enter first name' },
    { name: 'last_name', label: 'Last Name', type: 'text', required: false, placeholder: 'Enter last name' },
    { name: 'mobile_number', label: 'Mobile Number', type: 'text', required: true, placeholder: 'Enter mobile number' },
  ]


















// User schema
export const userSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, "First name is required"),

  last_name: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")), // allows empty string safely

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  mobile_number: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
});
















export interface User {
  id: string | number;
  email: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
}

export interface UserModalState {
  show: boolean;
  mode: "create" | "edit" | "delete" | "";
}