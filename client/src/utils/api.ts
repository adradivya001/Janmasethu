const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://uncollectively-unfutile-deandrea.ngrok-free.dev';

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  phone_number?: string;
  role?: string;
  preferred_language?: string;
  gender?: string;
  location?: string;
  user_relation?: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: string;
  user_id: string;
  user: {
    user_id: string;
    name: string;
    email: string;
    phone_number?: string;
    role: string;
    preferred_language: string;
    gender?: string;
    location?: string;
  };
}

export interface LoginResponse {
  status: string;
  user_id: string;
  user: {
    user_id: string;
    name: string;
    email: string;
    phone_number?: string;
    role: string;
    preferred_language: string;
    gender?: string;
    location?: string;
  };
}

export interface ChatResponse {
  reply: string;
  mode?: string;
  language?: string;
  youtube_link?: string;
  infographic_url?: string;
  route?: string;
  intent?: string;
}

export interface OnboardingStepRequest {
  parent_profile_id: string;
  relationship_type: string;
  current_step: number;
  answers_json: Record<string, any>;
}

export interface OnboardingStepResponse {
  completed: boolean;
  question?: {
    id: number;
    question: string;
    type: string;
    field_name: string;
    options?: string[];
    optional?: boolean;
  };
  total_steps?: number;
  parent_profile_id?: string;
  relationship_type?: string;
  answers_json?: Record<string, any>;
}

export interface OnboardingCompleteRequest {
  parent_profile_id: string;
  user_id: string;
  relationship_type: string;
  answers_json: Record<string, any>;
}

export async function registerUser(data: RegisterUserData): Promise<RegisterResponse> {
  const response = await fetch(`${API_BASE_URL}/user/register`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      phone_number: data.phone_number || null,
      role: data.role || 'USER',
      preferred_language: data.preferred_language || 'en',
      gender: data.gender || null,
      location: data.location || null,
      user_relation: data.user_relation || null,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || 'Registration failed');
  }

  return result;
}

export async function loginUser(data: LoginUserData): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || 'Login failed');
  }

  return result;
}

export async function sendChatMessage(userId: string, message: string, language: string = 'en'): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/sakhi/chat`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify({
      user_id: userId,
      message: message,
      language: language,
    }),
  });

  if (!response.ok) {
    throw new Error('Chat request failed');
  }

  return await response.json();
}

export async function getOnboardingStep(data: OnboardingStepRequest): Promise<OnboardingStepResponse> {
  const response = await fetch(`${API_BASE_URL}/onboarding/step`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify({
      parent_profile_id: data.parent_profile_id,
      relationship_type: data.relationship_type,
      current_step: data.current_step,
      answers_json: data.answers_json,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get onboarding step');
  }

  return await response.json();
}

export async function completeOnboarding(data: OnboardingCompleteRequest): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/onboarding/complete`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify({
      parent_profile_id: data.parent_profile_id,
      user_id: data.user_id,
      relationship_type: data.relationship_type,
      answers_json: data.answers_json,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to complete onboarding');
  }
}

export { API_BASE_URL };
