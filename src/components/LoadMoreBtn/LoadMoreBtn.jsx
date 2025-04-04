import s from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ loadMore }) => {
  return (
    <button onClick={loadMore} className={s.button} type="button">
      Load more
    </button>
  );
};
export default LoadMoreBtn;
