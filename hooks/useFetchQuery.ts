import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {Color} from "@/constants/Color";

const endPoint = "https://pokeapi.co/api/v2";

type API = {
    '/pokemon?limit=21': {
        count: number;
        next: string | null;
        results: { name: string, url: string }[];
    },
    '/pokemon/[id]': {
        id: number;
        name: string;
        url: string;
        heigth: number;
        weight: number;
        moves: { move: { name: string; } }[];
        stats: {
            base_stat: number;
            state: {
                name: string;
            }
        }[];
        cries: {
            latest: string;
        };
        types: {
            type: {
                name: keyof (typeof Color)["type"];
            }
        }[];
    },
    '/pokemon-species/[id]': {
        flavour_text_entries: {
            flavour_text: string;
            language: {
                name: string;
            };
        }[]
    }
}

export function useFetchQuery<T extends keyof API>(path: T, params?: Record<string, string | number>) {
    // @ts-ignore
    const localUrl = endPoint + Object.entries(params ?? {}).reduce(
        (acc, [key, value]) => acc.replaceAll(`[${key}]`, value),
        path
    )
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            return fetch(path, {
                headers: {
                    Accept: 'application/json'
                }
            }).then((res) => res.json() as Promise<API[T]>);
        }
    })
}

export function useInfiniteFetchQuery<T extends keyof API>(path: T) {
    return useInfiniteQuery({
        queryKey: [path],
        initialPageParam: endPoint + path,
        queryFn: async ({pageParam}) => {
            return fetch(pageParam, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(res => res.json() as Promise<API[T]>)
        },
        getNextPageParam: (lastPage) => {
            if ("next" in lastPage) {
                return lastPage.next
            }
            return null
        }
    })
}

function wait(duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration * 1000));
}