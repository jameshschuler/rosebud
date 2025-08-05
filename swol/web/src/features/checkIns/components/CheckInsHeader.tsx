import { SWOL_GREEN } from "@/theme";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Title } from "@mantine/core";
import { ResponsiveButton } from "../../../components/ui/ResponsiveButton";

interface CheckInsHeaderProps {
    hasCheckIns: boolean;
    onAddCheckIn: () => void;
}

export function CheckInsHeader({ onAddCheckIn, hasCheckIns }: CheckInsHeaderProps) {

    return (
        <Flex justify="space-between" align="center">
            <Title>Your Check Ins</Title>
            <Flex gap={8} align="center">
                {hasCheckIns && (
                    <ResponsiveButton
                        icon={<FontAwesomeIcon icon={faPlus} size="lg" />}
                        onClick={onAddCheckIn}
                        label="New Check In"
                        color={SWOL_GREEN}
                    />
                )}
            </Flex>
        </Flex>
    );
}