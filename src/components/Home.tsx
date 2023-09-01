import React, {useRef} from "react";
import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import DogList from "./DogList";
import Footer from "./Footer";

const Home = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Navbar />
      <SearchForm targetRef={targetRef} />
      <DogList />
      <Footer targetRef={targetRef} />
    </>
  );
};

export default Home;
