import { useMediaQuery } from "@mantine/hooks";

export function useIsTablet() {
    return useMediaQuery(`(min-width: 769px) and (max-width: 1200px)`);
}