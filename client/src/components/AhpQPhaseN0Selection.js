// import { useState } from 'react'

// import { ALL_CRITERIA, ALL_ALTERNATIVES } from "../pages/AhpPage"

import style from "./AhpQPhases.module.scss"



export const AhpQPhaseN0Selection = () => {

  // const [queryOptions, setQueryOptions] = useState('')

  const checkboxChanging = (option) => {
    const checkboxes = document.querySelectorAll(`.${option}List input[type="checkbox"]`)
    const changingCondition = document.querySelector(`.${option}Changing`).checked
    checkboxes.forEach((item) => {
      if (changingCondition) item.checked = true
      else item.checked = false
    })
  }

  const checkboxControl = (option) => {
    const checkboxes = Array.from(document.querySelectorAll(`.${option}List input[type="checkbox"]`))
    const checkboxesConditions = []
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxesConditions[i] = checkboxes[i].checked
    }
    const checkboxChanger = document.querySelector(`.${option}Changing`)
    const isAllChecked = checkboxesConditions.reduce((acc, rec) => acc && rec)
    const isUnhecked = !checkboxesConditions.reduce((acc, rec) => acc * rec)
    if (isAllChecked) checkboxChanger.checked = true
    if (isUnhecked) checkboxChanger.checked = false
  }

  const pressHandler = async () => {
    // history.push('/ahp/query/criteriacomparison')
  }

  return(
    <div className={style.phase_container}>
      <div className="row">
        <div className="col s3 offset-s3">
          <fieldset>
            <legend>Критерии</legend>
            <ul className="CriteriaList">
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Criteria', e)} /><span>Стоимость</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Criteria', e)} /><span>Климат</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Criteria', e)} /><span>Экология</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Criteria', e)} /><span>Безопасность</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Criteria', e)} /><span>Кухня</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Criteria', e)} /><span>Престиж</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Criteria', e)} /><span>Дорога</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Criteria', e)} /><span>Достопримечательности</span></label></li>
            </ul>
            <label>
              <input type="checkbox" onClick={(e) => checkboxChanging('Criteria', e)} className="CriteriaChanging filled-in" />
              <span className={style.check_all}>Отметить все</span>
            </label>
          </fieldset>
        </div>
        <div className="col s3">
          <fieldset>
            <legend>Альтернативы</legend>
            <ul className="AlternativesList">
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Alternatives', e)} /><span>Египет</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Alternatives', e)} /><span>Греция</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Alternatives', e)} /><span>Турция</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Alternatives', e)} /><span>Куба</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Alternatives', e)} /><span>Тунис</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Alternatives', e)} /><span>Швеция</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Alternatives', e)} /><span>Италия</span></label></li>
              <li><label><input type="checkbox" onClick={(e) => checkboxControl('Alternatives', e)} /><span>Гавайи</span></label></li>
            </ul>
            <label>
              <input type="checkbox" onClick={(e) => checkboxChanging('Alternatives', e)} className="AlternativesChanging filled-in" />
              <span className={style.check_all}>Отметить все</span>
            </label>
          </fieldset>
        </div>
      </div>
      <div className={style.button_container}>
        <div>
          <button onClick={pressHandler} className="btn myButton">Сформировать запрос</button>
        </div>
      </div>
    </div>
  )
}