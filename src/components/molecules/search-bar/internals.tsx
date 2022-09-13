import { FC, useEffect, useState } from "react";
import { Button, ButtonType } from "components";
import { useCollections } from "hooks";
import { SearchResultList } from "./types";
import { CrossIcon, SearchIcon } from "assets/svgs";
import { SearchSection, SearchType } from "./search-section";
import { useNavigate } from "react-router-dom";

export const SearchBar: FC<{ topics: SearchResultList[] }> = ({ topics }) => {
  const [searchText, setSearchtText] = useState("");
  const [searchItems, setSearchItems] = useState<Set<string>>(new Set([]));
  const { data: collections } = useCollections({ limit: 5 });
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("searchItems") as string);
    if (items) {
      setSearchItems(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(searchItems));
  }, [searchItems]);

  const saveSearchText = () => {
    setSearchItems((prevState: Set<string>) =>
      new Set([...prevState]).add(searchText)
    );
    navigate(`/photos/${searchText}`);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      saveSearchText();
    }
  };

  return (
    <div className="group flex flex-col w-full ml-3">
      <div className="peer px-5 py-3  flex flex-row bg-gray-100 group-focus-within:bg-white group-focus-within:border hover:border rounded-full ">
        <button onClick={saveSearchText}>
          <SearchIcon />
        </button>
        <input
          className="ml-3 w-full outline-none border-none bg-inherit rounded-full"
          type="text"
          placeholder="Search high resolution photos"
          value={searchText}
          onChange={(e) => setSearchtText(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
        <Button variant={ButtonType.LINK} onClick={() => setSearchtText("")}>
          <CrossIcon />
        </Button>
      </div>
      <div className="hidden group-focus-within:flex focus-within:flex flex-col p-4 border-slate-200 border rounded-md mt-1 z-10 bg-white">
        {searchText.length === 0 || searchItems.size === 0 ? (
          <>
            <section className="mt-2">
              <SearchSection
                title={"Trending Topics"}
                data={topics}
                type={SearchType.TOPICS}
              />
            </section>
            <section className="mt-2">
              <SearchSection
                title={"Trending Collections"}
                data={collections}
                type={SearchType.COLLECTIONS}
              />
            </section>
          </>
        ) : (
          <>
            <div className="flex gap-2 items-center">
              <h5>Recent Searches</h5>
              <Button
                variant={ButtonType.LINK}
                onClick={() => setSearchItems(new Set([]))}
              >
                Clear
              </Button>
            </div>
            <div className="flex mt-2 gap-2 flex-wrap ">
              {[...searchItems].map((text: string) => (
                <Button
                  key={text}
                  variant={ButtonType.TERTIARY}
                  onClick={() => navigate(`/photos/${text}`)}
                >
                  {text}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
