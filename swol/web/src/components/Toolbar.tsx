import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Flex, VisuallyHidden } from "@mantine/core";
import { Link, useLocation } from "@tanstack/react-router";
import { useCallback } from "react";

export function Toolbar() {
    const location = useLocation();
    const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

    return (
        <Flex justify='space-between' w='100%' pos='fixed' bottom={0} left={0} p={16} bg={'white'}>
            <ActionIcon variant="transparent" aria-label="Dashboard" size={48} component={Link} to="/dashboard" color={isActive('/dashboard') ? 'green' : 'gray'}>
                <FontAwesomeIcon icon={faHome} size="2xl" />
                <VisuallyHidden>Dashboard</VisuallyHidden>
            </ActionIcon>
            <ActionIcon variant="transparent" aria-label="Check Ins" size={48} component={Link} to="/checkIns" color={isActive('/checkIns') ? 'green' : 'gray'}>
                <FontAwesomeIcon icon={faHome} size="2xl" />
                <VisuallyHidden>Check Ins</VisuallyHidden>
            </ActionIcon>
            <ActionIcon variant="transparent" aria-label="Milestones" size={48} component={Link} to="/milestones" color={isActive('/milestones') ? 'green' : 'gray'}>
                <FontAwesomeIcon icon={faHome} size="2xl" />
                <VisuallyHidden>Milestones</VisuallyHidden>
            </ActionIcon>
            <ActionIcon variant="transparent" aria-label="Goals" size={48} component={Link} to="/goals" color={isActive('/goals') ? 'green' : 'gray'}>
                <FontAwesomeIcon icon={faHome} size="2xl" />
                <VisuallyHidden>Goals</VisuallyHidden>
            </ActionIcon>
            <ActionIcon variant="transparent" aria-label="Achievements" size={48} component={Link} to="/achievements" color={isActive('/achievements') ? 'green' : 'gray'}>
                <FontAwesomeIcon icon={faHome} size="2xl" />
                <VisuallyHidden>Achievements</VisuallyHidden>
            </ActionIcon>
        </Flex>
    )
}