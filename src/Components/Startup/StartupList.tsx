import { Grid } from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";
import { StartupItem } from "./StartupItem";

const useStyles = makeStyles(() => createStyles({
  container: {
    flexDirection: "column",
    gap: "1em"
  }
}))

export default function StartupList(): ReactElement {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await StartupHttpService.getStartups();
        setStartups(response);
      } catch (error) {
        console.log("Error in receiving data", error);
      } finally {
        setLoading(false);
      }

    })();
  }, []);

  if (loading) return <div>Loading...</div>

  return <Fragment>
    <Grid container id="startup-list" className={classes.container}>
        {startups && startups.map(startup => (
          <StartupItem key={startup.id} startup={startup}/>
        ))}
    </Grid>
  </Fragment>;
}
