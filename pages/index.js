import Link from "next/link";
import MyVisComponent from "../components/d3-root";

export default function IndexPage() {
  return (
    <div>
      Hello World. {/* <Link href="/about">
        <a>About</a>
      </Link> */}
      <MyVisComponent />
    </div>
  );
}
