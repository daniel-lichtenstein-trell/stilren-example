import Button from "../components/Button";

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
      props in <b>every</b> component without any extra overhead.
    </p>
  </>
);

export default IndexPage;
