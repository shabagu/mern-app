import { useEffect, useState } from "react"
import { DEFAULT_BUTTON_COLOR, HOT_CHANGES_BUTTON_COLOR, HOT_CHANGES_HANDLER } from "../pages/AhpPage"


import style from "./StyleAhpQPhases.module.scss"


export const AhpQPhaseN1CriteriaRating = ({
  criteria,
  criteriaMTX,
  criteriaMTXSetter,
  criteriaSum,
  criteriaSumSetter,
  criteriaNormMTXSetter,

  previousPhase,
  nextPhase,
  phaseDone,
  phasesDone,
}) => {

  const [localMTX, setLocalMTX] = useState(criteriaMTX)
  const [localSum, setLocalSum] = useState(criteriaSum)

  const localMTXSetter = (mtx) => {
    setLocalMTX([...mtx])
  }
  const localSumSetter = (sum) => {
    setLocalSum(sum)
  }

  useEffect(() => {

    // localMTXSetter(criteriaMTX)
    // localSumSetter(criteriaSum)

    sumCalculate(localMTX, localSumSetter)

    const NEXT_PHASE_TITLE_BUTTON = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
    NEXT_PHASE_TITLE_BUTTON.style.backgroundColor = DEFAULT_BUTTON_COLOR

  }, [criteriaMTX, criteriaSum, localMTX])

  const nextPhaseHandler = () => {
    nextPhase()
  }
  const previousPhaseHandler = () => {
    previousPhase()
  }

  const test = (variable) => {
    alert(variable)
  }

  return(
    <div className={style.phase_container}>
      <table className={style.criteria_comparison_table}>
        <thead>
          <tr>
            <th className={style.initial} onClick={(e) => test(localSum, e)}></th>
            {[...Array(criteria.length)].map((x, i) =>
              <th key={i} title={criteria[i]}>
                {criteria[i]}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {[...Array(criteria.length)].map((x, i) =>
            <CellRow
              key={i}
              i={i}
              criteria={criteria}
              localMTX={localMTX}
              localMTXSetter={localMTXSetter}
              localSumSetter={localSumSetter}
            />
          )}
        </tbody>
        <tfoot>
          <tr>
            <th className={style.sigma}>Σ</th>
            {[...Array(criteria.length)].map((x, i) =>
              <SumCell
                key={i}
                col={i}
                localSum={localSum}
              />
            )}
          </tr>
        </tfoot>
      </table>
      <Menu
        localMTX={localMTX}
        localMTXSetter={localMTXSetter}
        localSum={localSum}
        localSumSetter={localSumSetter}

        criteriaMTXSetter={criteriaMTXSetter}
        criteriaSumSetter={criteriaSumSetter}

        criteriaNormMTXSetter={criteriaNormMTXSetter}
        nextPhase={nextPhaseHandler}
        previousPhase={previousPhaseHandler}
        phaseDone={phaseDone}
        phasesDone={phasesDone}
      />
    </div>
  )
}

const CellRow = ({
  i,
  criteria,
  localMTX,
  localMTXSetter,
  localSumSetter,
}) => {

  return(
    <tr>
      <th title={criteria[i]}>
        {criteria[i]}
      </th>
      {[...Array(criteria.length)].map((x, j) => {
        if (i < j) return (
          <InCell
            key={j}
            row={i}
            col={j}
            localMTX={localMTX}
            localMTXSetter={localMTXSetter}
            localSumSetter={localSumSetter}
          />
        )
        else if (i > j) return(
          <OutCell
            key={j}
            row={i}
            col={j}
            localMTX={localMTX}
          />
        )
        else if (i === j) return (
          <DiagonalCell
            key={j}
            row={i}
            col={j}
            localMTX={localMTX}
          />
        )
        else return(null)
      })}
    </tr>
  )
}

const InCell = ({
  row,
  col,
  localMTX,
  localMTXSetter,
  localSumSetter,
}) => {

  return(
    <td>
      <div
        className={style.cell}
        onWheel={(e) => wheelTuning(localMTX, row, col, localMTXSetter, localSumSetter, e)}
      >
        <div className={style.value_box}>
          <span key={localMTX}>
            {MARK_MODEL[localMTX[row][col]].string}
          </span>
        </div>
        <div className={style.cell_tuning}>
          <div className={style.cell_tuning_left}>
            <TuningButton
              icon={'arrow_upward'}
              action={increaseTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[row][col] > 15}
            />
            <TuningButton
              icon={'arrow_back'}
              action={decreaseTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[row][col] < 1}
            />
          </div>
          <div className={style.cell_tuning_right}>
            <TuningButton
              icon={'keyboard_arrow_up'}
              action={maxTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[row][col] > 15}
            />
            <TuningButton
              icon={'refresh'}
              action={resetTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[row][col] === 8}
            />
            <TuningButton
              icon={'keyboard_arrow_left'}
              action={minTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[row][col] < 1}
            />
          </div>
        </div>
      </div>
    </td>
  )
}

const TuningButton = ({
  icon,
  action,
  row,
  col,
  mtx,
  mtxSetter,
  sumSetter,
  disableCondition,
}) => {

  return(
    <span
      className="btn"
      disabled={disableCondition}
      onClick={(e) => action(mtx, row, col, mtxSetter, sumSetter, e)}
    >
      <i className="material-icons">{icon}</i>
    </span>
  )
}

const OutCell = ({
  row,
  col,
  localMTX,
}) => {

  return(
    <td className={style.below}>
      <span>
        {MARK_MODEL[localMTX[row][col]].string}
      </span>
    </td>
  )
}

const DiagonalCell = ({
  row,
  col,
  localMTX,
}) => {

  return(
    <td className={style.diagonal}>
      <span>
        {MARK_MODEL[localMTX[row][col]].string}
      </span>
    </td>
  )
}

const SumCell = ({
  col,
  localSum
 }) => {
  return(
    <td>
      <span>
        {sumAdduction(localSum[col])}
      </span>
    </td>
  )
}

const Menu = ({
  localMTX,
  localMTXSetter,
  localSum,
  localSumSetter,

  criteriaMTXSetter,
  criteriaSumSetter,

  criteriaNormMTXSetter,
  nextPhase,
  previousPhase,
  phaseDone,
  phasesDone,
}) => {

  function noop() {}

  const resetHandler = () => {
    resetMtx(localMTX, localMTXSetter)
    sumCalculate(localSum, localSumSetter)
  }

  const randomHandler = () => {
    randomMtx(localMTX, localMTXSetter)
    sumCalculate(localSum, localSumSetter)
  }

  return(
    <div className={style.panel}>
      <div className={style.top}>
        <button className="btn" onClick={noop}>
          Перевыбор
        </button>
      </div>
      <div className={style.bottom}>
          <div className={style.high}>
            <span className="btn waves-effect waves-light" onClick={resetHandler}>
              Сброс
            </span>
            <span className="btn waves-effect waves-light" onClick={randomHandler}>
              Случ. значения
            </span>
          </div>
        <button className="btn" onClick={noop}>
          Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
        </button>
      </div>
    </div>
  )
}























// Модель оценок 
class Mark {
  constructor(numerator, denominator) {
    if (denominator === 1) { this.string = `${numerator}` }
    else { this.string = `${numerator}/${denominator}` }
    this.number = numerator / denominator
  }
}
let markModel = []
for (let i = 0; i < 9; i++) {
  markModel[i] = new Mark(1, 9 - i)
  markModel[16 - i] = new Mark(9 - i, 1)
}
const MARK_MODEL = markModel

// Приведение оценок 
const sumAdduction = (value) => {
  value = value.toFixed(3)
  value = value * 1
  return(value)
}





// Расчёт суммы
const sumCalculate = (mtx, sumSetter) => {
  const n = mtx.length
  let sum = Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      sum[i] += MARK_MODEL[mtx[j][i]].number
    }
  }
  sumSetter(sum)
}



