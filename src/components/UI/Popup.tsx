interface PopupProps {
  annulProducts: () => void;
  content: Array<string> | Array<number>;
  closePopup: (e: any) => void;
}

const Popup: React.FC<PopupProps> = ({
  content,
  closePopup,
  annulProducts,
}) => {
  return (
    <div onClick={(e) => closePopup(e)} className="popup">
      <div className="popup_content">
        <span className="cancel_popup">X</span>
        <h4>Вы уверены что хотите аннулировать товары?</h4>
        <div className="popup_productsLine">
          {content.map((productName, index) => (
            <span key={index}>{productName}</span>
          ))}
        </div>
        <div className="popup_buttons">
          <button
            onClick={annulProducts}
            className={content.length > 0 ? "" : "unActive"}
          >
            Применить
          </button>
          <button className="cancel_popup">Отменить</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
