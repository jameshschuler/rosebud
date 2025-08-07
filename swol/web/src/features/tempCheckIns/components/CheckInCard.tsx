import { useIsMobile } from "@/hooks/useIsMobile";
import { SWOL_GREEN } from "@/theme";
import { Badge, Button } from "@mantine/core";

interface CheckInCardProps {
    onClick: () => void;
    checkInDate: string;
    activityCount: number;
}

export function CheckInCard({ checkInDate, onClick, activityCount }: CheckInCardProps) {
    const isMobile = useIsMobile()

    return (
        <Button
            style={{
                boxShadow: `4px 4px 0px black`,
            }}
            onClick={onClick}
            w={isMobile ? 85 : 160}
            key={checkInDate}
            variant="outline"
            color="black"
            bg='white'
            radius="md"
            leftSection={
                <Badge size="xs" color={SWOL_GREEN}>{activityCount}</Badge>
            }
        >
            {checkInDate}
        </Button>
    )
}