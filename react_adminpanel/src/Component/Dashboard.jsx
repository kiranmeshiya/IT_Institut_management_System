import '../App.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Collapse from '@mui/material/Collapse';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import { grey } from '@mui/material/colors';
import AddchartIcon from '@mui/icons-material/Addchart';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CreateIcon from '@mui/icons-material/Create';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { useNavigate,Link  } from 'react-router-dom';
import logo from './image/AdminLogo.webp';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PowerSettingsNewSharpIcon from '@mui/icons-material/PowerSettingsNewSharp';


const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
    background: '#343a40!important',
    color: 'white!important',
  }),
);


// ============ Scrollbar =================
const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    '& .MuiDrawerHeader-root': {
      '& .MuiIconButton-root': {
        visibility: 'visible', // Set visibility to 'visible' for IconButton
      },
    },
  },
  '& .MuiPaper-root': {
    '&::-webkit-scrollbar': {
      width: '6px',
      backgroundColor:    '#343a40',
    },
    '&::-webkit-scrollbar-thumb': {
      height: '10px!important',
      backgroundColor: 'rgb(133, 137, 140)',
      borderRadius: '3px',
    },
  },

}));


function Dashboard() {
       const navigate = useNavigate();

const [open, setOpen] = React.useState(false);
const [opensub1, setOpensub1] = React.useState(false);
const [opensub2, setOpensub2] = React.useState(false);
const [opensub3, setOpensub3] = React.useState(false);
const [anchorEl, setAnchorEl] = React.useState(false);
const [mobileMoreAnchorEl,setMobileMoreAnchorEl] = React.useState(null)

const open1 = Boolean(anchorEl);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};
const clearlocalStore = () => {
  setAnchorEl(null);
  localStorage.removeItem('token')
  window.location='/'
}
const handleDrawerOpen = () => {
  setOpen((isOpen) => !isOpen);
  setOpensub1(false);
  setOpensub2(false);
  setOpensub3(false);
};

const handleSubMenuClick1 = () => {
  setOpensub1((isOpen) => !isOpen);
};
const handleSubMenuClick2 = () => {
  setOpensub2((isOpen) => !isOpen);
};
const handleSubMenuClick3 = () => {
  setOpensub3((isOpen) => !isOpen);
};

const handleMouseEnter = () => {
  setOpen(true);
};

const handleProfileMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMobileMenuClose = () => {
  setMobileMoreAnchorEl(null);
};

const handleMenuClose = () => {
  setAnchorEl(null);
  handleMobileMenuClose();
};

const handleMobileMenuOpen = (event) => {
  setMobileMoreAnchorEl(event.currentTarget);
};

// ====================== log out ======================

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location = '/';
};



