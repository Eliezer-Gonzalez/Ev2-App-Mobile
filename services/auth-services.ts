import { API_URL } from "@/constants/config";
import axios from "axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
  };
}

export type RegisterPayload = LoginPayload;
export type RegisterResponse = LoginResponse;

export default function getAuthService() {
  const client = axios.create({
    baseURL: `${API_URL}/auth`,
  });

  async function login(loginPayload: LoginPayload): Promise<LoginResponse> {
    try {
      const response = await client.post<LoginResponse>("/login", loginPayload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          throw new Error("Las credenciales ingresadas no son válidas.");
        }
        if (error.response.status == 503) {
          throw new Error("Hay problemas con el worker. Acostúmbrate.");
        }
      }
      throw new Error(
        "Error al conectar con el servidor, reintente nuevamentee e e."
      );
    }
  }

  async function register(
    registerPayload: RegisterPayload
  ): Promise<RegisterResponse> {
    try {
      const response = await client.post<RegisterResponse>(
        "/register",
        registerPayload
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          throw new Error("Usuario existente, utiliza otro.");
        }
      }
      throw new Error(
        "Error al conectar con el servidor, reintente nuevamente."
      );
    }
  }

  return {
    login,
    register,
  };
}
