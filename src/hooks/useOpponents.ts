import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPeople, likePerson, dislikePerson, fetchLiked } from '../api/people';
import type { Person, PaginatedResponse } from '../types';

export function useOpponents(perPage = 10) {
  return useInfiniteQuery({
    queryKey: ['people', perPage],
    queryFn: ({ pageParam = 1 }) => fetchPeople(pageParam as number, perPage),
    getNextPageParam: (lastPage) => {
      const next = lastPage.current_page + 1;
      return next <= lastPage.last_page ? next : undefined;
    },
    initialPageParam: 1,
  });
}

export function useLiked(perPage = 20) {
  return useInfiniteQuery({
    queryKey: ['liked', perPage],
    queryFn: ({ pageParam = 1 }) => fetchLiked(pageParam as number, perPage),
    getNextPageParam: (lastPage) => {
      const next = lastPage.current_page + 1;
      return next <= lastPage.last_page ? next : undefined;
    },
    initialPageParam: 1,
  });
}

export function useLikeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (person: Person) => likePerson(person.id),
    onSuccess: (_, person) => {
      // Update all liked query caches regardless of perPage parameter
      const likedQueries = queryClient.getQueryCache().findAll({ queryKey: ['liked'] });
      
      likedQueries.forEach((query) => {
        queryClient.setQueryData(query.queryKey, (prev: any) => {
          if (!prev) {
            return { 
              pages: [{ data: [person], hasNextPage: false }], 
              pageParams: [undefined] 
            };
          }
          
          const [first, ...rest] = prev.pages;
          if (!first) {
            return { 
              pages: [{ data: [person], hasNextPage: false }], 
              pageParams: [undefined] 
            };
          }
          
          const existsInList = prev.pages.some((page: any) => 
            page.data.some((existingPerson: Person) => existingPerson.id === person.id)
          );
          
          if (existsInList) return prev;
          
          return {
            ...prev,
            pages: [{ ...first, data: [person, ...first.data] }, ...rest],
          };
        });
      });

      queryClient.invalidateQueries({ queryKey: ['liked'] });
    },
  });
}

export function useDislikeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (person: Person) => dislikePerson(person.id),
    onSuccess: () => {
    },
  });
}