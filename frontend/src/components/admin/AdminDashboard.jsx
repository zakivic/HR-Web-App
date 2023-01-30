import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Drawer as MuiDrawer,
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BadgeIcon from "@mui/icons-material/Badge";
import DomainIcon from "@mui/icons-material/Domain";
import SchoolIcon from "@mui/icons-material/School";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

import { useState } from "react";

// import Copyright from "../Copyright";
import AdminDialog from "./AdminDialog";
import { useSelector, useDispatch } from "react-redux";

import { useDeleteDepartmentsMutation } from "../../features/departmentSlice";
import { useDeleteEmployeesMutation } from "../../features/employeesSlice";
import { useDeleteTrainingMutation } from "../../features/trainingSlice";
import { useDeletePerformanceMutation } from "../../features/performanceSlice";
import { useLazyGetDepartmentByIdQuery } from "../../features/departmentSlice";
import { useLazyGetEmployeeByIdQuery } from "../../features/employeesSlice";
import { useLazyGetTrainingByIdQuery } from "../../features/trainingSlice";
import { useLazyGetPerformanceByIdQuery } from "../../features/performanceSlice";
import { toggle, setId, setCaller } from "../../features/toggleDialogSlice";
import { resetSelected, selectSelected } from "../../features/selectItemsSlice";
import DataDisplay from "./dataDisplay/DataDisplay";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const DashboardContent = () => {
  const [open, setOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("Employees");
  const [selectedData, setSelectedData] = useState([]);
  const dispatch = useDispatch();
  const selected = useSelector(selectSelected);
  const [deleteDepartments] = useDeleteDepartmentsMutation();
  const [deleteEmployees] = useDeleteEmployeesMutation();
  const [deleteTraining] = useDeleteTrainingMutation();
  const [deletePerformance] = useDeletePerformanceMutation();
  const [getDepartmentById] = useLazyGetDepartmentByIdQuery();
  const [getEmployeeById] = useLazyGetEmployeeByIdQuery();
  const [getTrainingById] = useLazyGetTrainingByIdQuery();
  const [getPerformanceById] = useLazyGetPerformanceByIdQuery();

  const handleOpenDialog = (caller) => {
    if (caller === "edit") {
      fetchSelectedData();
      dispatch(setId(selected[0]));
    }
    dispatch(toggle());
    dispatch(setCaller(caller));
  };

  const fetchSelectedData = async () => {
    let response;
    switch (title) {
      case "Employees":
        response = await getEmployeeById(selected[0])
          .unwrap()
          .then((data) => {
            setSelectedData(data);
          });
        break;
      case "Department":
        response = await getDepartmentById(selected[0])
          .unwrap()
          .then((data) => {
            setSelectedData(data);
          });
        break;
      case "Training":
        response = await getTrainingById(selected[0])
          .unwrap()
          .then((data) => {
            setSelectedData(data);
          });
        break;
      case "Performance":
        response = await getPerformanceById(selected[0])
          .unwrap()
          .then((data) => {
            setSelectedData(data);
          });
        break;
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    try {
      let response;
      switch (title) {
        case "Employees":
          response = await deleteEmployees(selected).unwrap();
          break;
        case "Department":
          response = await deleteDepartments(selected).unwrap();
          break;
        case "Training":
          response = await deleteTraining(selected).unwrap();
        case "Performance":
          response = await deletePerformance(selected).unwrap();
          break;
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    dispatch(resetSelected());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h4"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Emre Insan Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton onClick={() => setTitle("Employees")}>
            <ListItemIcon>
              <BadgeIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItemButton>
          <ListItemButton onClick={() => setTitle("Users")}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
          <ListItemButton onClick={() => setTitle("Department")}>
            <ListItemIcon>
              <DomainIcon />
            </ListItemIcon>
            <ListItemText primary="Department" />
          </ListItemButton>
          <ListItemButton onClick={() => setTitle("Training")}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Training" />
          </ListItemButton>
          <ListItemButton onClick={() => setTitle("Performance")}>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="Performance" />
          </ListItemButton>
          <Divider sx={{ my: 1 }} />
          {/* open dialog for adding */}
          <ListItemButton onClick={() => handleOpenDialog("add")}>
            <ListItemIcon>
              <AddCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={"Add " + title} />
          </ListItemButton>
          {selected.length > 0 && (
            <>
              {selected.length === 1 && (
                <ListItemButton onClick={() => handleOpenDialog("edit")}>
                  <ListItemIcon>
                    <EditIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={"Edit " + title} />
                </ListItemButton>
              )}
              <ListItemButton onClick={() => handleDelete()}>
                <ListItemIcon>
                  <DeleteIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={"Delete " + title} />
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        <Toolbar />
        <Stack p={1}>
          {/* <Departments title={title} /> */}
          <DataDisplay title={title} />
        </Stack>

        <AdminDialog title={title} selectedData={selectedData} />
        {/* <Copyright
          sx={{
            pt: 4,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        /> */}
      </Box>
    </Box>
  );
};

export default DashboardContent;