return (
 <>

  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white' , zIndex:'50'}}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 2,
            ...(open && { display: 'block' }),
          }}
        >
          <MenuIcon sx={{ color: 'black', marginLeft: open ? '0!important' : '60px!important'}} />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Typography variant="h6" noWrap component="div" sx={{ mx: 1, fontSize: 'medium' }}>
            <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>Home</Link>

          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{ mx: 1, fontSize: 'medium' }}>

            <Link to='/contact' style={{ color: 'black', textDecoration: 'none' }}>Contact</Link>
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 0, display:{ xs: 'justify-content-between'} }}>
      
         
          <Tooltip title="Logout">
            <IconButton
              onClick={handleLogout}
              size="small"
              sx={{ ml: 1 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
         <PowerSettingsNewSharpIcon />
            </IconButton>
          </Tooltip>
        </Box>
     
      </Toolbar>
    </AppBar>
           
    <CustomDrawer variant="permanent" onMouseEnter={handleMouseEnter} 
      open={open} sx={{
      // width: drawerWidth,
      zIndex:100,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      backgroundColor: '#343a40',
      color: '#ADB5BD!important',
      '& .MuiDrawer-paper': {
        backgroundColor: '#343a40',
        color: 'white',
      }
    }}>
     <DrawerHeader sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
<IconButton>
  <ListItemIcon sx={{ minWidth: 0, mr: open ? 1 : 'auto' }}>
    <img src={logo} alt='' height='40px' width='40px' style={{ marginRight: '10px' }} />
   {open && <Typography sx={{ fontSize: '20px', color: 'white' , alignItems: 'center', justifyContent: 'center', paddingTop:'5px!important'}}>AdminLTE</Typography>}
  </ListItemIcon>
</IconButton>
</DrawerHeader>
      <Divider sx={{ backgroundColor: 'rgb(75,84,92)' }} />
      {/* ========= item 1st ============== */}
      <List>
        <ListItem disablePadding sx={{ display: 'block' }} >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={handleSubMenuClick1}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 1 : 'auto',
                justifyContent: 'center',
              }}
            >
              <InboxIcon sx={{ color: 'white!important' }} />
            </ListItemIcon>
            <ListItemText sx={{ opacity: open ? 1 : 0 }} >Course</ListItemText>
            {open && (opensub1 ? <ExpandMoreIcon/> : <NavigateBeforeIcon/>)}
          </ListItemButton>
         {open && <Collapse in={opensub1} timeout="on" unmountOnExit>
            <List component="div" disablePadding >
              {/* Add your sub-menu items here */}
              <ListItem disablePadding onClick={() => navigate('/addcourse')}>
                {/* <ListItemButton > */}
                <ListItemButton sx={{ pl: 6}}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <InboxIcon sx={{ color: 'white!important' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }} >Add Course</ListItemText>
                </ListItemButton>
              </ListItem>
        
              <ListItem disablePadding onClick={() => navigate('/viewcourse')}>
                <ListItemButton sx={{ pl: 6}}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <InboxIcon sx={{ color: 'white!important' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }} >View Course</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse> }
        </ListItem>

      </List>
      {/* ========= item 2nd ============== */}
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={handleSubMenuClick2}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 1 : 'auto',
                justifyContent: 'center',
              }}
            >
              <AddchartIcon
                sx={{ color: 'white!important' }} />
            </ListItemIcon>
            <ListItemText sx={{ opacity: open ? 1 : 0 }} >Content</ListItemText>
            {open && (opensub2 ? <ExpandMoreIcon/> : <NavigateBeforeIcon/>)}
          </ListItemButton>
          {open &&  <Collapse in={opensub2} timeout="on" unmountOnExit>
            <List component="div" disablePadding>
              {/* Add your sub-menu items here */}
              <ListItem disablePadding onClick={() => navigate('/addcontent')}>
                <ListItemButton sx={{ pl: 6}}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <InboxIcon sx={{ color: 'white!important' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }} >Add Content</ListItemText>
                </ListItemButton>
              </ListItem>
           
              <ListItem disablePadding onClick={() => navigate('/viewcontent')}>
                <ListItemButton sx={{ pl: 6}}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <TrendingUpIcon sx={{ color: 'white!important' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }} >View Content</ListItemText>
                </ListItemButton>
              </ListItem>
           
            </List>
          </Collapse> }
        </ListItem>

      </List>
      {/* ========= item 3rd ============== */}
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={handleSubMenuClick3}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 1 : 'auto',
                justifyContent: 'center',
              }}
            >
              <MailIcon sx={{ color: 'white!important' }} />
            </ListItemIcon>
            <ListItemText sx={{ opacity: open ? 1 : 0 }} >Admission</ListItemText>
            {open && (opensub3 ? <ExpandMoreIcon /> : <NavigateBeforeIcon />)}
          </ListItemButton>
          {open &&   <Collapse in={opensub3} timeout="on" unmountOnExit>
            <List component="div" disablePadding>
              {/* Add your sub-menu items here */}
              <ListItem disablePadding onClick={() => navigate('/newadmission')}>
                {/* <ListItemButton > */}
                <ListItemButton sx={{ pl: 6}}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <BarChartIcon sx={{ color: 'white!important' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }} >New Admission</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => navigate('/viewadmission')}>
                {/* <ListItemButton > */}
                <ListItemButton sx={{ pl: 6}}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <InboxIcon sx={{ color: 'white!important' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }} >View Admission</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => navigate('/viewstudent')}>
                <ListItemButton sx={{ pl: 6}}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <CreateIcon sx={{ color: 'white!important' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }} >View Single Student</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 6}}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <MarkEmailReadIcon sx={{ color: 'white!important' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0 }} >Read</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>}
        </ListItem>

      </List>
      {/* ========= item 4th ============== */}
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 1 : 'auto',
                justifyContent: 'center',
              }}
            >
              <InboxIcon sx={{ color: 'white!important' }} />
            </ListItemIcon>
            <ListItemText sx={{ opacity: open ? 1 : 0 }} >Calendar</ListItemText>

          </ListItemButton>

        </ListItem>

      </List>
      {/* ========= item 5th ============== */}
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
                 >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 1 : 'auto',
                justifyContent: 'center',
              }}
            >
              <InboxIcon sx={{ color: 'white!important' }} />
            </ListItemIcon>
            <ListItemText sx={{ opacity: open ? 1 : 0 }} >Gallery</ListItemText>

          </ListItemButton>

        </ListItem>

      </List>
      {/* <Divider sx={{backgroundColor:'rgb(75,84,92)'}} /> */}

    </CustomDrawer>
    <Box component="main" sx={{ flexGrow: 1, py: 1, px:6 }}>
    <DrawerHeader />
    {/* <Addcourse Open={open} /> */}
   
    </Box>
  </Box>
 </>
);
    
}

export default Dashboard
