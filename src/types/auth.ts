export interface RegisterPayload {
  name: string;
  email: string;
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
