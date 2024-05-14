import { hideDetails, showDetails } from "../components/Main";

addEventListener("popstate", (e: PopStateEvent) => {
  if (!e.state.id) {
    hideDetails("pop");
  } else {
    showDetails(e.state.id, "pop");
  }
});
