import { IProduct } from "../types/types";

interface ProductTableRowProps {
  product: IProduct;
  setCheckOnProduct: (
    e: React.MouseEvent<HTMLTableCellElement>,
    mainCheckBox: HTMLInputElement
  ) => void;
  mainCheckBox: any;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  setCheckOnProduct,
  mainCheckBox,
  product,
}) => {
  {
    return (
      <tr className="product_row" id={product.id + ""}>
        <td
          onClick={(e) => {
            setCheckOnProduct(e, mainCheckBox.current);
          }}
        >
          <input
            type="checkbox"
            readOnly
            checked={product.status ? true : false}
          />
          {" " + product.name}
        </td>
        <td>{product.status ? "Доставлено" : "Не доставлено"}</td>
        <td>{product.sum}</td>
        <td>{product.qty}</td>
        <td>{product.currency}</td>
        <td>{product.volume}</td>
        <td>{product.delivery_date}</td>
        <td>
          {product.sum * product.qty} {product.currency}
        </td>
      </tr>
    );
  }
};

export default ProductTableRow;
