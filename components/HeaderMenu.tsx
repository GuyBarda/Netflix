import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const HeaderMenu = ({ links }: { links: string[] }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="md:!hidden">
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="!capitalize !text-white"
            >
                Browse
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className="menu"
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {links.map((link) => (
                    <MenuItem onClick={handleClose} key={link}>
                        {link}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default HeaderMenu;