// Сброс значений матрицы
const resetMtx = (mtx, mtxSetter) => {
  const n = mtx.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      mtx[i][j] = 8
    }
  }
  mtxSetter(mtx)
}

// Рандомизация значений матрицы
const randomIntegerInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const reversArray = []
for (let i = 0; i <= 16; i++) {
  reversArray[i] = 16 - i
}
const randomMtx = (mtx, mtxSetter) => {
  const n = mtx.length
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      mtx[i][j] = randomIntegerInRange(0, 16)
      mtx[j][i] = reversArray[mtx[i][j]]
    }
    mtx[i][i] = 8
  }
  mtxSetter(mtx)
}





// Изменение оценок
const increaseTuning = (mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx
  if (mtxModel[i][j] < 16) {
    mtxModel[i][j] += 1
    mtxModel[j][i] -= 1
    mtxSetter(mtxModel)
  }
  sumCalculate(mtx, sumSetter)
}
const decreaseTuning = (mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx
  if (mtxModel[i][j] > 0) {
    mtxModel[i][j] -= 1
    mtxModel[j][i] += 1
    mtxSetter(mtxModel)
  }
  sumCalculate(mtx, sumSetter)
}
const wheelTuning = (mtx, i, j, mtxSetter, sumSetter, e) => {
  if (e.nativeEvent.wheelDelta > 0) {
    increaseTuning(mtx, i, j, mtxSetter, sumSetter)
  } else {
    decreaseTuning(mtx, i, j, mtxSetter, sumSetter)
  }
}
const maxTuning = (mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx
  mtxModel[i][j] = 16
  mtxModel[j][i] = 0
  mtxSetter(mtxModel)
  sumCalculate(mtx, sumSetter)
}
const minTuning = (mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx
  mtxModel[i][j] = 0
  mtxModel[j][i] = 16
  mtxSetter(mtxModel)
  sumCalculate(mtx, sumSetter)
}
const resetTuning = (mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx
  mtxModel[i][j] = 8
  mtxModel[j][i] = 8
  mtxSetter(mtxModel)
  sumCalculate(mtx, sumSetter)
}
