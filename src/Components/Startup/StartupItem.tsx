import { Box, Grid, Stack } from "@mui/material";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { Startup } from "../../Types/Startup";

interface StartupItemProps {
  startup: Startup;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  item: {
    backgroundColor: theme.palette.background.paper,
    padding: "1em",
    borderRadius: "0.5em",
    boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.5)",
  },
  sub: {
    position: "relative",
    gap: "1em",
  },
  subItem: {
    fontSize: "0.75em",
    position: "relative",
    "&:not(:last-child)::after": {
      content: "\"\\007C\"",
      position: "absolute",
      right: "-0.5em",
      top: 0,
      transform: "translateX(100%)",
    },
  }
}))

export const StartupItem = ({startup}: StartupItemProps) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.item}>
      <Box sx={{ mb: "1em" }}>
        <Typography variant="h4">{startup.name}</Typography>
        <Stack direction="row" className={classes.sub}>
          <Box component="span" className={classes.subItem}>
            Founded: {startup.dateFounded.getFullYear()}
          </Box>
          <Box component="span" className={classes.subItem}>
            {startup.employees} Employees
          </Box>
          <Box component="span" className={classes.subItem}>
            $ {startup.totalFunding} Mio.
          </Box>
          <Box component="span" className={classes.subItem}>
            {startup.currentInvestmentStage}
          </Box>
        </Stack>
      </Box>
      <Typography variant="body2">{startup.shortDescription}</Typography>
    </Grid>
  );
};
