import * as React from "react";
import { Popover, Button, Typography, Box } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

interface AccountPopoverProps {
  loggedInUser: string | null;
  onLogout: () => void;
}

const AccountPopover: React.FC<AccountPopoverProps> = ({ loggedInUser, onLogout }) => {
  // anchorEl duhet të jetë SVGSVGElement për AccountCircleIcon
  const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      {/* Ikona është gjithmonë aty */}
      <AccountCircleIcon 
        onClick={handleClick} 
        sx={{ cursor: "pointer", fontSize: 32 }} 
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={{ p: 2, minWidth: 200, display: "flex", flexDirection: "column", gap: 1 }}>
          {loggedInUser ? (
            <>
              <Typography variant="body2">Welcome, {loggedInUser}!</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={() => {
                  onLogout(); 
                  handleClose();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body2">Welcome to E-Commerce</Typography>
              <Typography variant="body2">Please Login or Register</Typography>
              <Button 
                component={Link} 
                to="/login" 
                variant="contained" 
                color="primary" 
                fullWidth
              >
                Login
              </Button>
              <Button 
                component={Link} 
                to="/register" 
                variant="outlined" 
                color="primary" 
                fullWidth
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default AccountPopover;
