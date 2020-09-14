import { Button as MUIButton } from "@material-ui/core";
import Button from "../components/Button";

const rainbowAnimation = {
  "0%": {
    color: "red",
  },
  "20%": {
    color: "yellow",
  },
  "40%": {
    color: "green",
  },
  "60%": {
    color: "blue",
  },
  "80%": {
    color: "purple",
  },
  "100%": {
    color: "red",
  },
};

const IndexPage = () => (
  <>
    <h1>Hello Next.js 👋</h1>
    <p>
      This is a paragraf with a{" "}
      <Button $padding="1em" $borderRadius="4px">
        button
      </Button>
    </p>
    <p>
      The core premise of stilren is adding "all" css properties as first level
      props in{" "}
      <b
        $textTransform="uppercase"
        $animationDuration="5s"
        $animationIterationCount="infinite"
        $animationName={rainbowAnimation}
      >
        every
      </b>{" "}
      component without any extra overhead. Just use the <i>$</i> character as a
      prefix before any standard css property.
    </p>
    <p>
      One of the cool things about stilren is that it works with zero effort for
      a ton of third party library components as well.
    </p>
    <div $display="flex">
      <MUIButton $color="red" $flex="1">
        Material UI button
      </MUIButton>
      <MUIButton $color="blue" $flex="2">
        Material UI button
      </MUIButton>
    </div>
  </>
);

export default IndexPage;
