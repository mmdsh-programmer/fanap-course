import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import TopBar from "components/TopBar";
import AddArticle from "pages/AddArticle";
import Articles from "pages/Articles";
import withPrivacy from "helpers/withPrivacy"
import NotFound from "components/NotFound/NotFound"
import ShowPost from "pages/ShowPost/ShowPost"
import PostContextProvider from "helpers/PostProvider"
export default function Main() {
  return (
    <>
      <TopBar />
      <Container maxWidth="md">
        <PostContextProvider>
          <Switch>
            <Route exact path={["/", "/articles"]} component={Articles} />
            <Route exact path="/new" component={withPrivacy(AddArticle)} />
            <Route exact path="/post" component={ShowPost} />
            <Route component={() => <NotFound />} />
          </Switch>
        </PostContextProvider>
      </Container>
    </>
  );
}
