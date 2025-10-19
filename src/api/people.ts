import { api } from './client';
import type { PaginatedResponse, Person } from '../types';

export async function fetchPeople(page = 1, perPage = 20): Promise<PaginatedResponse<Person>> {
  const res = await api.get(`/people`, { params: { page, per_page: perPage } });
  return res.data as PaginatedResponse<Person>;
}

export async function likePerson(id: string): Promise<void> {
  await api.post(`/people/${id}/like`);
}

export async function dislikePerson(id: string): Promise<void> {
  await api.post(`/people/${id}/dislike`);
}

export async function fetchLiked(page = 1, perPage = 20): Promise<PaginatedResponse<Person>> {
  const res = await api.get(`/people/liked`, { params: { page, per_page: perPage } });
  return res.data as PaginatedResponse<Person>;
}