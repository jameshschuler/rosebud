import { AppBar } from "@/components/AppBar"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useIsTablet } from "@/hooks/useIsTablet"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ActionIcon, Box, Flex, NavLink, Stack, VisuallyHidden } from "@mantine/core"
import { createFileRoute, Link, Outlet, redirect, useLocation } from "@tanstack/react-router"

export const Route = createFileRoute('/_auth')({
    beforeLoad: ({ context }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: AuthLayout,
})

function AuthLayout() {
    const isMobile = useIsMobile()
    const isTablet = useIsTablet()

    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <Box mih={'100vh'}>
            <AppBar />
            <Flex mb={100} flex={1}>
                <Stack component={'nav'} w="25%" gap={16} px={24} display={isMobile || isTablet ? 'none' : 'flex'}>
                    <NavLink
                        label="Dashboard"
                        component={Link}
                        to="/dashboard"
                        leftSection={<FontAwesomeIcon icon={faHome} color={isActive('/dashboard') ? 'green' : 'gray'} />}
                        color={isActive('/dashboard') ? 'green' : 'gray'}
                    />
                    <NavLink
                        label="Check Ins"
                        component={Link}
                        to="/checkIns"
                        leftSection={<FontAwesomeIcon icon={faHome} color={isActive('/checkIns') ? 'green' : 'gray'} />}
                        color={isActive('/checkIns') ? 'green' : 'gray'}
                    />
                    <NavLink
                        label="Milestones"
                        component={Link}
                        to="/milestones"
                        leftSection={<FontAwesomeIcon icon={faHome} />}
                    />
                    <NavLink
                        label="Goals"
                        component={Link}
                        to="/goals"
                        leftSection={<FontAwesomeIcon icon={faHome} />}
                    />
                    <NavLink
                        label="Achievements"
                        component={Link}
                        to="/achievements"
                        leftSection={<FontAwesomeIcon icon={faHome} />}
                    />
                </Stack>
                <Box w={isMobile ? '100%' : '75%'} px={24}>
                    <Outlet />
                </Box>
            </Flex>
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
        </Box>
    )
}