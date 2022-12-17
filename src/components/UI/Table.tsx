import { IProduct } from "../types/types";
import ProductTableRow from "./ProductTableRow";
import { MutableRefObject } from "react";

interface TableProps {
  array: IProduct[];
  setCheckOnProduct: (
    e: React.MouseEvent<HTMLTableCellElement>,
    mainCheckBox: HTMLInputElement
  ) => void;
  setAllProductsAsCheked: (e: any) => void;
  mainCheckBox: MutableRefObject<HTMLInputElement | null>;
}

const Table: React.FC<TableProps> = ({
  array,
  setCheckOnProduct,
  setAllProductsAsCheked,
  mainCheckBox,
}) => {
  const allVolume =
    array.length > 0
      ? array.reduce((accVolume, product) => (accVolume += product.volume), 0)
      : 0;
  const allQty =
    array.length > 0
      ? array.reduce((accQty, product) => (accQty += product.qty), 0)
      : 0;

  return array.length > 0 ? (
    <table className="main_table">
      <thead>
        <tr>
          <th>
            <input
              ref={mainCheckBox}
              className="allChecked"
              onClick={(e) => setAllProductsAsCheked(e)}
              type="checkbox"
            />{" "}
            Название
          </th>
          <th>Статус</th>
          <th>Сумма</th>
          <th>Количество</th>
          <th>Валюта</th>
          <th>Объем</th>
          <th>Дата доставки</th>
          <th>Всего</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <p>Общее количество: {allQty}</p>
          </td>
          <td></td>
          <td>
            <p>Общий объем: {allVolume}</p>
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
      <tbody>
        {array.map((product) => (
          <ProductTableRow
            product={product}
            mainCheckBox={mainCheckBox}
            setCheckOnProduct={setCheckOnProduct}
          ></ProductTableRow>
        ))}
      </tbody>
    </table>
  ) : (
    <h2>Не найдено...</h2>
  );
};

export default Table;
