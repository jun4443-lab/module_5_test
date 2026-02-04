import {
  dashboardStats,
  trafficData,
  threatTypes,
  recentEvents,
} from './mockData';

const USE_MOCK = true;
const API_BASE = '/api/v1';

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchApi(endpoint, options = {}) {
  if (USE_MOCK) {
    await delay();
    return getMockData(endpoint);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

function getMockData(endpoint) {
  switch (endpoint) {
    case '/dashboard/stats':
      return dashboardStats;
    case '/dashboard/traffic':
      return trafficData;
    case '/dashboard/threats':
      return threatTypes;
    case '/logs/recent':
      return recentEvents;
    default:
      return null;
  }
}

export async function login(email, password) {
  if (USE_MOCK) {
    await delay(500);
    if (email && password) {
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          name: '관리자',
          email: email,
          role: 'admin',
        },
      };
    }
    throw new Error('이메일과 비밀번호를 입력해주세요.');
  }

  return fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getDashboardStats() {
  return fetchApi('/dashboard/stats');
}

export async function getTrafficData() {
  return fetchApi('/dashboard/traffic');
}

export async function getThreatTypes() {
  return fetchApi('/dashboard/threats');
}

export async function getRecentEvents() {
  return fetchApi('/logs/recent');
}
