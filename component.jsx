import React, { useState } from 'react';
import { Box, Button, Container, ListItem, Paper } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '../icons/SearchIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SortIcon from '../icons/SortIcon';
import FilterIcon from '../icons/FilterIcon';
import BlackGraterIcon from '../icons/BlackGraterIcon'
import BlackDownIcon from '../icons/BlackDownIcon'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
// import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import BlackCheckboxIcon from '../icons/BlackCheckboxIcon'
import BlackCheckedboxIcon from '../icons/BlackCheckedboxIcon'


const navItems = [
    { name: "Personalized", url: `` },
    { name: "Following", url: `/feed/following` },
    { name: "Trends", url: `/feed/trends` },
]

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


function FeedMain(props) {
    const [anchor, setAnchor] = React.useState({
        anchorEl: null,
        filteredEl: null,
        selectedItem: 'Sort by',
        filteredItem: 'Filter',
        openClosure: <BlackGraterIcon />
    })
    const memoizedAnchor = React.useMemo(() => anchor, [anchor.anchorEl, anchor.filteredEl, anchor.selectedItem, anchor.filteredItem, anchor.openClosure]);

    const handleSort = (option, event) => {
        setAnchor((prev) => ({
            ...prev,
            [option]: prev[option]
        }))
    };

    const handleFilter = (option, icon) => {
        anchor.filteredEl(null);
        setAnchor((prev, icon) => ({
            ...prev,
            [option]: prev[option],
            [icon]: prev[icon],
        }))

    }

    // Filter => Languages
    const [open, setOpen] = useState({
        languages: false,
        license: false,
        topics: false,
        writers: false,
        ratings: false,
    });
    const handleClickOpen = (item) => {
        setOpen((prevOpened) => ({
            ...prevOpened,
            [item]: !prevOpened[item]
        }));
    };

    // filter => Languages => Checkbox
    const [checked, setChecked] = useState({
        english: false,
        azerbaijani: false,
    });
    const handleCheck = (language) => {
        setChecked((prevCheckedStates) => ({
            ...prevCheckedStates,
            [language]: !prevCheckedStates[language], // Toggle checked state
        }));
    };


    return (
        <React.Fragment>
            <Container sx={{ maxWidth: { sm: '1264px' }, padding: { sm: "0" }, mt: "37px" }}>
                <Paper sx={{ border: "none", boxShadow: "none", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Box sx={{ fontSize: "18px", display: "flex", flexDirection: "row", gap: "48px" }}>
                        {navItems.map((item) => (
                            <NavLink style={{ color: "#363E47" }} to={item.url}>{item.name}</NavLink>
                        ))}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: "16px", justifyContent: "space-between" }}>
                        <Button
                            aria-controls="sort-menu"
                            aria-haspopup="true"
                            onClick={(event) => setAnchor(event.currentTarget)}
                            sx={{
                                color: "#9C89FF",
                                fontSize: "18px",
                                border: "1px solid #DEDFE1",
                                padding: "8px 16px",
                                cursor: "pointer",
                                textTransform: "none",
                                gap: "8px"
                            }}
                        >
                            <SortIcon />
                            {anchor.selectedItem}
                        </Button>
                        <Menu
                            id="sort-menu"
                            anchorEl={anchor.anchorEl}
                            keepMounted
                            open={Boolean(anchor.anchorEl)}
                            onClose={() => setAnchor(null)}
                        >
                            <MenuItem
                                onClick={() => handleSort('Recommended')} >
                                <ListItemText primary="Recommended" />

                            </MenuItem>
                            <MenuItem
                                onClick={() => handleSort('Newest')}>
                                <ListItemText primary="Newest" />
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleSort('Most viewed')}>
                                <ListItemText primary="Most viewed" />
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleSort('Most liked')}>
                                <ListItemText primary="Most liked" />
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleSort('Highest rated')}>
                                <ListItemText primary="Highest rated" />
                            </MenuItem>

                        </Menu>

                        <Button
                            aria-controls="filter-menu"
                            aria-haspopup="true"
                            onClick={(event) => setFilteredEl(event.currentTarget)}
                            sx={{
                                color: "#9C89FF",
                                fontSize: "18px",
                                border: "1px solid #DEDFE1",
                                padding: "8px 16px",
                                cursor: "pointer",
                                textTransform: "none",
                                gap: "8px"
                            }}
                        >
                            <FilterIcon />
                            {anchor.filteredItem}
                        </Button>

                        <Menu
                            id="filter-menu"
                            anchorEl={anchor.filteredEl}
                            keepMounted
                            open={Boolean(anchor.filteredEl)}
                            onClose={() => setAnchor(null)}
                        >

                            <MenuItem onClick={handleClickOpen('languages')} sx={{ width: "232px" }}>
                                <ListItemText primary="Languages" />
                                {open.languages ? <BlackDownIcon /> : <BlackGraterIcon />}
                            </MenuItem>
                            <Collapse in={open.languages} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton disableRipple sx={{ ':hover': { backgroundColor: "transparent" }, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "16px" }}>
                                        <Search sx={{ border: "1px solid #DEDFE1", display: { xs: 'none', sm: 'block' }, m: 0 }}>
                                            <SearchIconWrapper >
                                                <SearchIcon style={{ width: "16px", height: "16px" }} />
                                            </SearchIconWrapper>
                                            <StyledInputBase
                                                placeholder="Search for articles"
                                                inputProps={{ 'aria-label': 'search' }}
                                                sx={{ padding: "5px 12px", fontSize: "14px", fontFamily: "'Poppins', sans-serif", width: "200px", ml: 0 }}
                                            />
                                        </Search>
                                        <FormGroup sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                            <FormControlLabel
                                                onClick={() => handleCheck('english')}
                                                control={checked.english ? <BlackCheckedboxIcon /> : <BlackCheckboxIcon />}
                                                label="English"
                                                sx={{ m: 0, display: "flex", flexDirection: "row", gap: "8px" }} />
                                            <FormControlLabel
                                                onClick={() => handleCheck('azerbaijani')}
                                                control={checked.azerbaijani ? <BlackCheckedboxIcon /> : <BlackCheckboxIcon />}
                                                label="Azerbaijani"
                                                sx={{ m: 0, display: "flex", flexDirection: "row", gap: "8px" }} />
                                        </FormGroup>
                                    </ListItemButton>
                                </List>
                            </Collapse>


                            <MenuItem
                                onClick={() => handleFilter('License')}>
                                <ListItemText primary="License" />
                                <ListItemIcon>{anchor.openClosure}</ListItemIcon>
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleFilter('Topics')}>
                                <ListItemText primary="Topics" />
                                <ListItemIcon>{anchor.openClosure}</ListItemIcon>
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleFilter('Writers')}>
                                <ListItemText primary="Writers" />
                                <ListItemIcon>{anchor.openClosure}</ListItemIcon>
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleFilter('Ratingsd')}>
                                <ListItemText primary="Ratings" />
                                <ListItemIcon>{anchor.openClosure}</ListItemIcon>
                            </MenuItem>

                        </Menu>
                    </Box>
                </Paper>
                <Outlet />
            </Container>
        </React.Fragment>
    );
}

export default FeedMain;



{/* <ListItemButton onClick={handleClick}>
<ListItemIcon>
    <InboxIcon />
</ListItemIcon>
<ListItemText primary="Inbox" />
{open ? <BlackDownIcon /> : <BlackGraterIcon />}
</ListItemButton>
<Collapse in={open} timeout="auto" unmountOnExit>
<List component="div" disablePadding>
    <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
            <StarBorder />
        </ListItemIcon>
        <ListItemText primary="Starred" />
    </ListItemButton>
</List>
</Collapse> */}

{/* <MenuItem sx={{ width: "232px", ":hover": { background: "transparent" } }}>
<ListItem sx={{ padding: 0 }}>
    <Search sx={{ border: "1px solid #DEDFE1", display: { xs: 'none', sm: 'block' } }}>
        <SearchIconWrapper >
            <SearchIcon style={{ width: "16px", height: "16px" }} />
        </SearchIconWrapper>
        <StyledInputBase
            placeholder="Search for articles"
            inputProps={{ 'aria-label': 'search' }}
            sx={{ padding: "5px 12px", fontSize: "14px", fontFamily: "'Poppins', sans-serif", width: "200px" }}
        />
    </Search>
</ListItem>
</MenuItem> */}