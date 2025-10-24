import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCart, type CartItem } from "./context";
import { useSearch } from "./SearchContext";
import AccountPopover from "./AccountPopover";
import { useEffect, useState } from "react";

interface DrawerAppBarProps {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

const Navbar: React.FC<DrawerAppBarProps> = ({ window }) => {
  const { searchTerm, setSearchTerm } = useSearch();
  const { cart } = useCart();
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lexon nga localStorage vetëm një herë kur mount-et
  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) setLoggedInUser(name);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const getTotalQuantity = (cart: CartItem[]): number =>
    cart.reduce((total, item) => total + item.quantity, 0);

  // Drawer për mobile
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        E-commerce
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} component={Link} to="/cart">
            <Badge badgeContent={getTotalQuantity(cart)} color="secondary">
              <ShoppingCartIcon />
            </Badge>
            <ListItemText primary="Cart" sx={{ ml: 2 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left side */}
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

          {/* Middle - Search */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" }, justifyContent: "center" }}>
            <TextField
              size="small"
              placeholder="Search products..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1, width: "50%", minWidth: "250px" }}
            />
          </Box>

          {/* Right side */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 2 }}>
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

            {/* Cart icon */}
            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={getTotalQuantity(cart)} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* AccountPopover gjithmonë aty */}
            <AccountPopover
              loggedInUser={loggedInUser}
              onLogout={() => {
                setLoggedInUser(null);
                localStorage.removeItem("name");
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
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
