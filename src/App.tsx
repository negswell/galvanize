import { Header, PageUnderConstruction } from "components";
import { Home, Topic, Collection, QueryPhotos } from "pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />

          <Route path="photos/:slug" element={<QueryPhotos />} />
          <Route path="topics/:slug" element={<Topic />} />
          <Route path="collection/:slug" element={<Collection />} />
          <Route path="photos" element={<PageUnderConstruction />}></Route>
          <Route path="collections" element={<PageUnderConstruction />}></Route>
          <Route path="topics" element={<PageUnderConstruction />}></Route>
          <Route
            path="*"
            element={
              <main
                className="w-full flex items-center justify-center"
                style={{ height: "50vh" }}
              >
                <p>Page Not Found.</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
