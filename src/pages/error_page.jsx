import {useNavigate, useRouteError} from "react-router-dom";
import style from "../styles/error.module.css";
import {useTitle} from "../utils/useTitle";
import {SERVICE_TITLE} from "../constants/serviceConst";

export default function ErrorPage() {
  useTitle(`${SERVICE_TITLE} - ERROR`);

  const navigate = useNavigate();
  const error = useRouteError();

  const handleGoBackButton = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <div className={style.error_page}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message || "Wrong access"}</i>
      </p>
      <button className={`${style.back_button}`} onClick={handleGoBackButton}>Go Back</button>
    </div>
  );
}