export interface Token {
  id: string;
  email: string;
  credits: number;
  createdAt: Date;
  expiresAt: Date;
}

export interface CreateTokenRequest {
  token: string;
}

export interface UpdateTokenRequest {
  increment?: number;
}

export interface SolveRequest {
  token: string;
  image: string;
}

export interface Icon {
    position: number;
    start: number;
    end: number;
    centerX: number;
    centerY: number;
    success: boolean;
}

export interface IconFailed {
    message: string;
    success: boolean;
}