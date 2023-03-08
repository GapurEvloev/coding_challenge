import { Grid, Pagination } from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";
import { StartupItem } from "./StartupItem";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flexDirection: "column",
      gap: "1em",
    },
  })
);

export default function StartupList(): ReactElement {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const startupsPerPage = 20;

  const pageCount = startups.length / startupsPerPage;

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

  if (loading) return <div>Loading...</div>;

  return (
    <Fragment>
      <Pagination
        onChange={(_, page) => {
          setCurrentPage(page);
        }}
        count={startups && pageCount}
        sx={{ mb: "1em" }}
      />
      <Grid container id="startup-list" className={classes.container}>
        {startups &&
          startups
            .slice(
              (currentPage - 1) * startupsPerPage,
              currentPage * startupsPerPage
            )
            .map((startup) => (
              <StartupItem key={startup.id} startup={startup} />
            ))}
      </Grid>
    </Fragment>
  );
}
