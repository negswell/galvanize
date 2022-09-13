import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components";
import { SearchSectionProps, SearchType } from "./types";

export const SearchSection: FC<SearchSectionProps> = ({
  title,
  data,
  type,
}) => {
  const navigate = useNavigate();

  const handleClick = (slug: string) => {
    if (type === SearchType.TOPICS) {
      navigate(`topics/${slug}`);
    } else {
      navigate(`collection/${slug}`);
    }
  };

  return (
    <>
      <h5>{title}</h5>
      <div className="mt-2 flex gap-2 flex-wrap">
        {data &&
          data.slice(0, 5).map((item) => {
            return (
              <Button
                key={item.id}
                image={
                  <img
                    width="30px"
                    className="h-full rounded-l-md object-cover"
                    src={item["cover_photo"]["urls"]["small"]}
                    alt="hi"
                  />
                }
                onClick={() =>
                  handleClick(type === SearchType.TOPICS ? item.slug : item.id)
                }
              >
                {item.title}
              </Button>
            );
          })}
      </div>
    </>
  );
};
