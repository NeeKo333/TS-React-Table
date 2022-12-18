import { useState, useEffect, useRef } from "react";
import "./App.css";
import SearchInput from "./components/UI/SearchInput";
import Table from "./components/UI/Table";
import Popup from "./components/UI/Popup";
import CircularProgress from "@mui/material/CircularProgress";
import { IProduct } from "./components/types/types";
function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([]);
  const [popupState, setPopupState] = useState(false);

  const mainCheckBox = useRef<HTMLInputElement>(null);

  async function getData() {
    const url1 = "https://api.jsonbin.io/v3/b/639744f62d0e0021081aff35";
    const url2 = "https://api.jsonbin.io/v3/b/639748812d0e0021081b01e4";

    return Promise.all<IProduct[]>([requestData(url1), requestData(url2)]).then(
      (data) => [...data[0], ...data[1]]
    );

    async function requestData(url: string) {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Master-Key":
            "$2b$10$Tz6GO99EGxvlLju25FojYeQIFgETK7Q9hXK.A6BqKQoZcEx69VcS.",
        },
      });
      const data = await response.json();
      return data.record;
    }
  }
  function sortByDate(array: IProduct[]) {
    array.sort((a, b) =>
      Date.parse(a.delivery_date) > Date.parse(b.delivery_date) ? -1 : 1
    );
    return array;
  }

  useEffect(() => {
    getData()
      .then((data) => {
        setProducts(sortByDate(data));
        setSearchedProducts(data);
      })
      .catch(() => alert("Data request Error"));
  }, []);

  function search(field: number | string, searchQuery: string) {
    if (searchQuery) {
      setSearchedProducts(
        products.filter((product) =>
          product[field as keyof IProduct]
            .toString()
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase())
        )
      );
    } else setSearchedProducts([...products]);
  }

  function setCheckOnProduct(
    e: React.MouseEvent<HTMLTableCellElement>,
    mainCheckBox: HTMLInputElement
  ) {
    const parent = (e.target as HTMLTableCellElement).closest(".product_row");
    const newArr = searchedProducts.map((el) => {
      if (el.id === +parent!.id) {
        if (el.status) {
          el.status = false;
          mainCheckBox.checked = false;
        } else {
          el.status = true;
        }
      }
      return el;
    });
    setSearchedProducts(newArr);
  }

  function setAllProductsAsCheked(e: MouseEvent) {
    if (!(e.target as HTMLInputElement).checked) {
      console.log(e.target);
      const newArr = products.map((product) => {
        product.status = false;
        return product;
      });
      setSearchedProducts(newArr);
    } else {
      const newArr = products.map((product) => {
        product.status = true;
        return product;
      });
      setSearchedProducts(newArr);
    }
  }

  function pushChekedProductsInPopup() {
    const names: Array<string> = [];
    const idArr: Array<number> = [];
    searchedProducts.forEach((product) => {
      if (product.status) {
        names.push(product.name);
        idArr.push(product.id);
      }
    });
    return [names, idArr];
  }
  function closePopup(e: MouseEvent) {
    if (
      (e.target as HTMLElement).className === "popup" ||
      (e.target as HTMLElement).className === "cancel_popup"
    )
      setPopupState(false);
  }

  function postIdToServer(array: Array<number> | Array<string>) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(array),
    }).then((request) => console.log(request));
  }

  function annulProducts() {
    const idArr = pushChekedProductsInPopup()[1];
    if (idArr.length > 0) postIdToServer(idArr);
    const newArr = searchedProducts.map((product) => {
      product.status = false;
      return product;
    });
    mainCheckBox.current!.checked = false;
    setSearchedProducts(newArr);
    setPopupState(false);
  }

  return (
    <div className="App">
      {products.length > 0 ? (
        <>
          <SearchInput search={search}></SearchInput>
          <Table
            mainCheckBox={mainCheckBox}
            setAllProductsAsCheked={setAllProductsAsCheked}
            setCheckOnProduct={setCheckOnProduct}
            array={searchedProducts}
          ></Table>
          {searchedProducts.length > 0 ? (
            <button className="annul" onClick={() => setPopupState(true)}>
              Анулировать
            </button>
          ) : (
            ""
          )}
          {popupState && (
            <Popup
              annulProducts={annulProducts}
              closePopup={closePopup}
              content={pushChekedProductsInPopup()[0]}
            ></Popup>
          )}
        </>
      ) : (
        <CircularProgress className="circularProgress"></CircularProgress>
      )}
    </div>
  );
}

export default App;
