import {
  SearchBar,
  Logo,
  Button,
  ButtonType,
  Divider,
  SearchResultList,
  TextSlider,
} from "components";
import { useTopics } from "hooks";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../error-boundary";

export const Header = () => {
  const { data, isLoading } = useTopics({ limit: 30 });
  const [activeTab, setActiveTab] = useState("home");
  let navigate = useNavigate();

  return (
    <>
      <header className="h-24 w-full pt-5 flex justify-center gap-2  bg-white sticky top-0 z-20">
        <Logo />
        <div className="w-1/2 min-w-20 ">
          <ErrorBoundary>
            <SearchBar topics={data} />
          </ErrorBoundary>
        </div>
      </header>
      <div className="h-14 flex w-full px-10 sticky bg-white top-24 gap-3 z-10">
        <Button
          id="home"
          variant={ButtonType.LINK}
          active={activeTab === "Home"}
          onClick={() => {
            navigate("/");
            setActiveTab("Home");
          }}
        >
          Home
        </Button>
        <Divider className="w-px h-8 self-center bg-gray-400" />
        {isLoading && (
          <div className="rounded-full bg-slate-400 h-1/2 w-full self-center animate-pulse"></div>
        )}
        {data && (
          <ErrorBoundary>
            <TextSlider>
              {data.map((topic: SearchResultList) => {
                return (
                  <Button
                    className={"snap-start"}
                    active={activeTab === topic.id}
                    key={topic.id}
                    variant={ButtonType.LINK}
                    onClick={() => {
                      navigate(`topics/${topic.slug}`);
                      setActiveTab(topic.id);
                    }}
                  >
                    {topic.title}
                  </Button>
                );
              })}
            </TextSlider>
          </ErrorBoundary>
        )}
      </div>
      <Outlet />
    </>
  );
};
