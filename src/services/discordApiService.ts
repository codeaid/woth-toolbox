const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://65.109.100.181:8080';

export interface Herd {
  id: number;
  herd_name: string;
  map_name: string;
  species_name: string;
  animal_count: number;
  tracking_mode: 'individual' | 'habitat_wide';
}

export interface HabitatGroup {
  habitat_name: string;
  animals: TrackedAnimal[];
}

export interface HerdsResponse {
  tracking_mode: 'individual' | 'habitat_wide';
  herds?: Herd[];
  habitats?: HabitatGroup[];
}

export interface TrackedAnimal {
  id: number;
  herd_id?: number;
  habitat_name?: string;
  species_name: string;
  age_class: 'Young' | 'Adult' | 'Mature';
  star_rating: number;
  responds_to_caller: boolean;
  location_notes: string;
  last_seen: string;
  culling_recommendation?: 'CULL' | 'LEAVE' | 'MONITOR' | 'TROPHY';
}

export interface AnimalsResponse {
  herd: Herd;
  animals: TrackedAnimal[];
}

export interface GameMap {
  map_name: string;
}

export interface Species {
  species_name: string;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('jwt_token');
  
  if (!token) {
    throw new Error('Not authenticated');
  }

  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

export async function fetchUserHerds(): Promise<HerdsResponse> {
  const response = await fetch(`${API_BASE_URL}/api/user/herds`, {
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('jwt_token');
      throw new Error('Session expired. Please login again.');
    }
    throw new Error('Failed to fetch herds');
  }

  return await response.json();
}

export async function fetchHerdAnimals(herdId: number): Promise<AnimalsResponse> {
  const response = await fetch(`${API_BASE_URL}/api/user/animals/${herdId}`, {
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('jwt_token');
      throw new Error('Session expired. Please login again.');
    }
    throw new Error('Failed to fetch animals');
  }

  return await response.json();
}

export async function fetchMaps(): Promise<GameMap[]> {
  const response = await fetch(`${API_BASE_URL}/api/maps`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch maps');
  }

  return await response.json();
}

export async function fetchSpecies(): Promise<Species[]> {
  const response = await fetch(`${API_BASE_URL}/api/species`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch species');
  }

  return await response.json();
}

export function calculateCullingRecommendation(
  ageClass: string,
  starRating: number,
  respondsToCaller: boolean
): 'CULL' | 'LEAVE' | 'MONITOR' | 'TROPHY' {
  if (ageClass === 'Young') {
    if (starRating === 1 && respondsToCaller) return 'CULL';
    return 'LEAVE';
  } else if (ageClass === 'Adult') {
    if (starRating <= 2) return 'MONITOR';
    if (starRating === 5) return 'TROPHY';
    return 'LEAVE';
  } else if (ageClass === 'Mature') {
    if (starRating <= 2) return 'CULL';
    if (starRating === 3) return 'MONITOR';
    return 'TROPHY';
  }
  return 'MONITOR';
}

export function isUserLoggedIn(): boolean {
  return !!localStorage.getItem('jwt_token');
}
