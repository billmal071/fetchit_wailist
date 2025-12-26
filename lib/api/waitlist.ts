import axios from "axios";
import { WaitlistFormData } from "@/lib/validations/waitlist";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export interface WaitlistResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
  };
}

export const submitWaitlist = async (
  data: WaitlistFormData
): Promise<WaitlistResponse> => {
  const response = await api.post<WaitlistResponse>("/waitlist", data);
  return response.data;
};
