import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  TextField,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCart, type CartItem } from "./context";
import { useSearch } from "./SearchContext";
import AccountPopover from "./AccountPopover";

const drawerWidth = 240;
const navItems = ["Home", "About", ];

interface DrawerAppBarProps {
  window?: () => Window;
}

const Navbar: React.FC<DrawerAppBarProps> = ({ window }) => {
  const { searchTerm, setSearchTerm } = useSearch();
  const { cart } = useCart();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const getTotalQuantity = (cart: CartItem[]) =>
    cart.reduce((total, item) => total + item.quantity, 0);

const drawer = (
  <Box
    onClick={handleDrawerToggle}
    sx={{
      height: "100%",
      backgroundColor: "#0d47a1", // blu e errët për të përputhur AppBar
      color: "white",
      textAlign: "center",
    }}
  >
    <Typography variant="h6" sx={{ my: 2, fontWeight: "bold" }}>
      E-commerce
    </Typography>
    <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />
    <List>
      {navItems.map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemButton
            sx={{
              textAlign: "center",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
            component={Link}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
          >
            <ListItemText primary={item} primaryTypographyProps={{ color: "white" }} />
          </ListItemButton>
        </ListItem>
      ))}
      <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 1 }} />
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            textAlign: "center",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
          component={Link}
          to="/cart"
        >
          
          <Badge
            badgeContent={getTotalQuantity(cart)}
            color="secondary"
            sx={{ "& .MuiBadge-badge": { color: "white", backgroundColor: "#f50057" } }}
          >
            
          </Badge>
          <ListItemText
            primary="Cart"
            sx={{ ml: 1 }}
            primaryTypographyProps={{ color: "white" }}
          />
          
        </ListItemButton>
      </ListItem>
            <ListItem disablePadding>
        <ListItemButton
          sx={{
            textAlign: "center",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
          component={Link}
          to="/login"
        >
          
          
            
         
          <ListItemText
            primary="Login"
            sx={{ ml: 1 }}
            primaryTypographyProps={{ color: "white" }}
          />
          
        </ListItemButton>
      </ListItem>
    </List>
  </Box>
);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              E-commerce
            </Typography>
          </Box>

          <Box
  sx={{
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  }}
>
  <TextField
    size="small"
    placeholder="Search products..."
    variant="outlined"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    sx={{
      backgroundColor: "white",
      borderRadius: 1,
      width: { xs: "80%", sm: "50%" }, 
      minWidth: { xs: "150px", sm: "250px" },
    }}
  />
</Box>


          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                component={Link}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              >
                {item}
              </Button>
            ))}

            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={getTotalQuantity(cart)} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <AccountPopover />
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Navbar;
