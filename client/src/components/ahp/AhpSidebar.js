import { useHistory } from "react-router-dom"

import {
  resetHandler,
  randomGenerationHandler,
  normalizationHandler,
  criteriaSumCalculationHandler,

} from './../../pages/AhpQCriteriaComparisonPage'

import style from './AhpSidebar.module.scss'

export const AhpSidebar = () => {

  const history = useHistory()

  // Функция перевыбора критериев и альтернатив
  const reselectionHandler = async () => {
    history.push('/ahp/query/selection')
  }

  return(
    <div className={style.sidebar}>
      <div className={style.top}>
        <button className="btn"
          onClick={reselectionHandler}>Перевыбор</button>
        <button className="btn"
          onClick={resetHandler}>Сброс</button>
        <button className="btn"
          onClick={randomGenerationHandler}>Случ. значения</button>
      </div>
      <div className={style.bottom}>
        <button className="btn calculation"
          onClick={criteriaSumCalculationHandler}>Посчитать суммы</button>
        <button className="btn normalization disabled"
          onClick={normalizationHandler}>Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;</button>
      </div>
    </div>
  )
}
