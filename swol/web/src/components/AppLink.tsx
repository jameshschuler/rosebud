import { SWOL_GREEN } from "@/theme";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "@mantine/core";
import { Link, useLocation } from "@tanstack/react-router";
import { useMemo } from "react";

interface AppLinkProps {
    to: string;
    label: string;
    icon: IconDefinition
}

export function AppLink({ to, label, icon }: AppLinkProps) {
    const location = useLocation();
    const isActive = useMemo(() => location.pathname === to, [to, location.pathname]);

    return (
        <NavLink
            label={label}
            component={Link}
            to={to}
            leftSection={
                <FontAwesomeIcon icon={icon} size={isActive ? 'xl' : undefined} color={isActive ? SWOL_GREEN : 'gray'} />
            }
            bg='none'
            styles={{
                label: {
                    fontSize: isActive ? 20 : 16,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? SWOL_GREEN : 'gray',
                }
            }}
        />
    )
}