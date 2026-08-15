import { useQuery } from "@tanstack/react-query";
import { getProfile, getRanks } from "../api/profile.api";

export function useProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });
}

export function useRanks() {
    return useQuery({
        queryKey: ["ranks"],
        queryFn: getRanks,
    });
}