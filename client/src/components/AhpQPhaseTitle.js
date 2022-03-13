

import style from "./StyleAhpQPhases.module.scss"


export const AhpQPhaseTitle = ({ phase, phasesDone, nextPhase, previousPhase}) => {

  const PHASE_TITLES = [
    'Выбор критериев и альтернатив',
    'Попарное сравнение критериев',
    'Расчёт весового столбца критериев по цели',
    'Весовой столбец критериев',
    'Попарное сравнение альтернатив по критериям',
    'Нормировка матриц сравнения альтернатив',
    'Весовые столбцы альтернатив по критериям',
    'Определение глобальных весов альтернатив',
    'Глобальные веса альтернатив'
  ]

  const nextPhaseHandler = () => {
    nextPhase()
  }
  const previousPhaseHandler = () => {
    previousPhase()
  }

  return(
    <div className={style.title_box}>
      <div>
        <span
          className="waves-effect waves-light btn"
          onClick={previousPhaseHandler}
          disabled={phase <= 0}
        >
          <i className="material-icons">navigate_before</i>
        </span>
      </div>
      <div>
        <h4 className={style.title}>{PHASE_TITLES[phase]}</h4>
      </div>
      <div>
        <span
          className="waves-effect waves-light btn NEXT_PHASE_TITLE_BUTTON"
          onClick={nextPhaseHandler}
          disabled={phase >= 8 || phasesDone <= phase}
        >
          <i className="material-icons">navigate_next</i>
        </span>
      </div>
    </div>
  )
}
