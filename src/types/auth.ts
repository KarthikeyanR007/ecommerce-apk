export interface RegisterPayload {
  name: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    phone: string;
    homeAddress: string;
    officeAddress: string;
    id: string;
    name: string;
    email: string;
  };
}
