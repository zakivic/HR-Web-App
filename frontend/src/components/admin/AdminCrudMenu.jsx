import { ButtonBase, Container, Grid, Paper, Typography } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ListAltIcon from "@mui/icons-material/ListAlt";

const AdminCrudMenu = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        {/* 8 equal sized tiles */}

        <Grid item xs={6} sm={3}>
          <ButtonBase>
            <Paper
              sx={{
                p: 2,
                height: "200px",
                width: "200px",
                textAlign: "center",
              }}
              elevation={4}
            >
              <ListAltIcon style={{ fontSize: "100px" }} />
              <Typography variant="h5">List</Typography>
            </Paper>
          </ButtonBase>
        </Grid>
        <Grid item xs={6} sm={3}>
          <ButtonBase>
            <Paper
              sx={{
                p: 2,
                height: "200px",
                width: "200px",
                textAlign: "center",
              }}
              elevation={4}
            >
              <PersonAddAlt1Icon style={{ fontSize: "100px" }} />
              <Typography variant="h5">Add</Typography>
            </Paper>
          </ButtonBase>
        </Grid>
        <Grid item xs={6} sm={3}>
          <ButtonBase>
            <Paper
              sx={{
                p: 2,
                height: "200px",
                width: "200px",
                textAlign: "center",
              }}
              elevation={4}
            >
              <NoteAltIcon style={{ fontSize: "100px" }} />
              <Typography variant="h5">Edit</Typography>
            </Paper>
          </ButtonBase>
        </Grid>
        <Grid item xs={6} sm={3}>
          <ButtonBase>
            <Paper
              sx={{
                p: 2,
                height: "200px",
                width: "200px",
                textAlign: "center",
              }}
              elevation={4}
            >
              <PersonRemoveIcon style={{ fontSize: "100px" }} />
              <Typography variant="h5">Delete</Typography>
            </Paper>
          </ButtonBase>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminCrudMenu;
